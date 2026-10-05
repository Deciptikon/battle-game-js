import { STAT } from "../../stats/enum.js";
import { TILE } from "../../tiles/enum.js";

export default {
  id: "dog",
  name: "Пёс",
  description: "Тяжёлый, живучий, не скрытный.",
  startUnlocked: true,

  baseStats: {
    [STAT.HP]: 7,
    [STAT.ARMOR]: 6,
    [STAT.STEALTH]: 3,
    [STAT.SPEED]: 5,
    [STAT.CAUTION]: 4,
    [STAT.EVASION]: 3,
    [STAT.MORALE]: 7,
    [STAT.PERCEPTION]: 4,
  },

  prefs: {
    [TILE.PLAIN]: 2,
    [TILE.FOREST]: 2,
    [TILE.SEA]: 0,
    [TILE.DESERT]: 0,
  },
};
