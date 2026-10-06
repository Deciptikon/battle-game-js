import { state, resetState, loadLocal, makeInstanceId } from "./state.js";
import { defs } from "./defs.js";

export function initState() {
  resetState();
  loadLocal();

  for (const def of defs.heroes.all()) {
    if (!state.heroes[def.id]) {
      state.heroes[def.id] = {
        unlocked: def.startUnlocked ?? false,
        level: 1,
        xp: 0,
        slots: [null, null, null, null, null, null],
      };
    }
  }
  if (!state.heroes[state.activeHero]) state.activeHero = "cat";

  for (const def of defs.items.all()) {
    if (!state.items[def.id]) state.items[def.id] = { unlocked: true };
  }

  for (const def of defs.locations.all()) {
    if (!state.maps[def.id]) {
      state.maps[def.id] = {
        unlocked: def.startUnlocked ?? false,
        maxLevel: -1, // -1 = не пройдена ни одна сложность
      };
    }
  }

  if (Object.keys(state.instances).length === 0) {
    for (const defId of ["walnut", "lead_bullet", "fly_wing"]) {
      const iid = makeInstanceId();
      state.instances[iid] = { iid, defId, ownerId: "stash", used: 0 };
    }
  }
}
