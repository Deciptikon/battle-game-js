import { state } from "./state.js";
import { defs } from "./defs.js";

export function equip(heroId, iid, slotIndex) {
  const inst = state.instances[iid];
  if (!inst) return false;

  const hero = state.heroes[heroId];
  if (!hero) return false;
  if (hero.slots[slotIndex] !== null) return false;

  // снять с прошлого владельца, если он есть
  if (inst.ownerId !== "stash") {
    const prev = state.heroes[inst.ownerId];
    if (prev) {
      const i = prev.slots.indexOf(iid);
      if (i !== -1) prev.slots[i] = null;
    }
  }

  inst.ownerId = heroId;
  hero.slots[slotIndex] = iid;
  return true;
}

export function unequip(heroId, slotIndex) {
  const hero = state.heroes[heroId];
  if (!hero) return false;
  const iid = hero.slots[slotIndex];
  if (!iid) return false;

  state.instances[iid].ownerId = "stash";
  hero.slots[slotIndex] = null;
  return true;
}

export function listStash() {
  return Object.values(state.instances).filter((i) => i.ownerId === "stash");
}

export function listOwnedBy(heroId) {
  const hero = state.heroes[heroId];
  if (!hero) return [];
  return hero.slots
    .map((iid) => (iid ? state.instances[iid] : null))
    .filter(Boolean);
}

export function listStashItems() {
  return Object.values(state.instances)
    .filter((i) => i.ownerId === "stash")
    .map((inst) => ({ inst, def: defs.items.get(inst.defId) }));
}

export function listHeroItems(heroId) {
  const hero = state.heroes[heroId];
  if (!hero) return [];
  return hero.slots.map((iid, slotIndex) => {
    if (!iid) return { slotIndex, inst: null, def: null };
    const inst = state.instances[iid];
    return { slotIndex, inst, def: defs.items.get(inst.defId) };
  });
}

export function repairAll() {
  for (const heroId in state.heroes) {
    const hero = state.heroes[heroId];
    for (let i = 0; i < hero.slots.length; i++) {
      const iid = hero.slots[i];
      if (!iid) continue;
      const inst = state.instances[iid];
      if (!inst || inst.ownerId !== heroId) {
        hero.slots[i] = null;
        if (inst) inst.ownerId = "stash";
      }
    }
  }
}

export function swapInvSlots(heroId, i, j) {
  const hero = state.heroes[heroId];
  if (!hero) return false;
  const tmp = hero.slots[i];
  hero.slots[i] = hero.slots[j];
  hero.slots[j] = tmp;
  return true;
}

export function swapInvAndStash(heroId, slotIndex, stashIid) {
  const hero = state.heroes[heroId];
  if (!hero) return false;

  const newInst = state.instances[stashIid];
  if (!newInst || newInst.ownerId !== "stash") return false;

  const oldIid = hero.slots[slotIndex];

  newInst.ownerId = heroId;
  hero.slots[slotIndex] = stashIid;

  if (oldIid) {
    state.instances[oldIid].ownerId = "stash";
  }
  return true;
}
