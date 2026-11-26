import { describe, expect, it } from "vitest";
import { advanceSequence, KONAMI } from "@/hooks/useKonami";
import { parseContact } from "./contact-schema";
import { toWeeks } from "./github";
import { sliceTokens, tokenize } from "./highlight";

const form = (data: Record<string, string>) => {
  const fd = new FormData();
  Object.entries(data).forEach(([k, v]) => fd.set(k, v));
  return fd;
};

describe("parseContact", () => {
  it("accepts and trims valid input", () => {
    const r = parseContact(
      form({ name: "  Ada ", email: "ada@example.com", message: "Hello there, nice site!" }),
    );
    expect(r).toEqual({
      ok: true,
      data: { name: "Ada", email: "ada@example.com", message: "Hello there, nice site!" },
    });
  });

  it("reports every invalid field once and echoes raw values", () => {
    const r = parseContact(form({ name: "A", email: "nope", message: "short" }));
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.fields.sort()).toEqual(["email", "message", "name"]);
      expect(r.values.email).toBe("nope");
    }
  });
});

describe("tokenize / sliceTokens", () => {
  const src = 'const a = { name: "x", ok: true, n: 8 };';

  it("round-trips the source text", () => {
    expect(
      tokenize(src)
        .map((t) => t.text)
        .join(""),
    ).toBe(src);
  });

  it("classifies tokens", () => {
    const kinds = Object.fromEntries(tokenize(src).map((t) => [t.text, t.kind]));
    expect(kinds).toMatchObject({
      const: "keyword",
      '"x"': "string",
      true: "boolean",
      "8": "number",
      name: "key",
    });
  });

  it("slices across token boundaries", () => {
    expect(
      sliceTokens(tokenize(src), 8)
        .map((t) => t.text)
        .join(""),
    ).toBe("const a ");
  });
});

describe("advanceSequence", () => {
  it("completes the Konami code and restarts on a wrong key", () => {
    let p = 0;
    for (const key of KONAMI) p = advanceSequence(KONAMI, p, key);
    expect(p).toBe(KONAMI.length);
    expect(advanceSequence(KONAMI, 3, "x")).toBe(0);
    expect(advanceSequence(KONAMI, 3, "ArrowUp")).toBe(1);
    expect(advanceSequence(KONAMI, 9, "A")).toBe(10);
  });
});

describe("toWeeks", () => {
  it("pads the first week so columns start on Sunday", () => {
    // 2025-01-01 is a Wednesday
    const days = Array.from({ length: 5 }, (_, i) => ({
      date: `2025-01-0${i + 1}`,
      count: i,
      level: 0 as const,
    }));
    const weeks = toWeeks(days);
    expect(weeks[0].slice(0, 3)).toEqual([null, null, null]);
    expect(weeks[0][3]?.date).toBe("2025-01-01");
    expect(weeks[1][0]?.date).toBe("2025-01-05");
  });
});
