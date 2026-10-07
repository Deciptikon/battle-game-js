import { has, get, set } from "./cache.js";

export function loadImage(name, url) {
  if (has(name)) return Promise.resolve(get(name));
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      set(name, img);
      resolve(img);
    };
    img.onerror = () => reject(new Error(`Failed: ${name} ${url}`));
    img.src = url;
  });
}

export function loadAll(entries, onProgress) {
  const total = entries.length;
  let done = 0;
  if (total === 0) return Promise.resolve();
  return Promise.all(
    entries.map(([name, url]) =>
      loadImage(name, url).then(() => {
        done++;
        onProgress?.(done, total);
      }),
    ),
  );
}
