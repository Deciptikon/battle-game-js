import { LIFESTYLE, ROLE, SIZE } from "../../actors/tags.js";
import { STAT } from "../../stats/enum.js";
import { TILE } from "../../tiles/enum.js";

export default {
  id: "hedgehog",
  name: "Ёж",
  description: "Самый защищённый.",
  startUnlocked: true,
  tags: {
    self: [SIZE.SMALL, LIFESTYLE.GROUND, ROLE.PET],
  },

  assets: {
    icon: new URL("./icon.png", import.meta.url).href,
    portrait: new URL("./portrait.png", import.meta.url).href,
    sprite: new URL("./sprite.png", import.meta.url).href,
  },

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
