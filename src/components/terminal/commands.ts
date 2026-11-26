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
  | { type: "navigate"; url: string }
  | { type: "stats" }
  | { type: "effects"; on: boolean }
  | { type: "reset" }
  | { type: "hire" }
  | { type: "game"; game: "snake" | "hunt" };

export interface Result {
  lines: Line[];
  effects: Effect[];
}

export type Translate = (key: string, values?: Record<string, string | number>) => string;

export interface Context {
  t: Translate;
  locale: Locale;
  /** Previously submitted commands, oldest first. */
  history?: string[];
  snakeUnlocked?: boolean;
  effectsOn?: boolean;
}

/** Visible commands, in the order `help` lists them. `snake` stays hidden. */
export const COMMANDS = [
  "help",
  "whoami",
  "about",
  "now",
  "skills",
  "projects",
  "experience",
  "contact",
  "hire",
  "email",
  "github",
  "social",
  "resume",
  "ls",
  "cat",
  "cd",
  "goto",
  "theme",
  "matrix",
  "reset",
  "lang",
  "stats",
  "specs",
  "banner",
  "play",
  "history",
  "date",
  "echo",
  "clear",
  "exit",
] as const;

export const FILES = ["projects/", "about.txt", "resume.pdf", "secrets.txt"] as const;

export const ARG_COMPLETIONS: Record<string, readonly string[]> = {
  cat: FILES.filter((f) => !f.endsWith("/")),
  cd: ["projects/", ...SECTIONS],
  goto: SECTIONS,
  theme: Object.keys(ACCENT_THEMES),
  matrix: ["on", "off"],
  lang: ["pt", "en"],
};

const out = (text: string, kind: LineKind = "out", href?: string): Line => ({ text, kind, href });
const ok = (lines: Line[], effects: Effect[] = []): Result => ({ lines, effects });

const LANG_ALIASES: Record<string, Locale> = { pt: "pt-BR", "pt-br": "pt-BR", en: "en" };

export function banner(lines: string[]): string[] {
  const width = Math.max(...lines.map((l) => l.length)) + 2;
  return [
    `╔${"═".repeat(width)}╗`,
    ...lines.map((l) => `║ ${l.padEnd(width - 1)}║`),
    `╚${"═".repeat(width)}╝`,
  ];
}

