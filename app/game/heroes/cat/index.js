import { STAT } from "../../stats/enum.js";
import { TILE } from "../../tiles/enum.js";

export default {
  id: "cat",
  name: "Кот",
  description: "Усреднённый. Удобен для начала.",
  startUnlocked: true,

  assets: {
    icon: new URL("./icon.png", import.meta.url).href,
    portrait: new URL("./portrait.png", import.meta.url).href,
    sprite: new URL("./sprite.png", import.meta.url).href,
    skill_pounce: new URL("./skills/pounce.png", import.meta.url).href,
    skill_regen: new URL("./skills/regen.png", import.meta.url).href,
    skill_nine_lives: new URL("./skills/nine_lives.png", import.meta.url).href,
    skill_instinct_on: new URL("./skills/instinct_on.png", import.meta.url)
      .href,
    skill_instinct_off: new URL("./skills/instinct_off.png", import.meta.url)
      .href,
  },

  baseStats: {
    [STAT.HP]: 1,
    [STAT.ARMOR]: 4,
    [STAT.STEALTH]: 5,
    [STAT.SPEED]: 5,
    [STAT.CAUTION]: 5,
    [STAT.EVASION]: 5,
    [STAT.MORALE]: 5,
    [STAT.PERCEPTION]: 5,
  },

  prefs: {
    [TILE.PLAIN]: 100,
    [TILE.FOREST]: 100,
    [TILE.CITY]: 60,
    [TILE.MOUNTAIN]: 40,
    [TILE.TUNDRA]: 40,
    [TILE.SNOW]: 30,
    [TILE.SWAMP]: 20,
    [TILE.BADLANDS]: 15,
    [TILE.ICE]: 10,
    [TILE.DESERT]: 5,
    [TILE.SEA]: 100,
    [TILE.LAVA]: 0,
  },

  onState(actor, mask, ctx) {
    const half = mask.half;
    const tile = mask.tileAt(half, half);
    if (!tile) return;

    if (tile === TILE.LAVA) {
      actor.kill(ctx);
      return;
    }

    if (tile === TILE.SEA) {
      const wasInWater = actor._lastTile === TILE.SEA;
      actor._lastTile = TILE.SEA;

      if (wasInWater) {
        actor.kill(ctx);
        return;
      }

      actor.applyDamage(1);
      ctx.map?.popup(actor, { text: "-1", kind: "damage" });
      actor.checkDeath(ctx);
      return;
    }

    actor._lastTile = tile;
  },

  skills: [
    {
      id: "pounce",
      type: "active",
      name: "Прыжок",
      description: "Совершает рывок вперёд, перескакивая одну клетку.",
      icon: "cat.skill_pounce",
      cd: 0,
      skillUnlock(actor) {
        return actor.state.level >= 5;
      },
      skillUse(actor, ctx) {
        this.cd = 6;
        console.log("Кот прыгает!");
      },
      skillOnStep() {
        if (this.cd > 0) this.cd--;
      },
      skillGetState() {
        return this.cd > 0
          ? { kind: "cooldown", value: this.cd, max: 6 }
          : { kind: "none" };
      },
    },
    {
      id: "regen",
      type: "passive",
      name: "Регенерация",
      description: "Раз в 99 ходов восстанавливает 1 единицу здоровья.",
      icon: "cat.skill_regen",
      _acc: 0,
      lastAt: 0,
      skillUnlock(actor) {
        return actor.state.level >= 10;
      },
      skillOnStep(actor, mask, ctx) {
        this._acc++;
        if (this._acc >= 99) {
          this._acc = 0;
          this.lastAt = performance.now();
          actor.heal(1, ctx);
        }
      },
      skillGetState() {
        return performance.now() - this.lastAt < 500
          ? { kind: "flash" }
          : { kind: "none" };
      },
    },
    {
      id: "nine_lives",
      type: "passive",
      name: "Девять жизней",
      description:
        "Накопив 9 зарядов, уклоняется от следующей атаки, потратив их.",
      icon: "cat.skill_nine_lives",
      charges: 0,
      max: 9,
      skillUnlock(actor) {
        return actor.state.level >= 15;
      },
      skillOnStep() {
        if (this.charges < this.max) this.charges++;
      },
      skillGetState() {
        return this.charges >= this.max
          ? { kind: "flash" }
          : { kind: "charges", value: this.charges, max: this.max };
      },
    },
    {
      id: "instinct",
      type: "toggle",
      name: "Инстинкт охоты",
      description:
        "Кот стремится к хищникам: клетки в сторону врага получают +15% веса, в сторону от него — −15%.",
      icon: "cat.skill_instinct_on",
      iconOff: "cat.skill_instinct_off",
      on: false,
      skillUnlock(actor) {
        return actor.state.level >= 20;
      },
      skillUse(actor, ctx) {
        this.on = !this.on;
      },
      skillGetState() {
        return { kind: "toggle", on: this.on };
      },
      skillModifyWeights(actor, mask, ctx) {
        if (!this.on) return;
        // модификация весов — обсудим отдельно
      },
    },
  ],
};
