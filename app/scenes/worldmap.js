import { Scene } from "../scene.js";
import { push } from "../game.js";
import { L } from "../layout.js";
import { Button } from "../ui/button.js";
import { Text } from "../ui/text.js";
import { makeBackButton } from "../ui/back.js";
import { drawWallet } from "../ui/currency.js";
import { MapInfoScene } from "./mapinfo.js";

const LOCATIONS = [
  { id: "forest_clearing", name: "Лесная поляна", maxLevel: 2, x: 0.3, y: 0.5 },
  { id: "desert_dunes", name: "Пустынные дюны", maxLevel: 0, x: 0.5, y: 0.6 },
  { id: "frozen_lake", name: "Мёрзлое озеро", maxLevel: 0, x: 0.7, y: 0.4 },
];

export class WorldMapScene extends Scene {
  enter() {
    this.elements = [
      makeBackButton(),
      new Text({
        x: L.x(0.5),
        y: L.y(0.12),
        text: "Карта мира",
        style: "title",
      }),
    ];

    const w = L.s(0.14),
      h = L.s(0.14);
    for (const loc of LOCATIONS) {
      this.elements.push(
        new Button({
          x: L.x(loc.x) - w / 2,
          y: L.y(loc.y) - h / 2,
          w,
          h,
          label: loc.name,
          onClick: () => push(new MapInfoScene({ id: loc.id })),
          customDraw: (ctx, b) => {
            ctx.fillStyle = "#333";
            ctx.fillRect(b.x, b.y, b.w, b.h);
            ctx.strokeStyle = "#777";
            ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);

            ctx.fillStyle = "#fff";
            ctx.font = `${L.s(0.025)}px monospace`;
            ctx.textAlign = "center";
            ctx.fillText(loc.name, b.x + b.w / 2, b.y + b.h / 2 - L.s(0.01));
            ctx.fillText(
              "★".repeat(loc.maxLevel) || "—",
              b.x + b.w / 2,
              b.y + b.h / 2 + L.s(0.03),
            );
            ctx.textAlign = "left";
          },
        }),
      );
    }
  }

  render(ctx) {
    drawWallet(ctx);
    super.render(ctx);
  }
}
