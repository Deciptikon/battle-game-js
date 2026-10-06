import { Scene } from "../scene.js";
import { L } from "../layout.js";
import { theme } from "../theme.js";
import { Button } from "../ui/button.js";
import { Text } from "../ui/text.js";
import { makeBackButton } from "../ui/back.js";
import { drawWallet } from "../ui/currency.js";
import { Stash } from "../game/slots/stash.js";
import { HeroInventory } from "../game/slots/heroInventory.js";
import { swapInvSlots, swapInvAndStash } from "../game/inventory.js";
import { state, saveLocal } from "../game/state.js";
import { defs } from "../game/defs.js";

export class InventoryScene extends Scene {
  constructor({ characterId }) {
    super();
    this.characterId = characterId;
    this.selected = null;
  }

  enter() {
    this.stash = new Stash({
      x: L.x(0.03),
      y: L.y(0.24),
      w: L.s(0.09),
      h: L.s(0.13),
      gap: L.s(0.012),
      cols: 5,
      rows: 2,
      heroId: this.characterId,
      onSlotClick: (slot) => this.onSlotClick(slot),
    });

    this.inv = new HeroInventory({
      x: L.x(0.03),
      y: L.y(0.68),
      w: L.s(0.1),
      h: L.s(0.14),
      gap: L.s(0.012),
      count: 6,
      heroId: this.characterId,
      onSlotClick: (slot) => this.onSlotClick(slot),
      onSlotRemove: (slot) => this.onSlotRemove(slot),
    });

    this.pageText = new Text({
      x: L.x(0.5),
      y: L.y(0.59),
      text: "",
      size: 0.025,
      align: "center",
    });

    this.prevBtn = new Button({
      x: L.x(0.5) - L.s(0.07),
      y: L.y(0.5),
      w: L.s(0.05),
      h: L.s(0.06),
      label: "←",
      onClick: () => {
        this.stash.prev();
        this.clearSelection();
        this.updatePage();
      },
    });

    this.nextBtn = new Button({
      x: L.x(0.5) + L.s(0.02),
      y: L.y(0.5),
      w: L.s(0.05),
      h: L.s(0.06),
      label: "→",
      onClick: () => {
        this.stash.next();
        this.clearSelection();
        this.updatePage();
      },
    });

    this.elements = [
      makeBackButton(),
      new Text({
        x: L.x(0.5),
        y: L.y(0.08),
        text: "Инвентарь",
        style: "title",
      }),
      new Text({ x: L.x(0.03), y: L.y(0.18), text: "Склад", style: "body" }),
      new Text({
        x: L.x(0.03),
        y: L.y(0.62),
        text: "Инвентарь",
        style: "body",
      }),
      this.prevBtn,
      this.nextBtn,
      this.pageText,
      ...this.stash.slots,
      ...this.inv.slots,
    ];

    this.updatePage();
  }

  updatePage() {
    this.pageText.text = `${this.stash.page + 1} / ${this.stash.pageCount()}`;
    this.prevBtn.disabled = this.stash.page === 0;
    this.nextBtn.disabled = this.stash.page >= this.stash.pageCount() - 1;
  }

  clearSelection() {
    if (this.selected) this.selected.selected = false;
    this.selected = null;
  }

  onSlotClick(slot) {
    const sel = this.selected;

    // ничего не выбрано — выбрать
    if (!sel) {
      if (slot.empty) return;
      slot.selected = true;
      this.selected = slot;
      return;
    }

    // тот же слот — снять выделение
    if (sel === slot) {
      slot.selected = false;
      this.selected = null;
      return;
    }

    // разные слоты — операция
    let ok = false;

    if (sel.kind === "inv" && slot.kind === "inv") {
      ok = swapInvSlots(this.characterId, sel.index, slot.index);
    } else if (sel.kind === "stash" && slot.kind === "inv") {
      const entry = sel.entry;
      if (entry)
        ok = swapInvAndStash(this.characterId, slot.index, entry.inst.iid);
    } else if (sel.kind === "inv" && slot.kind === "stash") {
      const entry = slot.entry;
      if (entry)
        ok = swapInvAndStash(this.characterId, sel.index, entry.inst.iid);
    } else {
      // stash → stash: просто сменить выделение
      sel.selected = false;
      slot.selected = true;
      this.selected = slot;
      return;
    }

    if (ok) {
      saveLocal();
      sel.selected = false;
      slot.selected = false;
      this.selected = null;
      this.updatePage();
    }
  }

  onSlotRemove(slot) {
    const entry = slot.entry;
    if (!entry) return;

    slot.selected = false;
    if (this.selected === slot) this.selected = null;

    entry.inst.ownerId = "stash";
    state.heroes[this.characterId].slots[slot.index] = null;
    saveLocal();
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

    if (this.selected) {
      const entry = this.selected.entry;
      if (entry) {
        const owner = this.ownerLabel(entry.inst.ownerId);

        ctx.fillStyle = theme.text;
        ctx.font = `${L.s(0.032)}px monospace`;
        ctx.fillText(entry.def.name, px + L.s(0.02), py + L.s(0.05));

        ctx.fillStyle = theme.textFaint;
        ctx.font = `${L.s(0.022)}px monospace`;
        ctx.fillText(owner, px + L.s(0.02), py + L.s(0.09));

        ctx.fillStyle = theme.textMuted;
        ctx.font = `${L.s(0.025)}px monospace`;
        ctx.fillText(
          entry.def.description ?? "",
          px + L.s(0.02),
          py + L.s(0.14),
        );
      }
    }
  }

  ownerLabel(ownerId) {
    if (ownerId === "stash") return "Владелец: отсутствует";
    const def = defs.heroes.get(ownerId);
    return "Владелец: " + (def.name ?? ownerId);
  }
}
