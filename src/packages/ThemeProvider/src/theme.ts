export const ALL_THEMES = ["light", "dark"] as const;

export type Theme = (typeof ALL_THEMES)[number];
