import { Scene } from "../scene.js";
import { L } from "../layout.js";
import { Text } from "../ui/text.js";
import { makeBackButton } from "../ui/back.js";
import { drawWallet } from "../ui/currency.js";

export class SettingsScene extends Scene {
  enter() {
    this.elements = [
      makeBackButton(),
      new Text({
        x: L.x(0.5),
        y: L.y(0.12),
        text: "Настройки",
        style: "title",
      }),
      new Text({
        x: L.x(0.5),
        y: L.y(0.5),
        text: "список настроек",
        style: "faint",
      }),
    ];
  }

  render(ctx) {
    drawWallet(ctx);
    super.render(ctx);
  }
}
