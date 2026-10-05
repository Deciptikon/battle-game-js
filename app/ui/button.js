import { UIElement } from "./element.js";
import { L } from "../layout.js";
import { theme } from "../theme.js";
import { resolveStyle } from "../styles.js";

export class Button extends UIElement {
  constructor({
    x,
    y,
    w,
    h,
    label,
    onClick,
    style = "button",
    disabled = false,
    customDraw = null,
  }) {
    super({ x, y, w, h });
    this.label = label;
    this.onClick = onClick;
    this.disabled = disabled;
    this.customDraw = customDraw;

    const s = resolveStyle(style);
    this.fontSize = s.font ?? 0.035;
    this.textColor = s.color ?? theme.buttonText;
  }

  hit(mx, my) {
    if (this.disabled) return false;
    return (
      mx >= this.x &&
      mx <= this.x + this.w &&
      my >= this.y &&
      my <= this.y + this.h
    );
  }

  click() {
    if (this.disabled) return;
    this.onClick?.();
  }

  draw(ctx) {
    if (this.customDraw) {
      this.customDraw(ctx, this);
      return;
    }

    ctx.fillStyle = this.disabled ? theme.buttonDisabled : theme.button;
    ctx.fillRect(this.x, this.y, this.w, this.h);

    ctx.strokeStyle = this.disabled
      ? theme.buttonDisabledBorder
      : theme.buttonBorder;
    ctx.strokeRect(this.x, this.y, this.w, this.h);

    ctx.fillStyle = this.disabled ? theme.buttonDisabledText : this.textColor;
    ctx.font = `${L.s(this.fontSize)}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText(
      this.label,
      this.x + this.w / 2,
      this.y + this.h / 2 + L.s(0.012),
    );
    ctx.textAlign = "left";
  }
}
