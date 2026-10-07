import * as registry from "./registry.js";
import { allAssetUrls } from "../game/tiles/styles/registry.js";
import { loadAll } from "./loader.js";

export function preloadGame(onProgress) {
  const entries = [...registry.all(), ...allAssetUrls()];
  return loadAll(entries, onProgress);
}
