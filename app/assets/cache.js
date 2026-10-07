const cache = new Map(); // name -> Image / AudioBuffer

export function get(name) {
  const a = cache.get(name);
  if (!a) throw new Error(`Asset not loaded: ${name}`);
  return a;
}

export function has(name) {
  return cache.has(name);
}

export function set(name, asset) {
  cache.set(name, asset);
}
