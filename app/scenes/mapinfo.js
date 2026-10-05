import { Scene } from "../scene.js";
import { push } from "../game.js";
import { L } from "../layout.js";
import { Button } from "../ui/button.js";
import { Text } from "../ui/text.js";
import { makeBackButton } from "../ui/back.js";
import { drawWallet } from "../ui/currency.js";
import { MapScene } from "./map.js";

const INFO = {
  forest_clearing: {
    name: "Лесная поляна",
    desc: "Спокойное место для первых шагов.",
  },
  desert_dunes: { name: "Пустынные дюны", desc: "Жарко. Мало воды." },
  frozen_lake: { name: "Мёрзлое озеро", desc: "Холодно. Скользко." },
};

const LEVELS = [0, 1, 2, 3, 4, 5, 6];

export class MapInfoScene extends Scene {
  constructor({ id }) {
    super();
    this.id = id;
    this.selectedLevel = 0;
  }

  enter() {
    const info = INFO[this.id] ?? { name: this.id, desc: "" };

    this.elements = [
      makeBackButton(),
      new Text({ x: L.x(0.5), y: L.y(0.12), text: info.name, style: "title" }),
      new Text({ x: L.x(0.5), y: L.y(0.25), text: info.desc, style: "dim" }),
      new Text({
        x: L.x(0.5),
        y: L.y(0.3),
        text: "условия, противники, артефакты",
        style: "dim",
      }),
      new Text({
        x: L.x(0.5),
        y: L.y(0.56),
        text: "Сложность",
        style: "faint",
      }),
    ];

    const size = L.s(0.08),
      gap = L.s(0.02);
    const total = LEVELS.length * size + (LEVELS.length - 1) * gap;
    let lx = L.x(0.5) - total / 2;
    const ly = L.y(0.6);
    for (const lvl of LEVELS) {
      this.elements.push(
        new Button({
          x: lx,
          y: ly,
          w: size,
          h: size,
          label: String(lvl),
          customDraw: (ctx, b) => {
            const active = lvl === this.selectedLevel;
            ctx.fillStyle = active ? "#4a7" : "#222";
            ctx.fillRect(b.x, b.y, b.w, b.h);
            ctx.strokeStyle = active ? "#7fc" : "#444";
            ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);
            ctx.fillStyle = "#fff";
            ctx.font = `${L.s(0.035)}px monospace`;
            ctx.textAlign = "center";
            ctx.fillText(b.label, b.x + b.w / 2, b.y + b.h / 2 + L.s(0.012));
            ctx.textAlign = "left";
          },
          onClick: () => {
            this.selectedLevel = lvl;
          },
        }),
      );
      lx += size + gap;
    }

    const fw = L.s(0.3),
      fh = L.s(0.1);
    this.elements.push(
      new Button({
        x: L.x(0.5) - fw / 2,
        y: L.y(0.78),
        w: fw,
        h: fh,
        label: "В бой",
        onClick: () =>
          push(new MapScene({ id: this.id, level: this.selectedLevel })),
      }),
    );
  }

  render(ctx) {
    drawWallet(ctx);
    super.render(ctx);
  }
}
