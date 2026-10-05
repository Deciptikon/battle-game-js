import { Scene } from "../scene.js";
import { go } from "../game.js";
import { L } from "../layout.js";
import { Text } from "../ui/text.js";
import { ProgressBar } from "../ui/progressbar.js";
import { MenuScene } from "./menu.js";
import { theme } from "../theme.js";

export class SplashScene extends Scene {
  constructor() {
    super();
    this.progress = 0;
  }

  enter() {
    const bw = L.x(0.6),
      bh = L.s(0.03);

    this.elements = [
      new Text({ x: L.x(0.5), y: L.y(0.4), text: "XPets", style: "title" }),
      new Text({
        x: L.x(0.5),
        y: L.y(0.5),
        text: "питомцы · выживание",
        style: "faint",
      }),
    ];

    this.bar = new ProgressBar({
      x: L.x(0.2),
      y: L.y(0.75),
      w: bw,
      h: bh,
      value: 0,
      max: 1,
    });
    this.elements.push(this.bar);
  }

  update(dt) {
    // тут будет реальная загрузка ресурсов игры (пока — просто тик)
    this.progress += dt * 0.5;
    this.bar.value = this.progress;
    if (this.progress >= 1) go(new MenuScene());
  }

  render(ctx) {
    ctx.fillStyle = theme.splashBg;
    ctx.fillRect(0, 0, L.w, L.h);
    super.render(ctx);
  }
}
