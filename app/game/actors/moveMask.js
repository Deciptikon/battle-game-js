export class MoveMask {
  constructor(size = 3) {
    this.size = size;
    this.half = Math.floor(size / 2);
    this.reset();
  }

  reset() {
    this.weights = [];
    this.tiles = [];
    this.normalized = [];
    for (let y = 0; y < this.size; y++) {
      const w = [],
        t = [],
        n = [];
      for (let x = 0; x < this.size; x++) {
        w.push(0);
        t.push(null);
        n.push(0);
      }
      this.weights.push(w);
      this.tiles.push(t);
      this.normalized.push(n);
    }
    this.sum = 0;
  }

  get(mx, my) {
    return this.weights[my]?.[mx] ?? 0;
  }

  set(mx, my, v) {
    if (this.weights[my]) this.weights[my][mx] = v;
  }

  tileAt(mx, my) {
    return this.tiles[my]?.[mx] ?? null;
  }

  worldOf(actor, mx, my) {
    return {
      x: actor.x + (mx - this.half),
      y: actor.y + (my - this.half),
    };
  }

  maskOf(actor, wx, wy) {
    return {
      mx: wx - actor.x + this.half,
      my: wy - actor.y + this.half,
    };
  }

  inBounds(mx, my) {
    return mx >= 0 && mx < this.size && my >= 0 && my < this.size;
  }

  compute(actor, ctx) {
    this.reset();
    const mapSize = ctx.map.size;
    const grid = ctx.map.grid;

    for (let my = 0; my < this.size; my++) {
      for (let mx = 0; mx < this.size; mx++) {
        const { x: wx, y: wy } = this.worldOf(actor, mx, my);

        if (wx < 0 || wx >= mapSize || wy < 0 || wy >= mapSize) continue;

        const tileId = grid[wy][wx];
        this.tiles[my][mx] = tileId;

        if (wx === actor.x && wy === actor.y) continue;

        const w = actor.weightOf(tileId, wx, wy, ctx) ?? 0;
        this.weights[my][mx] = w > 0 ? w : 0;
      }
    }
  }

  recomputeSum() {
    this.sum = 0;
    for (let my = 0; my < this.size; my++) {
      for (let mx = 0; mx < this.size; mx++) {
        this.sum += this.weights[my][mx];
      }
    }
  }

  normalize() {
    for (let my = 0; my < this.size; my++) {
      for (let mx = 0; mx < this.size; mx++) {
        this.normalized[my][mx] =
          this.sum > 0 ? this.weights[my][mx] / this.sum : 0;
      }
    }
  }

  pick(rng) {
    if (this.sum <= 0) return null;

    let r = rng() * this.sum;
    for (let my = 0; my < this.size; my++) {
      for (let mx = 0; mx < this.size; mx++) {
        r -= this.weights[my][mx];
        if (r <= 0) {
          return { dx: mx - this.half, dy: my - this.half };
        }
      }
    }

    for (let my = this.size - 1; my >= 0; my--) {
      for (let mx = this.size - 1; mx >= 0; mx--) {
        if (this.weights[my][mx] > 0) {
          return { dx: mx - this.half, dy: my - this.half };
        }
      }
    }
    return null;
  }
}
