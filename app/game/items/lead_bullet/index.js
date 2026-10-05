import { STAT } from "../../stats/enum.js";

export default {
  id: "lead_bullet",
  name: "Свинцовая пуля",
  description: "Скрытность = 8, скорость = 1.",

  mods: {
    [STAT.STEALTH]: () => 8,
    [STAT.SPEED]: () => 1,
  },
};
