import { UIElement } from "../element.js";
import { L } from "../../layout.js";
import { theme } from "../../theme.js";
import { get, has } from "../../assets/cache.js";

export class SkillIcon extends UIElement {
  constructor({ x, y, w, h, skill, owner, locked = false }) {
    super({ x, y, w, h });
    this.skill = skill;
    this.owner = owner;
    this.locked = locked;
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
    if (this.locked) return;
  }

  getState() {
    return this.skill.skillGetState?.(this.owner) ?? { kind: "none" };
  }

  draw(ctx) {
    const prev = ctx.globalAlpha;
    if (this.locked) ctx.globalAlpha = 0.35;

    this.drawShape(ctx);
    this.drawIcon(ctx);
    if (!this.locked) this.drawState(ctx);

    ctx.globalAlpha = prev;
  }

  drawShape(ctx) {}

  drawIcon(ctx) {
    const state = this.getState();
    let iconKey = this.skill.icon;
    if (state.kind === "toggle" && !state.on && this.skill.iconOff) {
      iconKey = this.skill.iconOff;
    }

    if (iconKey && has(iconKey)) {
      const pad = this.w * 0;
      ctx.drawImage(
        get(iconKey),
        this.x + pad,
        this.y + pad,
        this.w - pad * 2,
        this.h - pad * 2,
      );
    } else {
      ctx.fillStyle = theme.buttonText;
      ctx.font = `${L.s(0.03)}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        this.skill.name?.[0] ?? "?",
        this.x + this.w / 2,
        this.y + this.h / 2,
      );
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "left";
    }
  }

  drawState(ctx) {
    const state = this.getState();
    switch (state.kind) {
      case "cooldown":
        this.drawCooldown(ctx, state);
        break;
      case "charges":
        this.drawCharges(ctx, state);
        break;
      case "flash":
        this.drawFlash(ctx, state);
        break;
      case "none":
      default:
        break;
    }
  }

  drawCooldown(ctx, state) {
    const p = state.max > 0 ? state.value / state.max : 0;
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(this.x, this.y, this.w, this.h * p);

    ctx.fillStyle = theme.text;
    ctx.font = `${L.s(0.028)}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      String(Math.ceil(state.value)),
      this.x + this.w / 2,
      this.y + this.h / 2,
    );
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
  }

  drawCharges(ctx, state) {
    ctx.fillStyle = theme.text;
    ctx.font = `${L.s(0.022)}px monospace`;
    ctx.textAlign = "right";
    ctx.fillText(
      `${state.value}/${state.max}`,
      this.x + this.w - L.s(0.008),
      this.y + this.h - L.s(0.008),
    );
    ctx.textAlign = "left";
  }

  drawFlash(ctx) {
    const prev = ctx.globalAlpha;
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = theme.gold;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.globalAlpha = prev;
  }
}
