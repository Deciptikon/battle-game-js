export class Scene {
  elements = [];

  enter() {}
  exit() {}
  update(dt) {}
  onPointerDown(x, y) {}
  onPointerMove(x, y) {}
  onKeyDown(key) {}
  onWheel(e) {}

  render(ctx) {
    for (const el of this.elements) el.draw(ctx);
  }

  onPointerUp(mx, my) {
    for (const el of this.elements) {
      if (el.hit?.(mx, my)) {
        el.click?.(mx, my);
        return;
      }
    }
  }
}
