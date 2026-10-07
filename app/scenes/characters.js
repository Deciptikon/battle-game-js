import { Scene } from "../scene.js";
import { push } from "../game.js";
import { L } from "../layout.js";
import { Button } from "../ui/button.js";
import { Text } from "../ui/text.js";
import { HeroCard } from "../ui/heroCard.js";
import { makeBackButton } from "../ui/back.js";
import { drawWallet } from "../ui/currency.js";
import { CharacterScene } from "./character.js";
import { all as allHeroes } from "../game/heroes/registry.js";

const COLS = 3,
  ROWS = 2,
  PER_PAGE = COLS * ROWS;

export class CharactersScene extends Scene {
  constructor() {
    super();
    this.page = 0;
  }

  pageCount() {
    const heroes = allHeroes();
    return Math.max(1, Math.ceil(heroes.length / PER_PAGE));
  }

  enter() {
    this.elements = [makeBackButton()];
    this.rebuild();
  }

  rebuild() {
    this.elements = this.elements.filter((el, i) => i === 0);

    const heroes = allHeroes();

    const gap = L.s(0.03);
    const cellW = L.s(0.22),
      cellH = L.s(0.22);
    const gridW = COLS * cellW + (COLS - 1) * gap;
    const gridH = ROWS * cellH + (ROWS - 1) * gap;
    const ox = L.x(0.5) - gridW / 2;
    const oy = L.y(0.5) - gridH / 2;

    const start = this.page * PER_PAGE;
    for (let i = 0; i < PER_PAGE; i++) {
      const hero = heroes[start + i];
      if (!hero) continue;
      const col = i % COLS,
        row = Math.floor(i / COLS);
      const x = ox + col * (cellW + gap);
      const y = oy + row * (cellH + gap);
      this.elements.push(
        new HeroCard({
          x,
          y,
          w: cellW,
          h: cellH,
          heroId: hero.id,
          heroName: hero.name,
          onClick: () => push(new CharacterScene({ id: hero.id })),
        }),
      );
    }

    const navW = L.s(0.08),
      navH = L.s(0.08),
      navY = L.y(0.9);
    this.elements.push(
      new Button({
        x: L.x(0.4) - navW,
        y: navY,
        w: navW,
        h: navH,
        label: "←",
        disabled: this.page === 0,
        onClick: () => {
          this.page--;
          this.rebuild();
        },
      }),
    );
    this.elements.push(
      new Button({
        x: L.x(0.6),
        y: navY,
        w: navW,
        h: navH,
        label: "→",
        disabled: this.page >= this.pageCount() - 1,
        onClick: () => {
          this.page++;
          this.rebuild();
        },
      }),
    );

    this.elements.push(
      new Text({
        x: L.x(0.5),
        y: L.y(0.12),
        text: "Персонажи",
        size: 0.06,
        align: "center",
      }),
    );
    this.elements.push(
      new Text({
        x: L.x(0.5),
        y: L.y(0.9) + L.s(0.05),
        text: `${this.page + 1} / ${this.pageCount()}`,
        size: 0.03,
        align: "center",
      }),
    );
  }

  render(ctx) {
    drawWallet(ctx);
    super.render(ctx);
  }
}
