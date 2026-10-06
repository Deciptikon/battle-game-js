export class WorldMap {
  constructor({ image = null, worldW = 1000, worldH = 700, locations = [] }) {
    this.image = image;
    this.worldW = worldW;
    this.worldH = worldH;
    this.locations = locations;

    this.viewport = { w: 0, h: 0 };
    this.zoom = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.minZoom = 0.2;
    this.maxZoom = 3;
  }

  setViewport(w, h) {
    this.viewport.w = w;
    this.viewport.h = h;
    this.fit();
  }

  fit() {
    const zx = this.viewport.w / this.worldW;
    const zy = this.viewport.h / this.worldH;
    this.zoom = Math.min(zx, zy) * 0.9;
    this.minZoom = this.zoom;
    this.maxZoom = Math.max(this.zoom * 4, 1);
    this.center();
  }

  center() {
    const w = this.worldW * this.zoom;
    const h = this.worldH * this.zoom;
    this.offsetX = (this.viewport.w - w) / 2;
    this.offsetY = (this.viewport.h - h) / 2;
  }

  // world (0..1) → screen
  toScreen(nx, ny) {
    return {
      x: this.offsetX + nx * this.worldW * this.zoom,
      y: this.offsetY + ny * this.worldH * this.zoom,
    };
  }

  // screen → world (0..1)
  toWorld(sx, sy) {
    return {
      x: (sx - this.offsetX) / (this.worldW * this.zoom),
      y: (sy - this.offsetY) / (this.worldH * this.zoom),
    };
  }

  pan(dx, dy) {
    this.offsetX += dx;
    this.offsetY += dy;
    this.clamp();
  }

  zoomAt(sx, sy, factor) {
    const before = this.toWorld(sx, sy);
    this.zoom = Math.max(
      this.minZoom,
      Math.min(this.maxZoom, this.zoom * factor),
    );
    const after = this.toWorld(sx, sy);

    this.offsetX += (after.x - before.x) * this.worldW * this.zoom;
    this.offsetY += (after.y - before.y) * this.worldH * this.zoom;
    this.clamp();
  }

  clamp() {
    const w = this.worldW * this.zoom;
    const h = this.worldH * this.zoom;

    if (w <= this.viewport.w) {
      this.offsetX = (this.viewport.w - w) / 2;
    } else {
      this.offsetX = Math.min(0, Math.max(this.viewport.w - w, this.offsetX));
    }

    if (h <= this.viewport.h) {
      this.offsetY = (this.viewport.h - h) / 2;
    } else {
      this.offsetY = Math.min(0, Math.max(this.viewport.h - h, this.offsetY));
    }
  }

  locationAt(sx, sy) {
    const base = Math.min(this.viewport.w, this.viewport.h);
    const r = base * 0.05;
    const r2 = r * r;

    for (const loc of this.locations) {
      const p = this.toScreen(loc.position.x, loc.position.y);
      const dx = sx - p.x;
      const dy = sy - p.y;
      if (dx * dx + dy * dy <= r2) return loc;
    }
    return null;
  }

  draw(ctx, drawLocation) {
    if (this.image) {
      ctx.drawImage(
        this.image,
        this.offsetX,
        this.offsetY,
        this.worldW * this.zoom,
        this.worldH * this.zoom,
      );
    }

    for (const loc of this.locations) {
      const p = this.toScreen(loc.position.x, loc.position.y);
      drawLocation(ctx, loc, p, this.zoom);
    }
  }
}
