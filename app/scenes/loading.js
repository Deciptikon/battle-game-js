import { Scene } from "../scene.js";
import { go } from "../game.js";
import { L } from "../layout.js";
import { theme } from "../theme.js";
import { loadAll } from "../assets/loader.js";
import { splashAssets } from "../assets/splashAssets.js";
import { SplashScene } from "./splash.js";

export class LoadingScene extends Scene {
  enter() {
    this.ready = false;
    loadAll(Object.entries(splashAssets))
      .then(() => {
        this.ready = true;
        go(new SplashScene());
      })
      .catch(() => {
        this.ready = true;
        go(new SplashScene());
      });
  }

  render(ctx) {
    ctx.fillStyle = theme.splashBg;
    ctx.fillRect(0, 0, L.w, L.h);
  }
}
