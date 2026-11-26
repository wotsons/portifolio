import type { Locale } from "@/i18n/routing";

/** A value that has one variant per supported locale. */
export type Localized<T = string> = Record<Locale, T>;

export function l<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

export type ProjectStatus = "production" | "development" | "archived";

export type PreviewKind = "chat" | "widget" | "integrations" | "dashboard" | "player" | "terminal";

export interface Project {
  slug: string;
  title: string;
  status: ProjectStatus;
  preview: PreviewKind;
  /** Path under /public; replaces the illustration. */
  image?: string;
  summary: Localized;
  stack: string[];
  challenge: Localized;
  impact: Localized;
  liveUrl?: string;
  sourceUrl?: string;
}

export interface Experience {
  company: string;
  companyUrl?: string;
  role: Localized;
  /** ISO year-month, e.g. "2022-03". */
  start: string;
  /** ISO year-month, or `null` for the current position. */
  end: string | null;
  location: Localized;
  highlights: Localized<string[]>;
  stack: string[];
}

export interface Skill {
  name: string;
  /** 0–100, drives the progress bar width. */
  level: number;
}

export interface Highlight {
  title: Localized;
  detail: Localized;
  year: string;
}
