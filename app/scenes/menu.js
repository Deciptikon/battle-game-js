import { Scene } from "../scene.js";
import { push } from "../game.js";
import { L } from "../layout.js";
import { Button } from "../ui/button.js";
import { Text } from "../ui/text.js";
import { drawWallet } from "../ui/currency.js";
import { CharactersScene } from "./characters.js";
import { AchievementsScene } from "./achievements.js";
import { SettingsScene } from "./settings.js";
import { InfoScene } from "./info.js";
import { WorldMapScene } from "./worldmap.js";

export class MenuScene extends Scene {
  enter() {
    this.elements = [];

    const w = L.s(0.5),
      h = L.s(0.08),
      gap = L.s(0.02);
    const x = L.x(0.5) - w / 2;
    let y = L.y(0.42);

    const items = [
      { label: "В бой", scene: () => new WorldMapScene() },
      { label: "Персонажи", scene: () => new CharactersScene() },
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
        x: L.x(0.98) - s,
        y: L.y(0.98) - s,
        w: s,
        h: s,
        label: "i",
        onClick: () => push(new InfoScene()),
      }),
    );

    this.elements.push(
      new Text({
        x: L.x(0.5),
        y: L.y(0.2),
        text: "(персонаж)",
        style: "faint",
      }),
    );
  }

  render(ctx) {
    drawWallet(ctx);
    super.render(ctx);
  }
}
