import { Scene } from "../scene.js";
import { L } from "../layout.js";
import { theme } from "../theme.js";
import { Button } from "../ui/button.js";
import { reset } from "../game.js";
import { Board } from "../game/board/board.js";
import { viewGrid, viewSize } from "../game/locations/view.js";
import { get as getLocation } from "../game/locations/registry.js";
import { ResultScene } from "./result.js";

export class MapScene extends Scene {
  constructor({ id, level }) {
    super();
    this.id = id;
    this.level = level;
  }

  enter() {
    const loc = getLocation(this.id);
    this.grid = viewGrid(loc.grid, this.level);
    this.size = viewSize(this.level);
    this.style = loc.style ?? "pixel";

    const maxBoard = Math.min(L.w, L.h) * 0.85;
    this.tileSize = maxBoard / this.size;
    const boardW = this.tileSize * this.size;
    this.originX = (L.w - boardW) / 2;
    this.originY = (L.h - boardW) / 2;

    this.board = new Board({
      grid: this.grid,
      tileSize: this.tileSize,
      originX: this.originX,
      originY: this.originY,
      style: this.style,
    });

    this.heroX = Math.floor(this.size / 2);
    this.heroY = Math.floor(this.size / 2);

    const w = L.s(0.15),
      h = L.s(0.06);
    this.elements = [
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

  render(ctx) {
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, L.w, L.h);

    this.board.draw(ctx);

    const hx = this.originX + (this.heroX + 0.5) * this.tileSize;
    const hy = this.originY + (this.heroY + 0.5) * this.tileSize;
    ctx.fillStyle = theme.gold;
    ctx.beginPath();
    ctx.arc(hx, hy, this.tileSize * 0.35, 0, Math.PI * 2);
    ctx.fill();

    super.render(ctx);
  }
}
