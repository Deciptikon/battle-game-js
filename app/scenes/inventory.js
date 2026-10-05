import { Scene } from "../scene.js";
import { L } from "../layout.js";
import { theme } from "../theme.js";
import { Button } from "../ui/button.js";
import { Text } from "../ui/text.js";
import { makeBackButton } from "../ui/back.js";
import { drawWallet } from "../ui/currency.js";
import {
  listStashItems,
  listHeroItems,
  equip,
  unequip,
} from "../game/inventory.js";
import { state, saveLocal } from "../game/state.js";
import { defs } from "../game/defs.js";

export class InventoryScene extends Scene {
  constructor({ characterId }) {
    super();
    this.characterId = characterId;
    this.selectedIid = null;
  }

  enter() {
    const heroName = this.characterId;
    this.elements = [
      makeBackButton(),
      new Text({
        x: L.x(0.5),
        y: L.y(0.08),
        text: "Инвентарь · " + heroName,
        size: 0.06,
        align: "center",
      }),
      new Text({ x: L.x(0.03), y: L.y(0.18), text: "Склад", size: 0.03 }),
      new Text({ x: L.x(0.03), y: L.y(0.58), text: "Инвентарь", size: 0.03 }),
    ];

    // склад — сетка
    const cellW = L.s(0.1),
      cellH = L.s(0.14),
      gap = L.s(0.015);
    const startX = L.x(0.03),
      startY = L.y(0.22);
    const perRow = 5;

    const stash = listStashItems();
    stash.forEach((entry, i) => {
      const col = i % perRow;
      const row = Math.floor(i / perRow);
      const x = startX + col * (cellW + gap);
      const y = startY + row * (cellH + gap);
      const isSelected = entry.inst.iid === this.selectedIid;
      this.elements.push(
        new Button({
          x,
          y,
          w: cellW,
          h: cellH,
          label: entry.def.name,
          customDraw: (ctx, b) =>
            this.drawSlot(ctx, b, entry.def.name, isSelected),
          onClick: () => {
            this.selectedIid = entry.inst.iid;
            this.refresh();
          },
        }),
      );
    });

    // слоты героя
    const slotW = L.s(0.1),
      slotH = L.s(0.14),
      slotGap = L.s(0.015);
    const slotStartX = L.x(0.03),
      slotY = L.y(0.63);

    const heroItems = listHeroItems(this.characterId);
    heroItems.forEach(({ slotIndex, inst, def }) => {
      const x = slotStartX + slotIndex * (slotW + slotGap);
      const isSelected = inst && inst.iid === this.selectedIid;
      this.elements.push(
        new Button({
          x,
          y: slotY,
          w: slotW,
          h: slotH,
          label: def ? def.name : "",
          customDraw: (ctx, b) =>
            this.drawSlot(ctx, b, def ? def.name : "", isSelected),
          onClick: () => this.onSlotClick(slotIndex, inst),
        }),
      );
    });
  }

  refresh() {
    this.enter();
  }

  onSlotClick(slotIndex, inst) {
    if (inst) {
      // занят — снять
      unequip(this.characterId, slotIndex);
      if (this.selectedIid === inst.iid) this.selectedIid = null;
      saveLocal();
      this.refresh();
      return;
    }

    // пусто — надеть выделенное
    if (!this.selectedIid) return;
    const ok = equip(this.characterId, this.selectedIid, slotIndex);
    if (ok) {
      this.selectedIid = null;
      saveLocal();
      this.refresh();
    }
  }

  drawSlot(ctx, b, label, active) {
    ctx.fillStyle = theme.panel;
    ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.strokeStyle = active ? theme.accent : theme.panelBorder;
    ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);

    if (label) {
      ctx.fillStyle = theme.text;
      ctx.font = `${L.s(0.02)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText(label, b.x + b.w / 2, b.y + b.h - L.s(0.012));
      ctx.textAlign = "left";
    }
  }

  render(ctx) {
    drawWallet(ctx);

    const px = L.x(0.72),
      py = L.y(0.2),
      pw = L.x(0.26),
      ph = L.y(0.65);
    ctx.fillStyle = theme.panel;
    ctx.fillRect(px, py, pw, ph);
    ctx.strokeStyle = theme.panelBorder;
    ctx.strokeRect(px + 0.5, py + 0.5, pw - 1, ph - 1);

    super.render(ctx);

    // описание выделенного предмета — поверх панели
    if (this.selectedIid) {
      const inst = state.instances[this.selectedIid];
      const def = defs.items.get(inst.defId);
      ctx.fillStyle = theme.text;
      ctx.font = `${L.s(0.032)}px monospace`;
      ctx.fillText(def.name, px + L.s(0.02), py + L.s(0.05));
      ctx.fillStyle = theme.textMuted;
      ctx.font = `${L.s(0.025)}px monospace`;
      ctx.fillText(def.description ?? "", px + L.s(0.02), py + L.s(0.09));
    }
  }
}
