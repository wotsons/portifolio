import { describe, expect, it } from "vitest";
import { profile } from "@/content/profile";
import { COMMANDS, complete, runCommand, type Translate } from "./commands";

// Echoes the key and values so assertions don't depend on copy.
const t: Translate = (key, values) => (values ? `${key} ${JSON.stringify(values)}` : key);
const run = (input: string) => runCommand(input, { t, locale: "en" });

describe("runCommand", () => {
  it("lists every visible command in help", () => {
    const { lines } = run("help");
    for (const cmd of COMMANDS) {
      expect(lines.some((l) => l.text.includes(cmd))).toBe(true);
    }
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

  it("navigates to known sections only", () => {
    expect(run("goto #work").effects).toEqual([{ type: "goto", section: "work" }]);
    expect(run("cd contact").effects).toEqual([{ type: "goto", section: "contact" }]);
    expect(run("goto nowhere").effects).toEqual([]);
  });

  it("emits clear, close and game effects", () => {
    expect(run("clear").effects).toEqual([{ type: "clear" }]);
    expect(run("exit").effects).toEqual([{ type: "close" }]);
    expect(run("snake").effects).toEqual([{ type: "game", game: "snake" }]);
  });

  it("echoes arguments", () => {
    expect(run("echo hello   world").lines[0].text).toBe("hello world");
  });
});

describe("complete", () => {
  it("completes a unique prefix", () => {
    expect(complete("whoa")).toBe("whoami");
  });

  it("returns null for ambiguous or unknown prefixes", () => {
    expect(complete("e")).toBeNull(); // experience, echo, exit
    expect(complete("zzz")).toBeNull();
    expect(complete("")).toBeNull();
  });
});
