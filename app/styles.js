import { theme } from "./theme.js";

export const FONT = {
  tiny: 0.02,
  small: 0.025,
  base: 0.03,
  medium: 0.035,
  large: 0.04,
  big: 0.06,
  title: 0.12,
};

export const STYLE = {
  title: { font: FONT.big, color: "text", align: "center" },
  subtitle: { font: FONT.large, color: "textDim", align: "center" },
  body: { font: FONT.base, color: "text" },
  muted: { font: FONT.base, color: "textMuted" },
  faint: { font: FONT.small, color: "textFaint", align: "center" },
  dim: { font: FONT.base, color: "textDim", align: "center" },

  button: { font: FONT.medium, color: "buttonText" },
  buttonSm: { font: FONT.base, color: "buttonText" },
  nav: { font: FONT.large, color: "buttonText" },
};

export function resolveStyle(style) {
  const s = typeof style === "string" ? STYLE[style] : style;
  if (!s) return {};
  return {
    font: s.font,
    color: s.color ? theme[s.color] : null,
    align: s.align,
  };
}
