import { Scene } from "../scene.js";
import { L } from "../layout.js";
import { Text } from "../ui/text.js";
import { makeBackButton } from "../ui/back.js";
import { drawWallet } from "../ui/currency.js";

export class ShopScene extends Scene {
  enter() {
    this.elements = [
      makeBackButton(),
      new Text({ x: L.x(0.5), y: L.y(0.12), text: "Магазин", style: "title" }),
      new Text({ x: L.x(0.5), y: L.y(0.5), text: "скоро", style: "faint" }),
    ];
  }

  render(ctx) {
    drawWallet(ctx);
    super.render(ctx);
  }
}
