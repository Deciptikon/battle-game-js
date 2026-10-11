import { Scene } from "../scene.js";
import { L } from "../layout.js";
import { theme } from "../theme.js";
import { Button } from "../ui/base/button.js";
import { Overlay } from "../ui/hud/overlay.js";
import { SkillBar } from "../ui/skills/skillBar.js";
import { FloatingManager } from "../ui/floating/floatingManager.js";
import { reset } from "../game.js";
import { Board } from "../game/board/board.js";
import { viewGrid, viewSize } from "../game/locations/view.js";
import { get as getLocation } from "../game/locations/registry.js";
import { Pet } from "../game/actors/pet.js";
import { Predator } from "../game/actors/predator.js";
import { all as allPredators } from "../game/predators/registry.js";
import { state } from "../game/state.js";
import { get, has } from "../assets/cache.js";
import { setLive, clearLive } from "../debug.js";
import { ResultScene } from "./result.js";

export class MapScene extends Scene {
  constructor({ id, level }) {
    super();
    this.id = id;
    this.level = level;
  }

  enter() {
    const loc = getLocation(this.id);
    this.grid = viewGrid(loc.grid, this.level);
    this.size = viewSize(this.level);
    this.style = loc.style ?? "pixel";

    const maxBoard = Math.min(L.w, L.h) * 0.85;
    this.tileSize = maxBoard / this.size;
    const boardW = this.tileSize * this.size;
    this.originX = (L.w - boardW) / 2;
    this.originY = (L.h - boardW) / 2;

    this.board = new Board({
      grid: this.grid,
      tileSize: this.tileSize,
      originX: this.originX,
      originY: this.originY,
      style: this.style,
    });

    const startX = Math.floor(this.size / 2);
    const startY = Math.floor(this.size / 2);

    this.hero = new Pet(state.activeHero);
    this.hero.x = startX;
    this.hero.y = startY;
    this.hero.vx = startX;
    this.hero.vy = startY;

    // спавн хищников
    this.predators = [];

    const spawnCount = 2;
    const speciesList = allPredators();

    for (let i = 0; i < spawnCount; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * this.size);
        y = Math.floor(Math.random() * this.size);
      } while (Math.abs(x - startX) < 3 && Math.abs(y - startY) < 3);

      const speciesDef =
        speciesList[Math.floor(Math.random() * speciesList.length)];
      const p = new Predator({ x, y, speciesDef });
      p.vx = x;
      p.vy = y;
      this.predators.push(p);
    }

    this.ctx = {
      map: this,
      hero: this.hero,
      predators: this.predators,
      actors: [this.hero, ...this.predators],
    };

    setLive("hero", this.hero);
    setLive("actors", this.ctx.actors);

    // скилл-бары
    const skillSize = L.s(0.09);
    const skillGap = L.s(0.015);

    this.heroBar = new SkillBar({
      x: L.x(0.03),
      y: L.y(0.88),
      size: skillSize,
      gap: skillGap,
      count: 4,
      direction: "right",
    });
    this.heroBar.setSkills(this.hero.heroSkills);

    this.itemBar = new SkillBar({
      x: L.x(0.97) - skillSize,
      y: L.y(0.88),
      size: skillSize,
      gap: skillGap,
      count: 6,
      direction: "left",
    });
    this.itemBar.setSkills(this.hero.itemSkills);

    setLive("heroBar", this.heroBar);
    setLive("itemBar", this.itemBar);

    this.floats = new FloatingManager();

    this.overlay = new Overlay({
      h: 0.8,
      title: "Статус",
      lines: ["HP: —", "Ходов: —", "Время: —", "Найдено: —"],
    });

    const w = L.s(0.15),
      h = L.s(0.06);
    this.elements = [
      new Button({
        x: L.x(0.8),
        y: L.y(0.03),
        w,
        h,
        label: "Конец",
        onClick: () =>
          reset(
            new ResultScene({
              id: this.id,
              level: this.level,
              stats: {
                won: true,
                time: 42,
                moves: 87,
                predatorsMet: 0,
                predatorsKilled: 0,
                itemsFound: 0,
                hp: 5,
                morale: 5,
                xp: 40,
                coins: 15,
              },
            }),
          ),
      }),
      new Button({
        x: L.x(0.03),
        y: L.y(0.03),
        w: L.s(0.12),
        h: L.s(0.06),
        label: "Статус",
        onClick: () => {
          this.overlay.show();
        },
      }),
    ];
  }

  exit() {
    clearLive("hero");
    clearLive("actors");
    clearLive("heroBar");
    clearLive("itemBar");
  }

  popup(actor, opts) {
    const x = this.originX + (actor.vx + 0.5) * this.tileSize;
    const y = this.originY + (actor.vy + 0.2) * this.tileSize;
    this.floats.pop(x, y, opts);
  }

  update(dt) {
    this.hero.update(dt, this.ctx);
    for (const p of this.predators) p.update(dt, this.ctx);
    this.floats.update(dt);
  }

  render(ctx) {
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, L.w, L.h);

    this.board.draw(ctx);

    for (const p of this.predators) {
      this.drawActor(ctx, p);
    }
    this.drawActor(ctx, this.hero);
    this.drawHeroHp(ctx);

    super.render(ctx);

    this.floats.draw(ctx);

    this.heroBar.draw(ctx);
    this.itemBar.draw(ctx);

    this.overlay.draw(ctx);
  }

  drawActor(ctx, actor) {
    const px = this.originX + (actor.vx + 0.5) * this.tileSize;
    const py = this.originY + (actor.vy + 0.5) * this.tileSize;

    const spriteKey = actor.id + ".sprite";

    if (has(spriteKey)) {
      const s = this.tileSize * 0.9;
      ctx.drawImage(get(spriteKey), px - s / 2, py - s / 2, s, s);
    } else {
      ctx.fillStyle = actor.faction === "predator" ? theme.bad : theme.gold;
      ctx.beginPath();
      ctx.arc(px, py, this.tileSize * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawHeroHp(ctx) {
    const hero = this.hero;
    if (hero.dead) return;

    const maxHp = 10;
    const hp = hero.stats.hp ?? 0;
    const p = Math.max(0, Math.min(1, hp / maxHp));

    const px = this.originX + (hero.vx + 0.5) * this.tileSize;
    const py = this.originY + hero.vy * this.tileSize - L.s(0.02);

    const w = this.tileSize * 0.9;
    const h = L.s(0.012);
    const x = px - w / 2;

    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(x, py, w, h);

    ctx.fillStyle = p > 0.5 ? "#4a7" : p > 0.25 ? "#e8c31a" : "#e85a1a";
    ctx.fillRect(x, py, w * p, h);

    ctx.strokeStyle = "rgba(0,0,0,0.8)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, py + 0.5, w - 1, h - 1);

    ctx.fillStyle = "#fff";
    ctx.font = `${L.s(0.018)}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText(`${hp}`, px, py - L.s(0.005));
    ctx.textAlign = "left";
  }

  onPointerUp(mx, my) {
    if (this.overlay.open) {
      const consumed = this.overlay.handleClick(mx, my);
      if (consumed) return;
    }

    if (this.heroBar.handleClick(mx, my, this.ctx)) return;
    if (this.itemBar.handleClick(mx, my, this.ctx)) return;

    super.onPointerUp(mx, my);
  }
}
