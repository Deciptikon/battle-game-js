import { Scene } from "../scene.js";
import { go } from "../game.js";
import { SplashScene } from "./splash.js";
import { theme } from "../theme.js";

export class LoadingScene extends Scene {
  constructor() {
    super();
    this.time = 0;
  }

  update(dt) {
    // тут загружаются ресы для сплешскрина (пока — мгновенно)
    this.time += dt;
    if (this.time >= 0.3) go(new SplashScene());
  }

  render(ctx) {
    ctx.fillStyle = theme.splashBg;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
