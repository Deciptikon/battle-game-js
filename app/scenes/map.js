import { Scene } from "../scene.js";
import { reset } from "../game.js";
import { L } from "../layout.js";
import { Button } from "../ui/button.js";
import { Text } from "../ui/text.js";
import { ResultScene } from "./result.js";

export class MapScene extends Scene {
  constructor({ id, level }) {
    super();
    this.id = id;
    this.level = level;
  }

  enter() {
    const w = L.s(0.15),
      h = L.s(0.06);
    this.elements = [
      new Text({
        x: L.x(0.03),
        y: L.y(0.05),
        text: `${this.id} · lvl ${this.level}`,
        style: "body",
      }),
      new Text({
        x: L.x(0.5),
        y: L.y(0.5),
        text: "(здесь будет тайловая карта)",
        style: "faint",
      }),
      new Button({
        x: L.x(0.8),
        y: L.y(0.03),
        w,
        h,
        label: "Конец",
        onClick: () =>
          reset(
            new ResultScene({
              id: this.id,
              level: this.level,
              stats: {
                won: true,
                time: 42,
                moves: 87,
                predatorsMet: 2,
                predatorsKilled: 1,
                itemsFound: 3,
                hp: 5,
                morale: 6,
                xp: 40,
                coins: 15,
              },
            }),
          ),
      }),
    ];
  }
}
