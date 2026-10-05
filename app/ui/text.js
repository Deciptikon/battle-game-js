import { UIElement } from "./element.js";
import { L } from "../layout.js";
import { theme } from "../theme.js";
import { resolveStyle } from "../styles.js";

export class Text extends UIElement {
  constructor({ x, y, text, style = "body", size, color, align }) {
    super({ x, y });
    this.text = text;

    const s = resolveStyle(style);
    this.size = size ?? s.font ?? 0.03;
    this.color = color ?? s.color ?? theme.text;
    this.align = align ?? s.align ?? "left";
  }

  draw(ctx) {
    ctx.textAlign = this.align;
    ctx.fillStyle = this.color;
    ctx.font = `${L.s(this.size)}px monospace`;
    ctx.fillText(this.text, this.x, this.y);
    ctx.textAlign = "left";
  }
}