export function runCommand(input: string, ctx: Context): Result {
  const { t, locale } = ctx;
  const [rawCmd = "", ...args] = input.trim().split(/\s+/);
  const cmd = rawCmd.toLowerCase();
  const arg = args.join(" ");
  const notFound = () => ok([out(t("notFound", { cmd: rawCmd }), "error")]);

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

    case "now":
      return ok([out(t("now"))]);

    case "skills":
      return ok(
        skills.map((s) => {
          const filled = Math.round(s.level / 10);
          return out(`  ${s.name.padEnd(34)} ${"█".repeat(filled)}${"░".repeat(10 - filled)}`);
        }),
      );

    case "projects":
      return ok(
        projects.flatMap((p) => [
          out(`> ${p.title}`, "accent", p.liveUrl ?? p.sourceUrl),
          out(`  ${p.summary[locale]}`, "muted"),
        ]),
        [{ type: "goto", section: "work" }],
      );

    case "experience":
      return ok(
        experience.map((e) =>
          out(
            `  ${e.start.slice(0, 4)}–${e.end?.slice(0, 4) ?? "now "}  ${e.role[locale]} @ ${e.company}`,
          ),
        ),
        [{ type: "goto", section: "experience" }],
      );

    case "contact":
      return ok(
        [out(profile.email, "accent", `mailto:${profile.email}`)],
        [{ type: "goto", section: "contact" }],
      );

    case "hire":
      return ok([], [{ type: "hire" }]);

    case "email":
      return ok(
        [out(profile.email, "accent")],
        [{ type: "navigate", url: `mailto:${profile.email}` }],
      );

    case "github": {
      const url = `https://github.com/${profile.github}`;
      return ok([out(url.replace("https://", ""), "accent", url)], [{ type: "open", url }]);
    }

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

    case "ls":
      return ok([out(FILES.join("    "))]);

    case "cat": {
      if (!arg) return ok([out(t("catUsage"), "error")]);
      if (arg === "about.txt") return runCommand("about", ctx);
      if (arg === "resume.pdf") return runCommand("resume", ctx);
      if (arg === "secrets.txt") return ok([out(t("secrets"), "accent")]);
      return ok([out(t("catNoSuch", { file: arg }), "error")]);
    }

    case "cd":
    case "goto": {
      if (!arg) return ok([out(t("gotoUsage", { sections: SECTIONS.join("|") }), "error")]);
      const dir = arg
        .replace(/^[~#/.]+/, "")
        .replace(/\/$/, "")
        .toLowerCase();
      const section = dir === "projects" ? "work" : dir;
      if (!isSectionId(section)) {
        return ok([out(t("cdNoSuch", { dir: arg }), "error")]);
      }
      return ok([out(t("cdEntered", { dir }), "muted")], [{ type: "goto", section }]);
    }

    case "theme": {
      const themes = Object.keys(ACCENT_THEMES).join("|");
      if (!isAccentTheme(arg)) return ok([out(t("themeUsage", { themes }), "error")]);
      return ok([out(t("themeSet", { theme: arg }), "accent")], [{ type: "theme", theme: arg }]);
    }

    case "matrix": {
      const state = (on: boolean) => t(on ? "on" : "off");
      if (arg === "on" || arg === "off") {
        const on = arg === "on";
        return ok([out(t("matrixSet", { state: state(on) }), "accent")], [{ type: "effects", on }]);
      }
      return ok([out(t("matrixStatus", { state: state(ctx.effectsOn ?? true) }))]);
    }

    case "reset":
      return ok([out(t("reset"), "accent")], [{ type: "reset" }]);

    case "lang": {
      const target = LANG_ALIASES[arg.toLowerCase()];
      if (!target) return ok([out(t("langUsage"), "error")]);
      return ok([out(t("langSet"), "accent")], [{ type: "lang", locale: target }]);
    }

    case "stats":
      return ok([out(t("statsLoading"), "muted")], [{ type: "stats" }]);

    case "specs":
      return ok([
        out(t("specsTitle"), "accent"),
        out("  framework   Next.js 16 (App Router, Cache Components)"),
        out("  language    TypeScript (strict)"),
        out("  styling     Tailwind CSS v4"),
        out("  i18n        next-intl · pt-BR / en"),
        out("  forms       Server Actions + zod + Resend"),
        out("  tests       Vitest + Playwright · GitHub Actions"),
        out("  fonts       Geist, JetBrains Mono"),
        out("  analytics   Vercel Analytics"),
        out("  hosting     Vercel"),
      ]);

    case "banner":
      return ok(
        banner([profile.name.toUpperCase(), profile.role[locale].toLowerCase()]).map((l) =>
          out(l, "accent"),
        ),
      );

    case "play":
      return ok(
        [out(t("launching", { game: "debug_hunt.exe" }), "muted")],
        [{ type: "game", game: "hunt" }],
      );

    case "snake":
      if (!ctx.snakeUnlocked) return notFound();
      return ok(
        [out(t("launching", { game: "snake.exe" }), "muted")],
        [{ type: "game", game: "snake" }],
      );

    case "history": {
      const history = ctx.history ?? [];
      if (!history.length) return ok([out(t("historyEmpty"), "muted")]);
      return ok(history.map((h, i) => out(`  ${String(i + 1).padStart(3)}  ${h}`)));
    }

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
      if (arg.toLowerCase() === "make me a sandwich") {
        return ok([
          out(t("sudoGranted"), "accent"),
          out("    _______"),
          out("   /       \\"),
          out("  |~~~~~~~~~|"),
          out("  |#########|"),
          out("   \\_______/"),
          out(t("sudoHere"), "muted"),
        ]);
      }
      return ok([out(t("sudo"), "error")]);
    case "rm":
      return ok([out(t("sudo"), "error")]);
    case "konami":
    case "secret":
      return ok([out(t("secret"), "muted")]);
    case "hunt":
    case "debug":
      return runCommand("play", ctx);

    default:
      return notFound();
  }
}

export interface Completion {
  value?: string;
  options?: string[];
}

export function complete(input: string): Completion {
  const parts = input.trimStart().split(/\s+/);
  if (parts.length === 1) {
    const p = parts[0].toLowerCase();
    if (!p) return {};
    const matches = COMMANDS.filter((c) => c.startsWith(p));
    if (matches.length === 1) return { value: `${matches[0]} ` };
    return matches.length ? { options: matches } : {};
  }
  if (parts.length === 2) {
    const [cmd, partial] = parts;
    const candidates = ARG_COMPLETIONS[cmd.toLowerCase()] ?? [];
    const matches = candidates.filter((c) => c.startsWith(partial.toLowerCase()));
    if (matches.length === 1) return { value: `${cmd} ${matches[0]}` };
    return matches.length > 1 ? { options: matches } : {};
  }
  return {};
}
