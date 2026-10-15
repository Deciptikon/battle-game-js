import { Actor, intervalFor } from "./actor.js";
import { defs } from "../defs.js";
import { state } from "../state.js";
import { buildHeroSkills, buildItemSkills } from "../skills.js";

export class Pet extends Actor {
  constructor(heroId) {
    const def = defs.heroes.get(heroId);
    const st = state.heroes[heroId];
    //st.level = 11;
    //console.log(st);

    super({ x: 0, y: 0 });

    this.id = heroId;
    this.def = def;
    this.state = st;
    this.name = def.name;
    this.description = def.description;

    this.stats = { ...def.baseStats };
    this.prefs = { ...def.prefs };
    this.tags = def.tags?.self ?? [];
    this.hunts = null;

    this.initBaseStats();
    this.applyItems();

    this.heroSkills = buildHeroSkills(def, this);
    this.itemSkills = buildItemSkills(this);
    this.skills = [...this.heroSkills, ...this.itemSkills].filter(Boolean);

    this.tickInterval = intervalFor(this.stats.speed ?? 1);
  }

  applyItems() {
    for (const iid of this.state.slots) {
      if (!iid) continue;
      const inst = state.instances[iid];
      if (!inst) continue;
      const def = defs.items.get(inst.defId);
      if (typeof def.apply === "function") def.apply(this);
    }
  }
}
