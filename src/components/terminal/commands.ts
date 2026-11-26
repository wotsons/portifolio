import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { SECTIONS, isSectionId, type SectionId } from "@/content/sections";
import { skills } from "@/content/skills";
import type { Locale } from "@/i18n/routing";
import { ACCENT_THEMES, isAccentTheme, type AccentTheme } from "@/lib/theme";

export type LineKind = "input" | "out" | "muted" | "accent" | "error";

export interface Line {
  text: string;
  kind?: LineKind;
  href?: string;
}

export type Effect =
  | { type: "clear" }
  | { type: "close" }
  | { type: "theme"; theme: AccentTheme }
  | { type: "lang"; locale: Locale }
  | { type: "goto"; section: SectionId }
  | { type: "open"; url: string }
  | { type: "stats" }
  | { type: "game"; game: "snake" | "hunt" };

export interface Result {
  lines: Line[];
  effects: Effect[];
}

/** Loosely typed translator scoped to the `terminal` namespace. */
export type Translate = (key: string, values?: Record<string, string | number>) => string;

export interface Context {
  t: Translate;
  locale: Locale;
}

/** Visible commands, in the order `help` lists them. */
export const COMMANDS = [
  "help",
  "whoami",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
  "social",
  "resume",
  "theme",
  "lang",
  "goto",
  "stats",
  "date",
  "echo",
  "clear",
  "exit",
] as const;

const out = (text: string, kind: LineKind = "out", href?: string): Line => ({ text, kind, href });
const ok = (lines: Line[], effects: Effect[] = []): Result => ({ lines, effects });

const LANG_ALIASES: Record<string, Locale> = { pt: "pt-BR", "pt-br": "pt-BR", en: "en" };

export function runCommand(input: string, { t, locale }: Context): Result {
  const [rawCmd = "", ...args] = input.trim().split(/\s+/);
  const cmd = rawCmd.toLowerCase();
  const arg = args.join(" ");

  switch (cmd) {
    case "":
      return ok([]);

    case "help":
      return ok([
        out(t("help.title"), "accent"),
        ...COMMANDS.map((c) => out(`  ${c.padEnd(11)} ${t(`help.${c}`)}`)),
      ]);

    case "whoami":
      return ok([out(`${profile.name} — ${profile.role[locale]}`)]);

    case "about":
      return ok(profile.bio[locale].map((p) => out(p)));

    case "skills":
      return ok(
        skills.map((s) => {
          const filled = Math.round(s.level / 10);
          return out(`  ${s.name.padEnd(24)} ${"█".repeat(filled)}${"░".repeat(10 - filled)}`);
        }),
      );

    case "projects":
      return ok(
        projects.flatMap((p) => [
          out(`> ${p.title}`, "accent", p.liveUrl ?? p.sourceUrl),
          out(`  ${p.summary[locale]}`, "muted"),
        ]),
      );

    case "experience":
      return ok(
        experience.map((e) =>
          out(
            `  ${e.start.slice(0, 4)}–${e.end?.slice(0, 4) ?? "now "}  ${e.role[locale]} @ ${e.company}`,
          ),
        ),
      );

    case "contact":
      return ok(
        [out(profile.email, "accent", `mailto:${profile.email}`)],
        [{ type: "goto", section: "contact" }],
      );

    case "social":
      return ok([
        out(
          `github    github.com/${profile.github}`,
          "out",
          `https://github.com/${profile.github}`,
        ),
        out(
          `linkedin  ${profile.linkedin.replace(/^https?:\/\/(www\.)?/, "")}`,
          "out",
          profile.linkedin,
        ),
      ]);

    case "resume":
      return ok(
        [out(t("resumeOpening"), "muted")],
        [{ type: "open", url: profile.resume[locale] }],
      );

    case "theme": {
      const themes = Object.keys(ACCENT_THEMES).join("|");
      if (!isAccentTheme(arg)) return ok([out(t("themeUsage", { themes }), "error")]);
      return ok([out(t("themeSet", { theme: arg }), "accent")], [{ type: "theme", theme: arg }]);
    }

    case "lang": {
      const target = LANG_ALIASES[arg.toLowerCase()];
      if (!target) return ok([out(t("langUsage"), "error")]);
      return ok([out(t("langSet"), "accent")], [{ type: "lang", locale: target }]);
    }

    case "goto":
    case "cd": {
      const section = arg.replace(/^[#/]/, "").toLowerCase();
      if (!isSectionId(section)) {
        return ok([out(t("gotoUsage", { sections: SECTIONS.join("|") }), "error")]);
      }
      return ok([], [{ type: "goto", section }]);
    }

    case "stats":
      return ok([out(t("statsLoading"), "muted")], [{ type: "stats" }]);

    case "date":
      return ok([out(new Date().toLocaleString(locale))]);

    case "echo":
      return ok([out(arg)]);

    case "clear":
    case "cls":
      return ok([], [{ type: "clear" }]);

    case "exit":
    case "quit":
      return ok([], [{ type: "close" }]);

    // Hidden commands
    case "sudo":
    case "rm":
      return ok([out(t("sudo"), "error")]);
    case "konami":
    case "secret":
      return ok([out(t("secret"), "muted")]);
    case "snake":
      return ok([], [{ type: "game", game: "snake" }]);
    case "hunt":
    case "debug":
      return ok([], [{ type: "game", game: "hunt" }]);

    default:
      return ok([out(t("notFound", { cmd: rawCmd }), "error")]);
  }
}

/** Tab-completion: unique prefix match among visible commands. */
export function complete(partial: string): string | null {
  const p = partial.trim().toLowerCase();
  if (!p || p.includes(" ")) return null;
  const matches = COMMANDS.filter((c) => c.startsWith(p));
  return matches.length === 1 ? matches[0] : null;
}
