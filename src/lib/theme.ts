export const ACCENT_THEMES = {
  teal: { accent: "#2dd4bf", ink: "#04201c" },
  green: { accent: "#7ad97a", ink: "#0b1a0b" },
  blue: { accent: "#5ab0ff", ink: "#06182b" },
  pink: { accent: "#ff6fae", ink: "#2b0716" },
  amber: { accent: "#ffb000", ink: "#14110a" },
} as const;

export type AccentTheme = keyof typeof ACCENT_THEMES;

export const THEME_STORAGE_KEY = "accent-theme";

export function isAccentTheme(value: string): value is AccentTheme {
  return value in ACCENT_THEMES;
}

export function applyAccentTheme(theme: AccentTheme) {
  const { accent, ink } = ACCENT_THEMES[theme];
  const root = document.documentElement;
  root.style.setProperty("--accent", accent);
  root.style.setProperty("--accent-ink", ink);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // storage unavailable (private mode) — theme still applies for this page view
  }
}
