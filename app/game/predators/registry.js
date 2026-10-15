import { STAT_LIST } from "../stats/enum.js";
import { TILE_LIST } from "../tiles/enum.js";
import { registerAssets } from "../../assets/registry.js";
import { ALL_TAGS } from "../actors/tags.js";

const byId = new Map();

export function register(def) {
  if (byId.has(def.id)) throw new Error(`Duplicate predator: ${def.id}`);

  for (const k of Object.keys(def.baseStats ?? {})) {
    if (!STAT_LIST.includes(k))
      throw new Error(`Unknown stat "${k}" in ${def.id}`);
  }
  for (const k of Object.keys(def.prefs ?? {})) {
    if (!TILE_LIST.includes(k))
      throw new Error(`Unknown tile "${k}" in ${def.id}`);
  }
  checkList(def.tags?.self ?? [], def, "self");
  for (const [cat, list] of Object.entries(def.tags?.hunts ?? {})) {
    checkList(list, def, `hunts.${cat}`);
  }

  if (def.assets) registerAssets(def.id, def.assets);

  byId.set(def.id, def);
}

export function get(id) {
  const d = byId.get(id);
  if (!d) throw new Error(`Unknown predator: ${id}`);
  return d;
}

export function all() {
  return [...byId.values()];
}

function checkList(list, def, place) {
  for (const t of list) {
    if (!ALL_TAGS.includes(t))
      throw new Error(`Unknown tag "${t}" in ${def.id}.${place}`);
  }
}
