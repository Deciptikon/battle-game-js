import { TILE_DEFS } from "./defs.js";

const byId = new Map();

export function init() {
  for (const [id, def] of Object.entries(TILE_DEFS)) {
    byId.set(id, def);
  }
}

export function get(id) {
  const d = byId.get(id);
  if (!d) throw new Error(`Unknown tile: ${id}`);
  return d;
}

export function all() {
  return [...byId.values()];
}
