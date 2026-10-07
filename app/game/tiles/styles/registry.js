import { STYLES } from "./index.js";

let current = "pixel";

export function setStyle(name) {
  if (!STYLES[name]) throw new Error(`Unknown style: ${name}`);
  current = name;
}

export function getCurrent() {
  return current;
}

export function getStyle(name = current) {
  const s = STYLES[name];
  if (!s) throw new Error(`Unknown style: ${name}`);
  return s;
}

export function spriteUrl(tileId, styleName) {
  const style = getStyle(styleName);
  const file = style.tiles[tileId];
  if (!file) return null;
  return new URL(`./${styleName}/${file}`, import.meta.url).href;
}

// все стили, все тайлы — для предзагрузки
export function allAssetUrls() {
  const out = [];
  for (const styleName of Object.keys(STYLES)) {
    const style = STYLES[styleName];
    for (const [tileId, file] of Object.entries(style.tiles)) {
      const files = Array.isArray(file) ? file : [file];
      for (const f of files) {
        out.push([
          `${styleName}.${tileId}`,
          new URL(`./${styleName}/${f}`, import.meta.url).href,
        ]);
      }
    }
  }
  return out;
}
