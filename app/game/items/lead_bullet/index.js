import { STAT } from "../../stats/enum.js";

export default {
  id: "lead_bullet",
  name: "Свинцовая пуля",
  description: "Скрытность = 8, скорость = 1.",

  apply(hero) {
    hero.stats[STAT.STEALTH] = 8;
    hero.stats[STAT.SPEED] = 1;
  },
};
