const byId = new Map();

export function register(def) {
  if (byId.has(def.id)) throw new Error(`Duplicate location: ${def.id}`);
  byId.set(def.id, def);
}

export function get(id) {
  const d = byId.get(id);
  if (!d) throw new Error(`Unknown location: ${id}`);
  return d;
}

export function all() {
  return [...byId.values()];
}
