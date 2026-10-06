import { defs } from "./defs.js";
import { state } from "./state.js";

export function buildHero(heroId) {
  const def = defs.heroes.get(heroId);
  const st = state.heroes[heroId];

  const hero = {
    id: heroId,
    def,
    state: st,
    name: def.name,
    description: def.description,
    stats: { ...def.baseStats },
    prefs: { ...def.prefs },
    items: [],
  };

  applyItems(hero);
  return hero;
}

export function applyItems(hero) {
  const slots = hero.state?.slots ?? [];

  for (const iid of slots) {
    if (!iid) continue;
    const inst = state.instances[iid];
    if (!inst) continue;
    const def = defs.items.get(inst.defId);
    def.apply?.(hero);
  }

  return hero;
}
