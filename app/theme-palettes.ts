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
