import { UIElement } from "../element.js";
import { L } from "../../layout.js";
import { theme } from "../../theme.js";

export class Overlay extends UIElement {
  constructor({ h = 0.8, title = "", lines = [] }) {
    super({ x: 0, y: 0, w: L.w, h: L.h * h });

    this.open = false;
    this.title = title;
    this.lines = lines;

    const btnSize = L.s(0.06);
    this.closeBtn = {
      x: L.x(0.95) - btnSize,
      y: L.y(0.04),
      w: btnSize,
      h: btnSize,
    };
  }

  show() {
    this.open = true;
  }
  hide() {
    this.open = false;
  }

  // возвращает true если клик был обработан оверлеем
  handleClick(mx, my) {
    if (!this.open) return false;

    // клик вне оверлея (ниже) — пропускаем, пусть обрабатывает сцена
    if (my > this.h) return false;

    const b = this.closeBtn;
    if (mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) {
      this.hide();
      return true;
    }

    // клик внутри оверлея — поглощён
    return true;
  }

  draw(ctx) {
    if (!this.open) return;

    ctx.fillStyle = "rgba(0,0,0,0.85)";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = theme.panelBorder;
    ctx.strokeRect(0.5, 0.5, this.w - 1, this.h - 1);

    // заголовок
    ctx.fillStyle = theme.text;
    ctx.font = `${L.s(0.04)}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText(this.title, L.x(0.5), L.y(0.08));

    // строки
    ctx.fillStyle = theme.textMuted;
    ctx.font = `${L.s(0.028)}px monospace`;
    let y = L.y(0.2);
    for (const line of this.lines) {
      ctx.fillText(line, L.x(0.5), y);
      y += L.y(0.06);
    }
    ctx.textAlign = "left";

    // крестик
    const b = this.closeBtn;
    ctx.fillStyle = theme.button;
    ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.strokeStyle = theme.buttonBorder;
    ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);
    ctx.fillStyle = theme.buttonText;
    ctx.font = `${L.s(0.03)}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText("×", b.x + b.w / 2, b.y + b.h / 2 + L.s(0.012));
    ctx.textAlign = "left";
  }
}
