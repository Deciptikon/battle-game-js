import { STAT_LIST } from "../stats/enum.js";

const byId = new Map();

export function register(def) {
  if (byId.has(def.id)) throw new Error(`Duplicate item: ${def.id}`);

  for (const k of Object.keys(def.mods ?? {})) {
    if (!STAT_LIST.includes(k))
      throw new Error(`Unknown stat "${k}" in ${def.id}`);
  }

  byId.set(def.id, def);
}

export function get(id) {
  const d = byId.get(id);
  if (!d) throw new Error(`Unknown item: ${id}`);
  return d;
}

export function all() {
  return [...byId.values()];
}
