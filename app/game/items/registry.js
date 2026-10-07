import { registerAssets } from "../../assets/registry.js";

const byId = new Map();

export function register(def) {
  if (byId.has(def.id)) throw new Error(`Duplicate item: ${def.id}`);
  if (def.assets) registerAssets(def.id, def.assets);
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
