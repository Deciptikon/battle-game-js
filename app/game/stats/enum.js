export const STAT = Object.freeze({
  HP: "hp",
  ARMOR: "armor",
  STEALTH: "stealth",
  SPEED: "speed",
  CAUTION: "caution",
  EVASION: "evasion",
  MORALE: "morale",
  PERCEPTION: "perception",
});

export const STAT_LIST = Object.values(STAT);

export const STAT_MAX = {
  [STAT.HP]: 10,
  [STAT.ARMOR]: 10,
  [STAT.STEALTH]: 10,
  [STAT.SPEED]: 10,
  [STAT.CAUTION]: 10,
  [STAT.EVASION]: 10,
  [STAT.MORALE]: 10,
  [STAT.PERCEPTION]: 10,
};

export const STAT_MIN = {
  [STAT.HP]: 1,
  [STAT.ARMOR]: 0,
  [STAT.STEALTH]: 0,
  [STAT.SPEED]: 1,
  [STAT.CAUTION]: 0,
  [STAT.EVASION]: 0,
  [STAT.MORALE]: 1,
  [STAT.PERCEPTION]: 0,
};
