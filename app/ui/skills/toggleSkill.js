import { SkillIcon } from "./skillIcon.js";
import { theme } from "../../theme.js";

export class ToggleSkill extends SkillIcon {
  drawShape(ctx) {
    // тело — как у пассивки
    ctx.fillStyle = theme.panel;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = theme.panelBorder;
    ctx.strokeRect(this.x + 0.5, this.y + 0.5, this.w - 1, this.h - 1);

    // обводка — отличает toggle
    const state = this.getState();
    const inset = this.w * 0.1;
    ctx.strokeStyle = state.on ? theme.toggleOn : theme.toggleOff;
    ctx.lineWidth = 3;
    ctx.strokeRect(
      this.x - inset,
      this.y - inset,
      this.w + inset * 2,
      this.h + inset * 2,
    );
    ctx.lineWidth = 1;
  }

  click(ctx) {
    if (this.locked) return;
    this.skill.skillUse?.(this.owner, ctx);
  }
}
