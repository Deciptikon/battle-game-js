import { TILE } from "../../tiles/enum.js";

const row = new Array(20).fill(TILE.DESERT);
const grid = Array.from({ length: 20 }, () => [...row]);

export default {
  id: "desert_dunes",
  name: "Пустынные дюны",
  description: "Жарко. Мало воды.",
  position: { x: 0.5, y: 0.65 },
  startUnlocked: true,
  style: "pixel",
  grid,
};
