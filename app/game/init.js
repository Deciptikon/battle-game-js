import { state, resetState, loadLocal, makeInstanceId } from "./state.js";
import { defs } from "./defs.js";

export function initState() {
  resetState();

  loadLocal();

  // герои
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

  // предметы: отметки открытости
  for (const def of defs.items.all()) {
    if (!state.items[def.id]) {
      state.items[def.id] = { unlocked: true };
    }
  }

  // тестовые инстансы на складе — только если их нет
  if (Object.keys(state.instances).length === 0) {
    for (const defId of ["walnut", "lead_bullet", "fly_wing"]) {
      const iid = makeInstanceId();
      state.instances[iid] = { iid, defId, ownerId: "stash", used: 0 };
    }
  }
}
