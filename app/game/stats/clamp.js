import { STAT_MIN, STAT_MAX } from "./enum.js";

export function clampStat(key, value, limits = null) {
  const min = limits?.min?.[key] ?? STAT_MIN[key] ?? 0;
  const max = limits?.max?.[key] ?? STAT_MAX[key] ?? 10;

  if (value == null || Number.isNaN(value)) return min;

  return Math.max(min, Math.min(max, value));
}
