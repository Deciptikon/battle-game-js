import * as registry from "./registry.js";
import { allAssetUrls } from "../game/tiles/styles/registry.js";
import { worldmapAssets } from "../game/worldmap/assets.js";
import { loadAll } from "./loader.js";

export function preloadGame(onProgress) {
  const entries = [
    ...registry.all(),
    ...allAssetUrls(),
    ...Object.entries(worldmapAssets),
  ];
  return loadAll(entries, onProgress);
}
