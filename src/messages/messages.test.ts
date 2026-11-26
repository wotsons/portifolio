import { createTranslator } from "next-intl";
import { describe, expect, it } from "vitest";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { routing } from "@/i18n/routing";
import en from "./en.json";
import pt from "./pt-BR.json";

type Tree = { [key: string]: string | Tree };

function keys(tree: Tree, prefix = ""): string[] {
  return Object.entries(tree).flatMap(([k, v]) =>
    typeof v === "string" ? [`${prefix}${k}`] : keys(v, `${prefix}${k}.`),
  );
}

describe("i18n", () => {
  it("pt-BR and en define exactly the same message keys", () => {
    expect(keys(en).sort()).toEqual(keys(pt).sort());
  });

  it("has no empty messages", () => {
    for (const [name, tree] of [
      ["en", en],
      ["pt-BR", pt],
    ] as const) {
      const empty = keys(tree).filter((k) => {
        const v = k.split(".").reduce<unknown>((o, p) => (o as Tree)[p], tree);
        return !String(v).trim();
      });
      expect(empty, name).toEqual([]);
    }
  });

  it("every message parses and formats as plain text (no stray <tags>)", () => {
    for (const [locale, tree] of [
      ["en", en],
      ["pt-BR", pt],
    ] as const) {
      const errors: string[] = [];
      const t = createTranslator({
        locale,
        messages: tree,
        onError: (e) => errors.push(e.message),
      });
      for (const key of keys(tree)) {
        const raw = key.split(".").reduce<unknown>((o, p) => (o as Tree)[p], tree) as string;
        // Supply a dummy value for every {placeholder}.
        const values = Object.fromEntries(
          [...raw.matchAll(/\{(\w+)/g)].map(([, name]) => [name, 1]),
        );
        (t as (k: string, v: object) => string)(key, values);
      }
      expect(errors, locale).toEqual([]);
    }
  });

  it("renders ICU-escaped angle brackets literally", () => {
    const t = createTranslator({ locale: "en", messages: en });
    expect(t("float.note4")).toContain("<canvas>,");
    expect(t("terminal.langUsage")).toBe("usage: lang <pt|en>");
    expect(t("terminal.themeUsage", { themes: "a|b" })).toBe("usage: theme <a|b>");
  });

  it("localizes every content entry for every locale", () => {
    for (const locale of routing.locales) {
      for (const p of projects) {
        expect(p.summary[locale], `${p.slug} summary ${locale}`).toBeTruthy();
        expect(p.impact[locale], `${p.slug} impact ${locale}`).toBeTruthy();
      }
      for (const e of experience) {
        expect(e.highlights[locale].length, `${e.company} ${locale}`).toBeGreaterThan(0);
      }
    }
  });
});
