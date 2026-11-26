"use client";

import { useEffect, useRef } from "react";

export const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Advances through `sequence`; returns the new progress index (0 resets, length = complete). */
export function advanceSequence(sequence: string[], progress: number, key: string): number {
  const k = key.length === 1 ? key.toLowerCase() : key;
  if (k === sequence[progress]) return progress + 1;
  return k === sequence[0] ? 1 : 0;
}

export function useKonami(onUnlock: () => void) {
  const progress = useRef(0);
  const callback = useRef(onUnlock);
  useEffect(() => {
    callback.current = onUnlock;
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      progress.current = advanceSequence(KONAMI, progress.current, e.key);
      if (progress.current === KONAMI.length) {
        progress.current = 0;
        callback.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
