import { UIElement } from "./element.js";
import { L } from "../layout.js";
import { theme } from "../theme.js";
import { get, has } from "../assets/cache.js";

export class HeroCard extends UIElement {
  constructor({ x, y, w, h, heroId, heroName, onClick }) {
    super({ x, y, w, h });
    this.heroId = heroId;
    this.heroName = heroName;
    this.onClick = onClick;
  }

  hit(mx, my) {
    return (
      mx >= this.x &&
      mx <= this.x + this.w &&
      my >= this.y &&
      my <= this.y + this.h
    );
  }

  click() {
    this.onClick?.();
  }

  draw(ctx) {
    ctx.fillStyle = theme.button;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = theme.buttonBorder;
    ctx.strokeRect(this.x + 0.5, this.y + 0.5, this.w - 1, this.h - 1);

    const iconKey = this.heroId + ".icon";
    if (has(iconKey)) {
      const img = get(iconKey);
      const s = Math.min(this.w, this.h) * 0.7;
      ctx.drawImage(img, this.x + (this.w - s) / 2, this.y + L.s(0.01), s, s);
    }

    ctx.fillStyle = theme.text;
    ctx.font = `${L.s(0.025)}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText(
      this.heroName,
      this.x + this.w / 2,
      this.y + this.h - L.s(0.015),
    );
    ctx.textAlign = "left";
  }
}
