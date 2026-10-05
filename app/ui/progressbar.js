import { UIElement } from "./element.js";
import { theme } from "../theme.js";

export class ProgressBar extends UIElement {
  constructor({ x, y, w, h, value = 0, max = 1, color = null }) {
    super({ x, y, w, h });
    this.value = value;
    this.max = max;
    this.color = color;
  }

  draw(ctx) {
    const p =
      this.max > 0 ? Math.max(0, Math.min(1, this.value / this.max)) : 0;

    ctx.fillStyle = theme.progressBg;
    ctx.fillRect(this.x, this.y, this.w, this.h);

    ctx.fillStyle = this.color ?? theme.progressBar;
    ctx.fillRect(this.x, this.y, this.w * p, this.h);

    ctx.strokeStyle = theme.progressBorder;
    ctx.strokeRect(this.x + 0.5, this.y + 0.5, this.w - 1, this.h - 1);
  }
}
