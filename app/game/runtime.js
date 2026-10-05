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
    items: [],
  };

  // позже — свёртка mods по слотам
  // сейчас — только база

  return hero;
}
