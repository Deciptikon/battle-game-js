import { Scene } from "../scene.js";
import { push } from "../game.js";
import { L } from "../layout.js";
import { Button } from "../ui/button.js";
import { Text } from "../ui/text.js";
import { StatBar } from "../ui/statbar.js";
import { makeBackButton } from "../ui/back.js";
import { drawWallet } from "../ui/currency.js";
import { InventoryScene } from "./inventory.js";
import { buildHero } from "../game/runtime.js";
import { STAT_LIST } from "../game/stats/enum.js";
import { STAT_DEFS } from "../game/stats/defs.js";

export class CharacterScene extends Scene {
  constructor({ id }) {
    super();
    this.id = id;
  }

  enter() {
    const hero = buildHero(this.id);

    this.elements = [
      makeBackButton(),
      new Text({
        x: L.x(0.5),
        y: L.y(0.1),
        text: hero.name,
        size: 0.06,
        align: "center",
      }),
      new Text({
        x: L.x(0.5),
        y: L.y(0.16),
        text: hero.description ?? "",
        size: 0.028,
        align: "center",
      }),
    ];

    const barX = L.x(0.28);
    const barW = L.x(0.4);
    const barH = L.s(0.03);
    const iconSize = L.s(0.05);
    const gap = L.s(0.015);
    let y = L.y(0.26);

    for (const key of STAT_LIST) {
      const def = STAT_DEFS[key];
      this.elements.push(
        new StatBar({
          x: barX,
          y,
          w: barW,
          h: barH,
          icon: def.icon,
          iconSize,
          value: hero.stats[key] ?? 0,
          max: 10,
        }),
      );
      y += barH + gap;
    }

    const bw = L.s(0.3),
      bh = L.s(0.08);
    this.elements.push(
      new Button({
        x: L.x(0.5) - bw / 2,
        y: L.y(0.88),
        w: bw,
        h: bh,
        label: "Инвентарь",
        onClick: () => push(new InventoryScene({ characterId: this.id })),
      }),
    );
  }

  render(ctx) {
    drawWallet(ctx);
    super.render(ctx);
  }
}
