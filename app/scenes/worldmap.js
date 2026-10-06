import { Scene } from "../scene.js";
import { push } from "../game.js";
import { L } from "../layout.js";
import { Text } from "../ui/text.js";
import { makeBackButton } from "../ui/back.js";
import { drawWallet } from "../ui/currency.js";
import { WorldMap } from "../game/worldmap/worldmap.js";
import { LocationIcon } from "../game/worldmap/locationIcon.js";
import { MapInfoScene } from "./mapinfo.js";
import { all as allLocations } from "../game/locations/registry.js";
import { state } from "../game/state.js";

const DRAG_THRESHOLD = 6;

export class WorldMapScene extends Scene {
  enter() {
    this.map = new WorldMap({
      image: null,
      worldW: 1000,
      worldH: 700,
      locations: allLocations(),
    });
    this.map.setViewport(L.w, L.h);

    this.elements = [
      makeBackButton(),
      new Text({
        x: L.x(0.5),
        y: L.y(0.12),
        text: "Карта мира",
        style: "title",
      }),
    ];

    this.dragging = false;
    this.lastX = 0;
    this.lastY = 0;
    this.moved = 0;
  }

  onPointerDown(x, y) {
    this.dragging = true;
    this.lastX = x;
    this.lastY = y;
    this.moved = 0;
  }

  onPointerMove(x, y) {
    if (!this.dragging) return;
    const dx = x - this.lastX;
    const dy = y - this.lastY;
    this.moved += Math.hypot(dx, dy);
    this.map.pan(dx, dy);
    this.lastX = x;
    this.lastY = y;
  }

  onPointerUp(x, y) {
    const wasDragging = this.dragging;
    this.dragging = false;

    if (wasDragging && this.moved < DRAG_THRESHOLD) {
      const loc = this.map.locationAt(x, y);
      if (loc) {
        push(new MapInfoScene({ id: loc.id }));
        return;
      }
    }

    super.onPointerUp(x, y);
  }

  onWheel(e) {
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    this.map.zoomAt(e.offsetX, e.offsetY, factor);
  }

  render(ctx) {
    const radius = Math.min(L.w, L.h) * 0.05;

    this.map.draw(ctx, (ctx, loc, p) => {
      const prog = state.maps[loc.id] ?? { unlocked: false, maxLevel: -1 };
      const icon = new LocationIcon({ loc, prog, radius });
      icon.draw(ctx, p);
    });

    drawWallet(ctx);
    super.render(ctx);
  }
}
