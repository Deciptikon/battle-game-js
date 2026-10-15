export const SIZE = Object.freeze({
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
});

export const LIFESTYLE = Object.freeze({
  GROUND: "ground",
  WATER: "water",
  AIR: "air",
  SOIL: "soil",
});

export const ROLE = Object.freeze({
  PET: "pet",
  PREDATOR: "predator",
});

export const SIZE_LIST = Object.values(SIZE);
export const LIFESTYLE_LIST = Object.values(LIFESTYLE);
export const ROLE_LIST = Object.values(ROLE);

export const ALL_TAGS = [...SIZE_LIST, ...LIFESTYLE_LIST, ...ROLE_LIST];

export function canHunt(predator, target) {
  const h = predator.hunts;
  if (!h) return false;

  for (const values of Object.values(h)) {
    const match = values.some((v) => target.tags.includes(v));
    if (!match) return false;
  }
  return true;
}
