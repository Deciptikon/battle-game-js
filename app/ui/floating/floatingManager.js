import { FloatingLog } from "./floatingLog.js";
import { theme } from "../../theme.js";

const COLORS = {
  damage: theme.bad,
  heal: theme.good,
  evade: theme.textMuted,
  block: theme.textMuted,
  death: theme.bad,
  info: theme.text,
};

export class FloatingManager {
  constructor() {
    this.items = [];
  }

  // pop(x, y, { text, icon, kind })
  pop(x, y, { text = "", icon = null, kind = "info" } = {}) {
    this.items.push(
      new FloatingLog({
        x,
        y,
        text,
        icon,
        color: COLORS[kind] ?? theme.text,
      }),
    );
  }

  update(dt) {
    for (const it of this.items) it.update(dt);
    this.items = this.items.filter((it) => !it.dead);
  }

  draw(ctx) {
    for (const it of this.items) it.draw(ctx);
  }

  clear() {
    this.items.length = 0;
  }
}
