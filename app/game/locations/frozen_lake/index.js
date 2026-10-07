import { TILE } from "../../tiles/enum.js";

const row = new Array(20).fill(TILE.ICE);
const grid = Array.from({ length: 20 }, () => [...row]);

export default {
  id: "frozen_lake",
  name: "Мёрзлое озеро",
  description: "Холодно. Скользко.",
  position: { x: 0.72, y: 0.42 },
  startUnlocked: false,
  style: "pixel",
  grid,
};
