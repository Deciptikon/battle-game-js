import { Scene } from "../scene.js";
import { go } from "../game.js";
import { L } from "../layout.js";
import { theme } from "../theme.js";
import { Text } from "../ui/base/text.js";
import { ProgressBar } from "../ui/bars/progressbar.js";
import { has, get } from "../assets/cache.js";
import { preloadGame } from "../assets/preload.js";
import { MenuScene } from "./menu.js";

export class SplashScene extends Scene {
  enter() {
    this.progress = 0;
    this.minTime = 2.0; // сек — минимум на экране
    this.elapsed = 0;
    this.loaded = false;

    const bw = L.x(0.6),
      bh = L.s(0.03);
    this.bar = new ProgressBar({
      x: L.x(0.2),
      y: L.y(0.78),
      w: bw,
      h: bh,
      value: 0,
      max: 1,
    });

    this.elements = [this.bar];

    preloadGame((done, total) => {
      this.progress = done / total;
    })
      .then(() => {
        this.loaded = true;
      })
      .catch((e) => {
        console.warn("preload error", e);
        this.loaded = true;
      });
  }

  update(dt) {
    this.elapsed += dt;
    this.bar.value = this.progress;

    if (this.loaded && this.elapsed >= this.minTime) {
      go(new MenuScene());
    }
  }

  render(ctx) {
    ctx.fillStyle = theme.splashBg;
    ctx.fillRect(0, 0, L.w, L.h);

    if (has("splash.logo")) {
      const w = L.s(0.5);
      ctx.drawImage(get("splash.logo"), L.x(0.5) - w / 2, L.y(0.15), w, w);
    } else {
      const t = new Text({
        x: L.x(0.5),
        y: L.y(0.2),
        text: "XPets",
        size: 0.12,
        color: theme.text,
        align: "center",
      });
      t.draw(ctx);
    }

    super.render(ctx);
  }
}
