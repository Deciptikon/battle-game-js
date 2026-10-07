import { STAT } from "../../stats/enum.js";
import { TILE } from "../../tiles/enum.js";

export default {
  id: "cat",
  name: "Кот",
  description: "Усреднённый. Удобен для начала.",
  startUnlocked: true,

  assets: {
    icon: new URL("./icon.png", import.meta.url).href,
    portrait: new URL("./portrait.png", import.meta.url).href,
    sprite: new URL("./sprite.png", import.meta.url).href,
  },

  baseStats: {
    [STAT.HP]: 5,
    [STAT.ARMOR]: 4,
    [STAT.STEALTH]: 5,
    [STAT.SPEED]: 5,
    [STAT.CAUTION]: 5,
    [STAT.EVASION]: 5,
    [STAT.MORALE]: 5,
    [STAT.PERCEPTION]: 5,
  },

  prefs: {
    [TILE.PLAIN]: 2,
    [TILE.FOREST]: 2,
    [TILE.SEA]: 0,
    [TILE.DESERT]: 0,
  },
};
