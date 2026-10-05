export class UIElement {
  constructor({ x, y, w = 0, h = 0 }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw(ctx) {}

  // кликабельность — опциональна
  hit(mx, my) {
    return false;
  }
  click() {}
}
