import { STAT } from "../../stats/enum.js";

export default {
  id: "walnut",
  name: "Грецкий орех",
  description: "HP = 8, защита = 0.",

  mods: {
    [STAT.HP]: () => 8,
    [STAT.ARMOR]: () => 0,
  },
};
