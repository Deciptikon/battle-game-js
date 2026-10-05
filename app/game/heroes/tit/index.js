import { STAT } from "../../stats/enum.js";
import { TILE } from "../../tiles/enum.js";

export default {
  id: "tit",
  name: "Синица",
  description: "Лёгкая, скрытная, летает по любым клеткам.",
  startUnlocked: true,

  baseStats: {
    [STAT.HP]: 3,
    [STAT.ARMOR]: 2,
    [STAT.STEALTH]: 8,
    [STAT.SPEED]: 7,
    [STAT.CAUTION]: 6,
    [STAT.EVASION]: 7,
    [STAT.MORALE]: 4,
    [STAT.PERCEPTION]: 5,
  },

  prefs: {
    [TILE.FOREST]: 2,
    [TILE.MOUNTAIN]: 2,
    [TILE.SEA]: 0,
    [TILE.DESERT]: 0,
  },
};
