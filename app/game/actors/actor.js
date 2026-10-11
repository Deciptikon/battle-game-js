import { MoveMask } from "./moveMask.js";
import { STAT, STAT_LIST } from "../stats/enum.js";
import { clampStat } from "../stats/clamp.js";

const TICK_INTERVAL = [
  3 / 1,
  3 / 2,
  3 / 3,
  3 / 4,
  3 / 5,
  3 / 6,
  3 / 7,
  3 / 8,
  3 / 9,
  3 / 12,
];

export function intervalFor(speed) {
  const s = Math.max(1, Math.min(10, speed | 0));
  return TICK_INTERVAL[s - 1];
}

export class Actor {
  constructor({ x = 0, y = 0, maskSize = 3 } = {}) {
    this.x = x;
    this.y = y;
    this.vx = x;
    this.vy = y;

    this.moveMask = new MoveMask(maskSize);

    this.tickAccum = 0;
    this.tickInterval = 1;
    this.dead = false;

    this.def = null;
    this.stats = {};
    this.prefs = {};
    this.skills = [];

    this.tags = [];
    this.hunts = [];
    this.faction = null;
    this.avoid = [];
  }

  // --- статы ---

  initBaseStats() {
    for (const key of STAT_LIST) {
      this.stats[key] = clampStat(key, this.stats[key]);
    }
  }

  setStat(key, value) {
    this.stats[key] = clampStat(key, value);
  }

  heal(amount, ctx) {
    this.setStat(STAT.HP, this.stats[STAT.HP] + amount);
    ctx?.map?.popup(this, { text: "+" + amount, kind: "heal" });
  }

  applyDamage(amount) {
    this.stats[STAT.HP] = Math.max(0, this.stats[STAT.HP] - amount);
  }

  checkDeath(ctx) {
    if (this.dead) return;
    if (this.stats[STAT.HP] <= 0) {
      this.kill(ctx);
    }
  }

  // --- смерть ---

  kill(ctx, event = null) {
    const deathEvent = event ?? { type: "death" };
    this.run("skillBeforeDeath", deathEvent, ctx);
    if (deathEvent.cancelled) return;
    this.dead = true;
  }

  destroy() {
    this.dead = true;
  }

  // --- урон ---

  receiveHit(event, ctx) {
    this.run("skillEvade", event, ctx);
    if (event.evaded) {
      ctx.map?.popup(this, { text: "промах", kind: "evade" });
      return event;
    }

    this.run("skillBlock", event, ctx);
    if (event.cancelled) {
      ctx.map?.popup(this, { text: "блок", kind: "block" });
      return event;
    }

    this.applyDamage(event.amount);
    ctx.map?.popup(this, { text: "-" + event.amount, kind: "damage" });

    this.run("skillAfterDamage", event, ctx);

    this.checkDeath(ctx);

    return event;
  }

  attack(target, amount, ctx, attackType = "melee") {
    const event = {
      type: "damage",
      from: this,
      to: target,
      amount,
      attackType,
      evaded: false,
      cancelled: false,
    };
    return target.receiveHit(event, ctx);
  }

  // --- обёртка по скиллам ---

  run(method, ...args) {
    for (const s of this.skills) {
      if (!s.unlocked) continue;
      s[method]?.(this, ...args);
    }
  }

  // --- жизненный цикл ---

  update(dt, ctx) {
    if (this.dead) return;

    this.tickAccum += dt;

    if (this.tickAccum >= this.tickInterval) {
      this.tickAccum -= this.tickInterval;
      this.step(ctx);
    }

    const k = 10;
    this.vx += (this.x - this.vx) * k * dt;
    this.vy += (this.y - this.vy) * k * dt;

    if (Math.abs(this.x - this.vx) < 0.01) this.vx = this.x;
    if (Math.abs(this.y - this.vy) < 0.01) this.vy = this.y;
  }

  step(ctx) {
    this.moveMask.compute(this, ctx);
    this.run("skillModifyWeights", this.moveMask, ctx);
    this.moveMask.recomputeSum();
    this.moveMask.normalize();

    this.def?.onState?.(this, this.moveMask, ctx);
    if (this.dead) return;

    this.run("skillOnStep", this.moveMask, ctx);
    if (this.dead) return;

    this.chooseMoveFromMask(ctx);
  }

  weightOf(tileId, x, y, ctx) {
    return this.prefs[tileId] ?? 0;
  }

  chooseMoveFromMask(ctx) {
    const dir = this.moveMask.pick(Math.random);
    if (!dir) return;

    this.x += dir.dx;
    this.y += dir.dy;
    this.onEnterCell(ctx.map.grid[this.y][this.x], ctx);
  }

  onEnterCell(tileId, ctx) {}
}
