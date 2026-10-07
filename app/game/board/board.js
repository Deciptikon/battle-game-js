import { get, has } from "../../assets/cache.js";
import * as tiles from "../tiles/registry.js";

export class Board {
  constructor({ grid, tileSize, originX, originY, style }) {
    this.grid = grid;
    this.size = grid.length;
    this.tileSize = tileSize;
    this.originX = originX;
    this.originY = originY;
    this.style = style;
  }

  draw(ctx) {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const tileId = this.grid[y][x];
        const dx = this.originX + x * this.tileSize;
        const dy = this.originY + y * this.tileSize;

        const key = `${this.style}.${tileId}`;
        if (has(key)) {
          ctx.drawImage(get(key), dx, dy, this.tileSize, this.tileSize);
        } else {
          // если спрайта нет — серый прямоугольник, чтобы сетку было видно
          ctx.fillStyle = "#333";
          ctx.fillRect(dx, dy, this.tileSize, this.tileSize);
        }
      }
    }
  }
}
