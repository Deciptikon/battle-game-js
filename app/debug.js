import { L } from "./layout.js";
import { state } from "./game/state.js";

const lines = [];
const live = {}; // живой контекст: сцены могут положить сюда ссылки
let visible = false;

export function log(...args) {
  const line = args
    .map((a) => {
      if (typeof a === "object") {
        try {
          return JSON.stringify(a);
        } catch {
          return String(a);
        }
      }
      return String(a);
    })
    .join(" ");
  lines.push(line);
  if (lines.length > 20) lines.shift();
}

export function clearLog() {
  lines.length = 0;
}

export function setLive(key, value) {
  live[key] = value;
}
export function clearLive(key) {
  delete live[key];
}

export function toggle() {
  visible = !visible;
  if (visible) refresh();
}

function refresh() {
  clearLog();

  log("--- state ---");
  log("activeHero:", state.activeHero);
  log("wallet:", state.wallet);

  const hero = live.hero;
  if (hero) {
    log("--- hero ---");
    log("id:", hero.id);
    log("level:", state.heroes[hero.id]?.level);
    log("hp:", hero.hp);
    log("x, y:", hero.x, hero.y);
    log(
      "skills:",
      (hero.heroSkills || []).map((s) =>
        s ? { id: s.id, unlocked: s.unlocked } : null,
      ),
    );
  }

  if (live.actors) {
    log("--- actors ---");
    for (const a of live.actors) {
      log(a.id ?? a.constructor.name, a.x, a.y, "dead=" + a.dead);
    }
  }
}

export function drawLog(ctx) {
  if (!visible || !lines.length) return;

  const lineH = L.s(0.026);
  const pad = L.s(0.01);
  const h = lines.length * lineH + pad * 2;

  ctx.font = `${L.s(0.02)}px monospace`;
  ctx.fillStyle = "rgba(0,0,0,0.75)";
  ctx.fillRect(0, 0, L.w, h);

  ctx.fillStyle = "#0f0";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], pad, pad + i * lineH);
  }

  ctx.textBaseline = "alphabetic";
}

// подписка на клавишу
if (typeof window !== "undefined") {
  window.addEventListener("keydown", (e) => {
    if (e.key === "ё" || e.key === "`") toggle();
    if (e.key === "Escape" && visible) visible = false;
    if ((e.key === "c" || e.key === "C") && visible) clearLog();
  });
}
