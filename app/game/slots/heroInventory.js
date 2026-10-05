import { Slot } from "../../ui/slot.js";
import { state } from "../state.js";
import { defs } from "../defs.js";

export class HeroInventory {
  constructor({
    x,
    y,
    w,
    h,
    gap,
    count = 6,
    heroId,
    onSlotClick,
    onSlotRemove,
  }) {
    this.heroId = heroId;

    this.slots = [];
    for (let i = 0; i < count; i++) {
      this.slots.push(
        new Slot({
          x: x + i * (w + gap),
          y,
          w,
          h,
          kind: "inv",
          index: i,
          getEntry: () => this.entryAt(i),
          onClick: onSlotClick,
          onRemove: onSlotRemove,
        }),
      );
    }
  }

  entryAt(slotIndex) {
    const hero = state.heroes[this.heroId];
    if (!hero) return null;
    const iid = hero.slots[slotIndex];
    if (!iid) return null;
    const inst = state.instances[iid];
    if (!inst) return null;
    return { inst, def: defs.items.get(inst.defId) };
  }

  draw(ctx) {
    for (const s of this.slots) s.draw(ctx);
  }

  clearSelection() {
    for (const s of this.slots) s.selected = false;
  }
}
