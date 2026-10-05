export const state = {
  wallet: { coins: 0, crystals: 0 },
  activeHero: "cat",
  heroes: {},
  instances: {},
  items: {},
  maps: {},
  achievements: {},
};

let nextInstanceId = 1;
export function makeInstanceId() {
  return "i" + nextInstanceId++;
}

export function resetState() {
  state.wallet = { coins: 0, crystals: 0 };
  state.activeHero = "cat";
  state.heroes = {};
  state.instances = {};
  state.items = {};
  state.maps = {};
  state.achievements = {};
  nextInstanceId = 1;
}

// --- сериализация ---

const SAVE_KEY = "xpets.save.v1";

export function serialize() {
  return {
    version: 1,
    updatedAt: Date.now(),
    wallet: state.wallet,
    activeHero: state.activeHero,
    heroes: state.heroes,
    instances: state.instances,
    items: state.items,
    nextInstanceId,
    maps: state.maps,
    achievements: state.achievements,
  };
}

export function apply(data) {
  state.wallet = data.wallet ?? { coins: 0, crystals: 0 };
  state.activeHero = data.activeHero ?? "cat";
  state.heroes = data.heroes ?? {};
  state.instances = data.instances ?? {};
  state.items = data.items ?? {};
  state.maps = data.maps ?? {};
  state.achievements = data.achievements ?? {};
  nextInstanceId = data.nextInstanceId ?? 1;
}

// --- сохранение/загрузка ---

export function saveLocal() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(serialize()));
  } catch (e) {
    console.warn("save failed", e);
  }
}

export function loadLocal() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    apply(JSON.parse(raw));
    return true;
  } catch (e) {
    console.warn("load failed", e);
    return false;
  }
}
