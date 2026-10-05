export const THEMES = {
  default: {
    bg: "#111",
    splashBg: "#0a0a0a",

    text: "#fff",
    textMuted: "#aaa",
    textDim: "#888",
    textFaint: "#666",
    textFaintest: "#444",
    textDisabled: "#555",

    button: "#333",
    buttonBorder: "#777",
    buttonText: "#fff",
    buttonDisabled: "#1a1a1a",
    buttonDisabledBorder: "#333",
    buttonDisabledText: "#555",

    panel: "#222",
    panelBorder: "#444",
    panelText: "#fff",

    progressBar: "#4a7",
    progressBg: "#222",
    progressBorder: "#555",

    gold: "#fc3",
    crystal: "#7cf",

    good: "#7fc",
    bad: "#f77",
    accent: "#4a7",

    levelSelected: "#4a7",
    levelSelectedBorder: "#7fc",
    levelUnselected: "#222",
    levelUnselectedBorder: "#444",
  },
};

export let theme = THEMES.default;

export function setTheme(name) {
  if (!THEMES[name]) throw new Error(`Unknown theme: ${name}`);
  theme = THEMES[name];
}
