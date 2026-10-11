import { state } from "./state.js";
import { defs } from "./defs.js";

export function cloneSkill(def) {
  const s = {};
  for (const k in def) s[k] = def[k];
  return s;
}

function resolveUnlocked(hero, skill, store) {
  if (store[skill.id]?.unlocked) return true;
  if (typeof skill.skillUnlock === "function" && skill.skillUnlock(hero)) {
    store[skill.id] = { unlocked: true };
    return true;
  }
  return false;
}

export function buildHeroSkills(def, hero) {
  const arr = def.skills ?? [];
  hero.state.skills ??= {};

  const out = [];
  for (let i = 0; i < 4; i++) {
    const sd = arr[i];
    if (!sd) {
      out.push(null);
      continue;
    }

    const s = cloneSkill(sd);
    s.owner = hero;
    s.unlocked = resolveUnlocked(hero, s, hero.state.skills);
    out.push(s);
  }
  return out;
}

export function buildItemSkills(hero) {
  const out = [];
  for (let i = 0; i < 6; i++) {
    const iid = hero.state.slots[i];
    if (!iid) {
      out.push(null);
      continue;
    }

    const inst = state.instances[iid];
    if (!inst) {
      out.push(null);
      continue;
    }

    const def = defs.items.get(inst.defId);
    const sd = def.active ?? def.passive ?? null;
    if (!sd) {
      out.push(null);
      continue;
    }

    inst.skills ??= {};
    const s = cloneSkill(sd);
    s.owner = inst;
    s.unlocked = resolveUnlocked(hero, s, inst.skills);
    out.push(s);
  }
  return out;
}
