import { Actor, intervalFor } from "./actor.js";
import { STAT } from "../stats/enum.js";

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
    this.tags = speciesDef.tags ?? [];
    this.hunts = speciesDef.hunts ?? [];
    this.avoid = speciesDef.avoid ?? [];

    this.attackType = speciesDef.attackType ?? "bite";
    this.attackRange = speciesDef.attackRange ?? 1;

    this.initBaseStats();

    this.tickInterval = intervalFor(this.stats[STAT.SPEED]);

    this.target = null;
  }
}
