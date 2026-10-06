import { L } from "./layout.js";
import { theme } from "./theme.js";

let canvas, ctx;
let current = null;
let last = 0;
const stack = [];

export function init(root) {
  canvas = document.createElement("canvas");
  root.append(canvas);
  L.init(canvas);
  ctx = L.ctx;

  canvas.addEventListener("pointerdown", (e) => {
    const r = canvas.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * L.w;
    const y = ((e.clientY - r.top) / r.height) * L.h;
    current?.onPointerDown(x, y);
  });

  canvas.addEventListener("pointerup", (e) => {
    const r = canvas.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * L.w;
    const y = ((e.clientY - r.top) / r.height) * L.h;
    current?.onPointerUp(x, y);
  });

  window.addEventListener("keydown", (e) => current?.onKeyDown(e.key));

  canvas.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * L.w;
    const y = ((e.clientY - r.top) / r.height) * L.h;
    current?.onPointerMove(x, y);
  });

  canvas.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      current?.onWheel?.(e);
    },
    { passive: false },
  );
}

export function go(scene) {
  current?.exit();
  current = scene;
  current.enter();
}

export function push(scene) {
  if (current) stack.push(current);
  go(scene);
}

export function back() {
  const prev = stack.pop();
  if (prev) go(prev);
}

export function start() {
  last = performance.now();
  requestAnimationFrame(loop);
}

export function reset(scene) {
  stack.length = 0;
  go(scene);
}

function loop(now) {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  current?.update(dt);
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, L.w, L.h);
  current?.render(ctx);
  requestAnimationFrame(loop);
}
