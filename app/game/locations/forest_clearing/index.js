import { TILE } from "../../tiles/enum.js";

const row = new Array(20).fill(TILE.PLAIN);
const grid = Array.from({ length: 20 }, () => [...row]);

export default {
  id: "forest_clearing",
  name: "Лесная поляна",
  description: "Спокойное место для первых шагов.",
  position: { x: 0.3, y: 0.5 },
  startUnlocked: true,
  style: "pixel",
  grid,
};
