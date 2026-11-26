import { describe, expect, it } from "vitest";
import { formatUptime, scrollPercent } from "./StatusHud";

describe("formatUptime", () => {
  it("formats seconds as HH:MM:SS", () => {
    expect(formatUptime(0)).toBe("00:00:00");
    expect(formatUptime(65)).toBe("00:01:05");
    expect(formatUptime(3600 + 59 * 60 + 59)).toBe("01:59:59");
  });
});

describe("scrollPercent", () => {
  it("rounds and clamps to 0–100", () => {
    expect(scrollPercent(0, 3000, 1000)).toBe(0);
    expect(scrollPercent(1000, 3000, 1000)).toBe(50);
    expect(scrollPercent(5000, 3000, 1000)).toBe(100);
  });

  it("is 0 when the page does not scroll", () => {
    expect(scrollPercent(0, 800, 1000)).toBe(0);
  });
});
