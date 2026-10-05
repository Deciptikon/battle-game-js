import { STAT } from "./enum.js";

export const STAT_DEFS = {
  [STAT.HP]: { name: "Жизнь", icon: "❤", order: 1 },
  [STAT.ARMOR]: { name: "Защита", icon: "🛡", order: 2 },
  [STAT.STEALTH]: { name: "Скрытность", icon: "👤", order: 3 },
  [STAT.SPEED]: { name: "Скорость", icon: "🌪", order: 4 },
  [STAT.CAUTION]: { name: "Осторожность", icon: "👀", order: 5 },
  [STAT.EVASION]: { name: "Уклонение", icon: "🌀", order: 6 },
  [STAT.MORALE]: { name: "Мораль", icon: "⚖", order: 7 },
  [STAT.PERCEPTION]: { name: "Наблюдательность", icon: "👁", order: 8 },
};
