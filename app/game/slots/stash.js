import { Slot } from "../../ui/slot.js";
import { state } from "../state.js";
import { defs } from "../defs.js";

export class Stash {
  constructor({ x, y, w, h, gap, cols, rows, heroId, onSlotClick }) {
    this.cols = cols;
    this.rows = rows;
    this.perPage = cols * rows;
    this.page = 0;
    this.heroId = heroId;

    this.slots = [];
    for (let i = 0; i < this.perPage; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      this.slots.push(
        new Slot({
          x: x + col * (w + gap),
          y: y + row * (h + gap),
          w,
          h,
          kind: "stash",
          index: i,
          getEntry: () => this.entryAt(i),
          onClick: onSlotClick,
        }),
      );
    }
  }

  // всё, кроме надетого на текущего героя
  list() {
    return Object.values(state.instances).filter(
      (i) => i.ownerId !== this.heroId,
    );
  }

  pageCount() {
    return Math.max(1, Math.ceil(this.list().length / this.perPage));
  }

  entryAt(cellIndex) {
    const all = this.list();
    const idx = this.page * this.perPage + cellIndex;
    const inst = all[idx];
    if (!inst) return null;
    return { inst, def: defs.items.get(inst.defId) };
  }

  next() {
    if (this.page < this.pageCount() - 1) {
      this.page++;
      return true;
    }
    return false;
  }

  prev() {
    if (this.page > 0) {
      this.page--;
      return true;
    }
    return false;
  }

  draw(ctx) {
    for (const s of this.slots) s.draw(ctx);
  }

  clearSelection() {
    for (const s of this.slots) s.selected = false;
  }
}
