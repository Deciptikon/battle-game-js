export const L = {
  w: 0,
  h: 0,
  min: 0,

  init(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.resize();
    window.addEventListener("resize", () => this.resize());
  },

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.min = Math.min(this.w, this.h);

    this.canvas.width = Math.round(this.w * dpr);
    this.canvas.height = Math.round(this.h * dpr);
    this.canvas.style.width = this.w + "px";
    this.canvas.style.height = this.h + "px";

    // всё рисуем в CSS-пикселях, dpr учитывается автоматом
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  },

  // доли: |v| <= 1 → доля, иначе пиксели
  x(v) {
    return Math.abs(v) <= 1 ? v * this.w : v;
  },
  y(v) {
    return Math.abs(v) <= 1 ? v * this.h : v;
  },
  s(v) {
    return Math.abs(v) <= 1 ? v * this.min : v;
  }, // для квадратов, шрифтов, отступов
};
