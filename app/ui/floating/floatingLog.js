import { L } from "../../layout.js";
import { get, has } from "../../assets/cache.js";

export class FloatingLog {
  constructor({ x, y, text = "", icon = null, color = "#fff" }) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.icon = icon; // ключ в кэше, например 'cat.icon'
    this.color = color;

    this.life = 0;
    this.maxLife = 1.2;
    this.vy = -L.s(0.08);
    this.dead = false;
  }

  update(dt) {
    this.life += dt;
    this.y += this.vy * dt;
    this.vy *= 0.97;
    if (this.life >= this.maxLife) this.dead = true;
  }

  draw(ctx) {
    const t = this.life / this.maxLife;
    const alpha = t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3;
    ctx.globalAlpha = Math.max(0, alpha);

    const hasIcon = this.icon && has(this.icon);
    const fontSize = L.s(0.03);
    const iconSize = fontSize * 1.2;

    // общая ширина = иконка + отступ + текст
    let totalW = 0;
    if (hasIcon) totalW += iconSize;
    if (hasIcon && this.text) totalW += fontSize * 0.3;

    if (this.text) {
      ctx.font = `bold ${fontSize}px monospace`;
      totalW += ctx.measureText(this.text).width;
    }

    let cursor = this.x - totalW / 2;
    const cy = this.y;

    if (hasIcon) {
      ctx.drawImage(
        get(this.icon),
        cursor,
        cy - iconSize / 2,
        iconSize,
        iconSize,
      );
      cursor += iconSize + fontSize * 0.3;
    }

    if (this.text) {
      ctx.fillStyle = this.color;
      ctx.font = `bold ${fontSize}px monospace`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(this.text, cursor, cy);
      ctx.textBaseline = "alphabetic";
    }

    ctx.globalAlpha = 1;
  }
}
