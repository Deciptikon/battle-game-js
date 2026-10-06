import { UIElement } from "./element.js";
import { L } from "../layout.js";
import { theme } from "../theme.js";

export class Slot extends UIElement {
  constructor({ x, y, w, h, kind, index, getEntry, onClick, onRemove = null }) {
    super({ x, y, w, h });
    this.kind = kind;
    this.index = index;
    this.getEntry = getEntry;
    this.onClick = onClick;
    this.onRemove = onRemove;
    this.selected = false;
  }

  get entry() {
    return this.getEntry() ?? null;
  }
  get empty() {
    return !this.entry;
  }
  get removable() {
    return this.onRemove && !this.empty;
  }

  // «чужой» = только склад, и только если надет на кого-то
  get foreign() {
    const e = this.entry;
    return this.kind === "stash" && e && e.inst.ownerId !== "stash";
  }

  removeRect() {
    if (!this.removable) return null;
    const s = this.w * 0.35;
    return { x: this.x + this.w - s, y: this.y, w: s, h: s };
  }

  hit(mx, my) {
    return (
      mx >= this.x &&
      mx <= this.x + this.w &&
      my >= this.y &&
      my <= this.y + this.h
    );
  }

  click(mx, my) {
    const r = this.removeRect();
    if (r && mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
      this.onRemove(this);
      return;
    }
    this.onClick?.(this);
  }

  draw(ctx) {
    const entry = this.entry;

    ctx.fillStyle = this.foreign ? theme.panelForeign : theme.panel;
    ctx.fillRect(this.x, this.y, this.w, this.h);

    ctx.strokeStyle = this.selected ? theme.accent : theme.panelBorder;
    ctx.strokeRect(this.x + 0.5, this.y + 0.5, this.w - 1, this.h - 1);

    if (entry) {
      ctx.fillStyle = theme.text;
      ctx.font = `${L.s(0.02)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText(
        entry.def.name,
        this.x + this.w / 2,
        this.y + this.h - L.s(0.012),
      );
      ctx.textAlign = "left";
    }

    const r = this.removeRect();
    if (r) {
      ctx.fillStyle = theme.button;
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.strokeStyle = theme.buttonBorder;
      ctx.strokeRect(r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1);

      ctx.fillStyle = theme.buttonText;
      ctx.font = `${L.s(0.022)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("×", r.x + r.w / 2, r.y + r.h / 2 + L.s(0.008));
      ctx.textAlign = "left";
    }
  }
}
