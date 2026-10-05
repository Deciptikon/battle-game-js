import { Button } from "./button.js";
import { L } from "../layout.js";
import { back } from "../game.js";

export function makeBackButton() {
  const s = L.s(0.08);
  return new Button({
    x: L.x(0.02),
    y: L.y(0.03),
    w: s * 1.4,
    h: s,
    label: "←",
    onClick: () => back(),
  });
}
