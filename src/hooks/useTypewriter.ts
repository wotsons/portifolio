"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface Options {
  speed?: number;
  newlinePause?: number;
  delay?: number;
  enabled?: boolean;
}

/** Returns a character count (not a string) so callers can slice pre-tokenized text. */
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
