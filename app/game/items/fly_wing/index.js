import { STAT } from "../../stats/enum.js";

export default {
  id: "fly_wing",
  name: "Крыло мухи",
  description: "Уклонение = 8, HP = 2.",

  mods: {
    [STAT.EVASION]: () => 8,
    [STAT.HP]: () => 2,
  },
};
