import { SkillIcon } from "./skillIcon.js";
import { theme } from "../../theme.js";

export class PassiveSkill extends SkillIcon {
  drawShape(ctx) {
    ctx.fillStyle = theme.panel;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = theme.panelBorder;
    ctx.strokeRect(this.x + 0.5, this.y + 0.5, this.w - 1, this.h - 1);
  }
  // click — пустой, из базового
}
