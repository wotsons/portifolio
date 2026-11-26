import { describe, expect, it } from "vitest";
import { profile } from "@/content/profile";
import { banner, COMMANDS, complete, runCommand, type Context, type Translate } from "./commands";

// Echoes the key and values so assertions don't depend on copy.
const t: Translate = (key, values) => (values ? `${key} ${JSON.stringify(values)}` : key);
const run = (input: string, ctx: Partial<Context> = {}) =>
  runCommand(input, { t, locale: "en", ...ctx });

describe("runCommand", () => {
  it("lists every visible command in help, but not snake", () => {
    const text = run("help")
      .lines.map((l) => l.text)
      .join("\n");
    for (const cmd of COMMANDS) expect(text).toContain(cmd);
    expect(text).not.toMatch(/\bsnake\b/);
  });

  it("is case and whitespace insensitive", () => {
    expect(run("  WHOAMI  ").lines[0].text).toContain(profile.name);
  });

  it("returns nothing for empty input", () => {
    expect(run("   ")).toEqual({ lines: [], effects: [] });
  });

  it("reports unknown commands", () => {
    const { lines } = run("foo");
    expect(lines[0].kind).toBe("error");
    expect(lines[0].text).toContain("notFound");
  });

  it("validates theme names", () => {
    expect(run("theme blue").effects).toEqual([{ type: "theme", theme: "blue" }]);
    expect(run("theme nope").effects).toEqual([]);
    expect(run("theme nope").lines[0].kind).toBe("error");
  });

  it("maps language aliases to locales", () => {
    expect(run("lang pt").effects).toEqual([{ type: "lang", locale: "pt-BR" }]);
    expect(run("lang EN").effects).toEqual([{ type: "lang", locale: "en" }]);
    expect(run("lang fr").effects).toEqual([]);
  });

  it("navigates with cd/goto, including the projects/ directory", () => {
    expect(run("goto #work").effects).toEqual([{ type: "goto", section: "work" }]);
    expect(run("cd projects/").effects).toEqual([{ type: "goto", section: "work" }]);
    expect(run("cd ~/contact").effects).toEqual([{ type: "goto", section: "contact" }]);
    expect(run("cd nowhere").lines[0].text).toContain("cdNoSuch");
    expect(run("cd").lines[0].kind).toBe("error");
  });

  it("lists and reads files", () => {
    expect(run("ls").lines[0].text).toContain("secrets.txt");
    expect(run("cat secrets.txt").lines[0].text).toBe("secrets");
    expect(run("cat about.txt")).toEqual(run("about"));
    expect(run("cat resume.pdf").effects[0].type).toBe("open");
    expect(run("cat nope.txt").lines[0].text).toContain("catNoSuch");
    expect(run("cat").lines[0].text).toBe("catUsage");
  });

  it("toggles effects with matrix and reports the current state", () => {
    expect(run("matrix off").effects).toEqual([{ type: "effects", on: false }]);
    expect(run("matrix on").effects).toEqual([{ type: "effects", on: true }]);
    expect(run("matrix", { effectsOn: false }).lines[0].text).toContain('"state":"off"');
  });

  it("keeps snake hidden until the Konami code unlocks it", () => {
    expect(run("snake").lines[0].text).toContain("notFound");
    expect(run("snake", { snakeUnlocked: true }).effects).toEqual([
      { type: "game", game: "snake" },
    ]);
    expect(run("play").effects).toEqual([{ type: "game", game: "hunt" }]);
  });

  it("prints numbered history", () => {
    expect(run("history").lines[0].text).toBe("historyEmpty");
    const lines = run("history", { history: ["ls", "help"] }).lines.map((l) => l.text.trim());
    expect(lines).toEqual(["1  ls", "2  help"]);
  });

  it("grants sudo only for a sandwich", () => {
    expect(run("sudo rm -rf /").lines[0].text).toBe("sudo");
    expect(run("sudo make me a sandwich").lines[0].text).toBe("sudoGranted");
  });

  it("emits side effects for hire, email, reset, clear, close", () => {
    expect(run("hire").effects).toEqual([{ type: "hire" }]);
    expect(run("email").effects).toEqual([{ type: "navigate", url: `mailto:${profile.email}` }]);
    expect(run("reset").effects).toEqual([{ type: "reset" }]);
    expect(run("clear").effects).toEqual([{ type: "clear" }]);
    expect(run("exit").effects).toEqual([{ type: "close" }]);
  });

  it("echoes arguments", () => {
    expect(run("echo hello   world").lines[0].text).toBe("hello world");
  });
});

describe("banner", () => {
  it("draws a box whose rows all have the same width", () => {
    const rows = banner(["WOTSON SULA", "dev"]);
    expect(new Set(rows.map((r) => r.length)).size).toBe(1);
    expect(rows[0].startsWith("╔")).toBe(true);
  });
});

describe("complete", () => {
  it("completes a unique command prefix", () => {
    expect(complete("whoa")).toEqual({ value: "whoami " });
  });

  it("lists options for ambiguous prefixes", () => {
    expect(complete("e").options).toEqual(["experience", "email", "echo", "exit"]);
  });

  it("completes arguments for known commands", () => {
    expect(complete("theme bl")).toEqual({ value: "theme blue" });
    expect(complete("cat sec")).toEqual({ value: "cat secrets.txt" });
    expect(complete("matrix o").options).toEqual(["on", "off"]);
  });

  it("returns nothing for unknown input", () => {
    expect(complete("zzz")).toEqual({});
    expect(complete("")).toEqual({});
    expect(complete("echo a b")).toEqual({});
  });
});
