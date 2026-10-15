import { LIFESTYLE, ROLE, SIZE } from "../../actors/tags.js";
import { STAT } from "../../stats/enum.js";
import { TILE } from "../../tiles/enum.js";

export default {
  id: "eagle",
  name: "Орёл",
  description: "Хищник, охотится на мелких.",

  assets: {
    icon: new URL("./icon.png", import.meta.url).href,
    sprite: new URL("./sprite.png", import.meta.url).href,
  },

  tags: {
    self: [SIZE.MEDIUM, LIFESTYLE.AIR, ROLE.PREDATOR],
    hunts: {
      size: [SIZE.SMALL],
    },
  },

  attackType: "talon",
  attackRange: 1,

  baseStats: {
    [STAT.HP]: 6,
    [STAT.ARMOR]: 4,
    [STAT.STEALTH]: 6,
    [STAT.SPEED]: 8,
    [STAT.CAUTION]: 4,
    [STAT.EVASION]: 6,
    [STAT.MORALE]: 8,
    [STAT.PERCEPTION]: 8,
  },

  prefs: {
    [TILE.PLAIN]: 80,
    [TILE.FOREST]: 60,
    [TILE.MOUNTAIN]: 100,
    [TILE.TUNDRA]: 40,
    [TILE.SNOW]: 30,
    [TILE.SWAMP]: 15,
    [TILE.BADLANDS]: 40,
    [TILE.ICE]: 10,
    [TILE.DESERT]: 40,
    [TILE.SEA]: 30,
    [TILE.LAVA]: 0,
  },
};
