import { STAT } from "../../stats/enum.js";

export default {
  id: "walnut",
  name: "Грецкий орех",
  description: "HP = 8, защита = 0.",

  apply(hero) {
    hero.stats[STAT.HP] = 8;
    hero.stats[STAT.ARMOR] = 0;
  },
};
