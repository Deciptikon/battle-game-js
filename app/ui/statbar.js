import { ProgressBar } from "./progressbar.js";
import { L } from "../layout.js";
import { FONT } from "../styles.js";

export class StatBar extends ProgressBar {
  constructor({ x, y, w, h, icon, iconSize, value, max = 10, color }) {
    super({ x: x + iconSize, y, w: w - iconSize, h, value, max, color });
    this.icon = icon;
    this.iconX = x;
    this.iconSize = iconSize;
  }

  draw(ctx) {
    const baseline = this.y + this.h;

    // иконка слева
    ctx.fillStyle = "#fff";
    ctx.font = `${L.s(FONT.large)}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText(this.icon, this.iconX + this.iconSize / 2, baseline);
    ctx.textAlign = "left";

    super.draw(ctx);

    // значение справа
    ctx.fillStyle = "#fff";
    ctx.font = `${L.s(FONT.base)}px monospace`;
    ctx.fillText(String(this.value), this.x + this.w + L.s(0.015), baseline);
  }
}
