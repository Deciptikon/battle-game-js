import { push } from "../game.js";
import { L } from "../layout.js";
import { Button } from "../ui/base/button.js";
import { Text } from "../ui/base/text.js";
import { drawWallet } from "../ui/hud/currency.js";

import { Scene } from "../scene.js";
import { CharactersScene } from "./characters.js";
import { AchievementsScene } from "./achievements.js";
import { SettingsScene } from "./settings.js";
import { InfoScene } from "./info.js";
import { WorldMapScene } from "./worldmap.js";
import { ShopScene } from "./shop.js";

import { get, has } from "../assets/cache.js";
import { state } from "../game/state.js";

export class MenuScene extends Scene {
  enter() {
    this.elements = [];

    const w = L.s(0.35),
      h = L.s(0.08),
      gap = L.s(0.02);
    const x = L.x(0.15) - w / 2;
    let y = L.y(0.38);

    const items = [
      { label: "Карта", scene: () => new WorldMapScene() },
      { label: "Персонажи", scene: () => new CharactersScene() },
      { label: "Магазин", scene: () => new ShopScene() },
      { label: "Ачивки", scene: () => new AchievementsScene() },
      { label: "Настройки", scene: () => new SettingsScene() },
    ];
    for (const { label, scene } of items) {
      this.elements.push(
        new Button({
          x,
          y,
          w,
          h,
          label,
          onClick: () => push(scene()),
        }),
      );
      y += h + gap;
    }

    const s = L.s(0.08);
    this.elements.push(
      new Button({
        x: L.x(0.9) - s,
        y: L.y(0.9) - s,
        w: s,
        h: s,
        label: "i",
        onClick: () => push(new InfoScene()),
      }),
    );
  }

  render(ctx) {
    drawWallet(ctx);

    const key = state.activeHero + ".portrait";
    if (has(key)) {
      const img = get(key);
      const s = L.s(0.48);
      ctx.drawImage(img, L.x(0.5) - s / 2, L.y(0.36), s, s);
    }

    super.render(ctx);
  }
}
