import { STAT } from "../../stats/enum.js";
import { TILE } from "../../tiles/enum.js";

export default {
  id: "hedgehog",
  name: "Ёж",
  description: "Самый защищённый.",
  startUnlocked: true,

  baseStats: {
    [STAT.HP]: 5,
    [STAT.ARMOR]: 9,
    [STAT.STEALTH]: 5,
    [STAT.SPEED]: 3,
    [STAT.CAUTION]: 5,
    [STAT.EVASION]: 2,
    [STAT.MORALE]: 6,
    [STAT.PERCEPTION]: 3,
  },

  prefs: {
    [TILE.FOREST]: 2,
    [TILE.PLAIN]: 2,
    [TILE.SEA]: 0,
    [TILE.DESERT]: 0,
  },
};
