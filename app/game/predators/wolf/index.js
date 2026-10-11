import { STAT } from "../../stats/enum.js";
import { TILE } from "../../tiles/enum.js";

export default {
  id: "wolf",
  name: "Волк",
  description: "Стайный хищник средней величины.",

  assets: {
    icon: new URL("./icon.png", import.meta.url).href,
    sprite: new URL("./sprite.png", import.meta.url).href,
  },

  tags: ["predator", "mammal", "medium", "ground"],
  hunts: ["medium", "large"],
  avoid: ["air"],

  attackType: "bite",
  attackRange: 1,

  baseStats: {
    [STAT.HP]: 5,
    [STAT.ARMOR]: 3,
    [STAT.STEALTH]: 4,
    [STAT.SPEED]: 6,
    [STAT.CAUTION]: 3,
    [STAT.EVASION]: 4,
    [STAT.MORALE]: 7,
    [STAT.PERCEPTION]: 4,
  },

  prefs: {
    [TILE.PLAIN]: 100,
    [TILE.FOREST]: 100,
    [TILE.MOUNTAIN]: 40,
    [TILE.TUNDRA]: 40,
    [TILE.SNOW]: 30,
    [TILE.SWAMP]: 20,
    [TILE.BADLANDS]: 15,
    [TILE.ICE]: 10,
    [TILE.DESERT]: 5,
    [TILE.SEA]: 0,
    [TILE.LAVA]: 0,
  },
};
