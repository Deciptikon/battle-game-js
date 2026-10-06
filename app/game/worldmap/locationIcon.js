import { L } from "../../layout.js";
import { theme } from "../../theme.js";

export class LocationIcon {
  constructor({ loc, prog, radius }) {
    this.loc = loc;
    this.prog = prog; // { unlocked, maxLevel }
    this.radius = radius;
  }

  draw(ctx, p) {
    const { loc, prog, radius } = this;

    // тело маркера
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = this.bodyColor();
    ctx.fill();
    ctx.strokeStyle = this.borderColor();
    ctx.lineWidth = prog.unlocked ? 2 : 1;
    ctx.stroke();
    ctx.lineWidth = 1;

    // иконка внутри — пока буква, потом спрайт
    ctx.fillStyle = this.iconColor();
    ctx.font = `${L.s(0.03)}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.iconText(), p.x, p.y);
    ctx.textBaseline = "alphabetic";

    // имя под маркером
    ctx.fillStyle = prog.unlocked ? theme.text : theme.textDisabled;
    ctx.font = `${L.s(0.024)}px monospace`;
    ctx.fillText(loc.name, p.x, p.y + radius + L.s(0.035));

    // звёзды уровня
    ctx.fillStyle = theme.gold;
    ctx.font = `${L.s(0.02)}px monospace`;
    ctx.fillText(this.starsText(), p.x, p.y + radius + L.s(0.06));

    ctx.textAlign = "left";
  }

  bodyColor() {
    if (!this.prog.unlocked) return theme.buttonDisabled;
    return theme.button;
  }

  borderColor() {
    if (!this.prog.unlocked) return theme.buttonDisabledBorder;
    return theme.buttonBorder;
  }

  iconColor() {
    if (!this.prog.unlocked) return theme.textDisabled;
    return theme.text;
  }

  iconText() {
    // пока буква — потом спрайт
    if (!this.prog.unlocked) return "?";
    return this.loc.name.charAt(0).toUpperCase();
  }

  starsText() {
    if (!this.prog.unlocked) return "—";
    if (this.prog.maxLevel < 0) return "···";
    return "★".repeat(this.prog.maxLevel + 1);
  }
}
