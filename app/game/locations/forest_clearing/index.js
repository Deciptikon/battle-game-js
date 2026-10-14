import { TILE } from "../../tiles/enum.js";
import { randomGrid } from "../generate.js";

const grid = randomGrid(20, {
  [TILE.PLAIN]: 30,
  [TILE.FOREST]: 20,
  [TILE.MOUNTAIN]: 8,
  [TILE.SWAMP]: 5,
  [TILE.SNOW]: 3,
  [TILE.DESERT]: 2,
  [TILE.SEA]: 5,
  [TILE.LAVA]: 0,
});

export default {
  id: "forest_clearing",
  name: "Лесная поляна",
  description: "Спокойное место для первых шагов.",
  position: { x: 0.2, y: 0.2 },
  startUnlocked: true,
  style: "pixel",
  grid,
};
