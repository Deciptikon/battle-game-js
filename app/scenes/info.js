import { Scene } from "../scene.js";
import { L } from "../layout.js";
import { Text } from "../ui/base/text.js";
import { makeBackButton } from "../ui/hud/back.js";

export class InfoScene extends Scene {
  enter() {
    this.elements = [
      makeBackButton(),
      new Text({
        x: L.x(0.5),
        y: L.y(0.12),
        text: "Информация",
        style: "title",
      }),
      new Text({
        x: L.x(0.5),
        y: L.y(0.5),
        text: "инфа",
        style: "faint",
      }),
    ];
  }
}
