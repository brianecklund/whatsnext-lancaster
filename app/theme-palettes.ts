export const DEFAULT_THEME = "paper-ink";

export const THEME_PALETTES = [
  { key: "paper-ink", name: "Paper Ink" },
  { key: "night-shift", name: "Night Shift" },
  { key: "moss-stone", name: "Moss Stone" },
  { key: "ocean-blueprint", name: "Ocean Blueprint" },
  { key: "rose-room", name: "Rose Room" },
  { key: "ember-signal", name: "Ember Signal" },
] as const;

export type ThemeKey = (typeof THEME_PALETTES)[number]["key"];

/** Preview swatches for settings UI (matches `html[data-theme]` tokens in globals.css). */
export const THEME_PREVIEW_COLORS: Record<
  ThemeKey,
  { bg: string; text: string; accent: string }
> = {
  "paper-ink": { bg: "#ffffff", text: "#0a0a0a", accent: "#111111" },
  "night-shift": { bg: "#0e1116", text: "#e6edf3", accent: "#7aa2ff" },
  "moss-stone": { bg: "#f4f6f2", text: "#1f2a1f", accent: "#5f7a60" },
  "ocean-blueprint": { bg: "#f0f5ff", text: "#0d1b2a", accent: "#3b6cff" },
  "rose-room": { bg: "#fff4f6", text: "#2a0f16", accent: "#d14b6c" },
  "ember-signal": { bg: "#fff6f2", text: "#2b140a", accent: "#ff6a3d" },
};
