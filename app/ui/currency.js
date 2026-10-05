import { L } from "../layout.js";
import { theme } from "../theme.js";

export const wallet = {
  coins: 0,
  crystals: 0,
};

export function drawWallet(ctx) {
  const x = L.x(0.97);
  const y = L.y(0.05);
  ctx.textAlign = "right";
  ctx.font = `${L.s(0.032)}px monospace`;

  ctx.fillStyle = theme.gold;
  ctx.fillText("◉ " + wallet.coins, x, y);

  ctx.fillStyle = theme.crystal;
  ctx.fillText("◆ " + wallet.crystals, x, y + L.s(0.04));

  ctx.textAlign = "left";
}
