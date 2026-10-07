const assets = new Map(); // name -> url

export function registerAssets(prefix, defs) {
  if (!defs) return;
  for (const [key, url] of Object.entries(defs)) {
    assets.set(`${prefix}.${key}`, url);
  }
}

export function getUrl(name) {
  return assets.get(name);
}

export function all() {
  return [...assets.entries()];
}
