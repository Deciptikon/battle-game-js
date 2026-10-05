import { Scene } from "../scene.js";
import { reset } from "../game.js";
import { L } from "../layout.js";
import { Button } from "../ui/button.js";
import { Text } from "../ui/text.js";
import { drawWallet } from "../ui/currency.js";
import { WorldMapScene } from "./worldmap.js";
import { MenuScene } from "./menu.js";
import { MapScene } from "./map.js";

export class ResultScene extends Scene {
  constructor({ id, level, stats }) {
    super();
    this.id = id;
    this.level = level;
    this.stats = stats;
  }

  enter() {
    const s = this.stats;

    this.elements = [
      new Text({
        x: L.x(0.5),
        y: L.y(0.15),
        text: s.won ? "Победа" : "Поражение",
        size: 0.09,
        color: s.won ? theme.good : theme.bad,
        align: "center",
      }),
      new Text({
        x: L.x(0.5),
        y: L.y(0.22),
        text: `${this.id} · сложность ${this.level}`,
        style: "body",
      }),
    ];

    const lines = [
      `Время:        ${s.time}s`,
      `Ходов:        ${s.moves}`,
      `Хищников:     ${s.predatorsMet} / убито ${s.predatorsKilled}`,
      `Найдено:      ${s.itemsFound}`,
      `HP / Мораль:  ${s.hp} / ${s.morale}`,
    ];
    let y = L.y(0.34);
    for (const line of lines) {
      this.elements.push(
        new Text({
          x: L.x(0.5),
          y,
          text: line,
          style: "muted",
          align: "center",
        }),
      );
      y += L.s(0.045);
    }

    this.elements.push(
      new Text({
        x: L.x(0.5),
        y: y + L.s(0.02),
        text: `Опыт:   +${s.xp}`,
        size: 0.03,
        color: theme.gold,
        align: "center",
      }),
    );
    this.elements.push(
      new Text({
        x: L.x(0.5),
        y: y + L.s(0.065),
        text: `Золото: +${s.coins}`,
        size: 0.03,
        color: theme.gold,
        align: "center",
      }),
    );

    const w = L.s(0.5),
      h = L.s(0.08),
      gap = L.s(0.02);
    const x = L.x(0.5) - w / 2;
    let by = L.y(0.7);
    const items = [
      {
        label: "Ещё раз",
        onClick: () => reset(new MapScene({ id: this.id, level: this.level })),
      },
      { label: "В мир", onClick: () => reset(new WorldMapScene()) },
      { label: "В меню", onClick: () => reset(new MenuScene()) },
    ];
    for (const { label, onClick } of items) {
      this.elements.push(new Button({ x, y: by, w, h, label, onClick }));
      by += h + gap;
    }
  }

  render(ctx) {
    drawWallet(ctx);
    super.render(ctx);
  }
}
