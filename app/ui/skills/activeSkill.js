import { SkillIcon } from "./skillIcon.js";
import { L } from "../../layout.js";
import { theme } from "../../theme.js";

export class ActiveSkill extends SkillIcon {
  drawShape(ctx) {
    const cx = this.x + this.w / 2;
    const cy = this.y + this.h / 2;
    const r = Math.min(this.w, this.h) / 2;

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = theme.button;
    ctx.fill();
    ctx.strokeStyle = theme.buttonBorder;
    ctx.stroke();
  }

  click(ctx) {
    if (this.locked) return;
    if (this.skill.type !== "active") return;
    const state = this.getState();
    if (state.kind === "cooldown") return;
    this.skill.skillUse?.(this.owner, ctx);
  }
}
