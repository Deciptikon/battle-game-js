import { Scene } from "../scene.js";
import { push } from "../game.js";
import { L } from "../layout.js";
import { Button } from "../ui/base/button.js";
import { Text } from "../ui/base/text.js";
import { StatBar } from "../ui/bars/statbar.js";
import { makeBackButton } from "../ui/hud/back.js";
import { drawWallet } from "../ui/hud/currency.js";
import { InventoryScene } from "./inventory.js";
import { buildHero } from "../game/runtime.js";
import { STAT_LIST } from "../game/stats/enum.js";
import { STAT_DEFS } from "../game/stats/defs.js";
import { get, has } from "../assets/cache.js";
import { state, saveLocal } from "../game/state.js";

const MARGIN = 0.05; // отступ от краёв экрана
const COL_W = 0.25; // ширина колонки статов
const COL_ROWS = 4; // статов в колонке

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
        y: L.y(0.42),
        text: hero.name,
        size: 0.06,
        align: "center",
      }),
      new Text({
        x: L.x(0.5),
        y: L.y(0.47),
        text: hero.description ?? "",
        size: 0.028,
        align: "center",
      }),
    ];

    const leftX = L.x(MARGIN);
    const rightX = L.x(1 - MARGIN - COL_W);
    const barW = L.x(COL_W);
    const barH = L.s(0.03);
    const iconSize = L.s(0.05);
    const gap = L.s(0.02);
    const startY = L.y(0.2);

    STAT_LIST.forEach((key, i) => {
      const def = STAT_DEFS[key];
      const col = i < COL_ROWS ? 0 : 1;
      const row = i % COL_ROWS;
      const x = col === 0 ? leftX : rightX;
      const y = startY + row * (barH + gap);

      this.elements.push(
        new StatBar({
          x,
          y,
          w: barW,
          h: barH,
          icon: def.icon,
          iconSize,
          value: hero.stats[key] ?? 0,
          max: 10,
        }),
      );
    });

    const bw = L.s(0.3),
      bh = L.s(0.08);
    this.elements.push(
      new Button({
        x: L.x(0.5) - bw / 2,
        y: L.y(0.82),
        w: bw,
        h: bh,
        label: "Инвентарь",
        onClick: () => push(new InventoryScene({ characterId: this.id })),
      }),
    );
    if (state.activeHero !== this.id) {
      this.elements.push(
        new Button({
          x: L.x(0.75) - bw / 2,
          y: L.y(0.82),
          w: bw,
          h: bh,
          label: "Выбрать",
          onClick: () => {
            state.activeHero = this.id;
            saveLocal();
            this.enter(); // пересобрать сцену — кнопка исчезнет
          },
        }),
      );
    }
  }

  render(ctx) {
    drawWallet(ctx);

    const key = this.id + ".portrait";
    if (has(key)) {
      const img = get(key);
      const s = L.s(0.28);
      ctx.drawImage(img, L.x(0.5) - s / 2, L.y(0.1), s, s);
    }

    super.render(ctx);
  }
}
