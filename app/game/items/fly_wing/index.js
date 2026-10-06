import { STAT } from "../../stats/enum.js";

export default {
  id: "fly_wing",
  name: "Крыло мухи",
  description: "Уклонение = 8, HP = 2.",

  apply(hero) {
    hero.stats[STAT.EVASION] = 8;
    hero.stats[STAT.HP] = 2;
  },
};
