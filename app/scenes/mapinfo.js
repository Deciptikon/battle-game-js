import { Scene } from "../scene.js";
import { push } from "../game.js";
import { L } from "../layout.js";
import { Button } from "../ui/button.js";
import { Text } from "../ui/text.js";
import { makeBackButton } from "../ui/back.js";
import { drawWallet } from "../ui/currency.js";
import { theme } from "../theme.js";
import { MapScene } from "./map.js";
import { get as getLocation } from "../game/locations/registry.js";
import { state } from "../game/state.js";

const LEVELS = [0, 1, 2, 3, 4, 5, 6];

export class MapInfoScene extends Scene {
  constructor({ id }) {
    super();
    this.id = id;
    this.selectedLevel = 0;
  }

  enter() {
    const loc = getLocation(this.id);
    const prog = state.maps[this.id] ?? { unlocked: false, maxLevel: -1 };
    this.prog = prog;

    // доступный уровень = maxLevel + 1, но не больше 6
    this.maxAvailable = Math.min(prog.maxLevel + 1, 6);
    this.selectedLevel = Math.min(this.selectedLevel, this.maxAvailable);

    this.elements = [
      makeBackButton(),
      new Text({ x: L.x(0.5), y: L.y(0.12), text: loc.name, style: "title" }),
      new Text({
        x: L.x(0.5),
        y: L.y(0.25),
        text: loc.description,
        style: "dim",
      }),
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
      const available = lvl <= this.maxAvailable;
      this.elements.push(
        new Button({
          x: lx,
          y: ly,
          w: size,
          h: size,
          label: String(lvl),
          disabled: !available,
          customDraw: (ctx, b) => {
            const active = lvl === this.selectedLevel && available;
            const cleared = lvl <= prog.maxLevel;

            let bg = theme.levelUnselected;
            let border = theme.levelUnselectedBorder;
            if (cleared) {
              bg = theme.accent;
              border = theme.levelSelectedBorder;
            }
            if (active) {
              bg = theme.levelSelected;
              border = theme.levelSelectedBorder;
            }
            if (!available) {
              bg = theme.buttonDisabled;
              border = theme.buttonDisabledBorder;
            }

            ctx.fillStyle = bg;
            ctx.fillRect(b.x, b.y, b.w, b.h);
            ctx.strokeStyle = border;
            ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);

            ctx.fillStyle = available ? theme.text : theme.textDisabled;
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
