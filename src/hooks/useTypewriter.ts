"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface Options {
  /** ms per character */
  speed?: number;
  /** extra pause after a newline, in ms */
  newlinePause?: number;
  /** ms before typing starts */
  delay?: number;
  /** typing only starts once this is true */
  enabled?: boolean;
}

/**
 * Reveals `text` one character at a time. Returns how many characters are
 * visible, so callers can slice pre-tokenized (e.g. syntax highlighted) text.
 * Honors prefers-reduced-motion by revealing everything immediately.
 */
export function useTypewriter(
  text: string,
  { speed = 32, newlinePause = 0, delay = 0, enabled = true }: Options = {},
) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled || reduced) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i >= text.length) return;
      timer = setTimeout(tick, text[i - 1] === "\n" ? speed + newlinePause : speed);
    };
    timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [text, speed, newlinePause, delay, enabled, reduced]);

  const visible = reduced ? text.length : count;
  return { visible, done: visible >= text.length };
}
