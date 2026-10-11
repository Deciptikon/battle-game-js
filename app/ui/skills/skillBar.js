import { ActiveSkill } from "./activeSkill.js";
import { PassiveSkill } from "./passiveSkill.js";
import { ToggleSkill } from "./toggleSkill.js";
import { state } from "../../game/state.js";
import { theme } from "../../theme.js";
import { log } from "../../debug.js";

export class SkillBar {
  constructor({ x, y, size, gap, count, direction = "right", owner = null }) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.gap = gap;
    this.count = count;
    this.direction = direction === "right" ? 1 : -1;
    this.owner = owner;

    this.icons = new Array(count).fill(null);
  }

  setSkills(skills) {
    this.icons = new Array(this.count).fill(null);

    let visible = skills;
    if (state.settings?.sortSkills) {
      visible = skills.filter((s) => s && s.unlocked);
    }

    for (let i = 0; i < this.count; i++) {
      const skill = visible[i];
      if (!skill) continue;

      const px = this.x + this.direction * i * (this.size + this.gap);

      let Cls;
      if (skill.type === "active") Cls = ActiveSkill;
      else if (skill.type === "toggle") Cls = ToggleSkill;
      else Cls = PassiveSkill;

      this.icons[i] = new Cls({
        x: px,
        y: this.y,
        w: this.size,
        h: this.size,
        skill,
        owner: skill.owner ?? this.owner,
        locked: !skill.unlocked,
      });
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.count; i++) {
      if (this.icons[i]) {
        this.icons[i].draw(ctx);
      } else {
        const px = this.x + this.direction * i * (this.size + this.gap);
        this.drawEmptySlot(ctx, px);
      }
    }
  }

  drawEmptySlot(ctx, x) {
    ctx.strokeStyle = theme.panelBorder;
    ctx.strokeRect(x + 0.5, this.y + 0.5, this.size - 1, this.size - 1);
  }

  handleClick(mx, my, ctx) {
    for (const icon of this.icons) {
      if (!icon) continue;
      if (icon.hit(mx, my)) {
        log(
          "handleClick",
          icon.skill.id,
          "locked=",
          icon.locked,
          "unlocked=",
          icon.skill.unlocked,
        );
        icon.click(ctx);
        return true;
      }
    }
    return false;
  }
}
