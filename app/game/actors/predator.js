import { Actor, intervalFor } from "./actor.js";
import { STAT } from "../stats/enum.js";
import { canHunt } from "./tags.js";

export class Predator extends Actor {
  constructor({ x, y, speciesDef }) {
    super({ x, y, maskSize: speciesDef.maskSize ?? 3 });

    this.id = speciesDef.id;
    this.def = speciesDef;
    this.name = speciesDef.name;
    this.description = speciesDef.description;

    this.stats = { ...speciesDef.baseStats };
    this.prefs = { ...speciesDef.prefs };

    this.faction = "predator";
    this.tags = speciesDef.tags?.self ?? [];
    this.hunts = speciesDef.tags?.hunts ?? null;

    this.attackType = speciesDef.attackType ?? "bite";
    this.attackRange = speciesDef.attackRange ?? 1;

    this.initBaseStats();

    this.tickInterval = intervalFor(this.stats[STAT.SPEED]);

    this.target = null;
  }

  findTarget(ctx) {
    for (const a of ctx.actors) {
      if (a === this) continue;
      if (a.dead) continue;
      if (!canHunt(this, a)) continue;

      const d = Math.abs(a.x - this.x) + Math.abs(a.y - this.y);
      if (d <= this.attackRange) return a;
    }
    return null;
  }
}
