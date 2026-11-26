"use client";

import { useEffect, useRef } from "react";

/** A terminal line, kept structurally compatible with `Line` from the terminal commands. */
export interface TerminalLine {
  text: string;
  kind?: "input" | "out" | "muted" | "accent" | "error";
}

export interface AppEvents {
  "terminal:open": { message?: string; lines?: TerminalLine[] };
  "terminal:toggle": undefined;
  "game:open": { game: "snake" | "hunt" };
  "contact:prefill": { message: string };
  "rain:burst": undefined;
  toast: { message: string; duration?: number };
}

type EventName = keyof AppEvents;

export function emit<K extends EventName>(
  name: K,
  ...[detail]: AppEvents[K] extends undefined ? [] : [AppEvents[K]]
) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

export function useAppEvent<K extends EventName>(name: K, handler: (detail: AppEvents[K]) => void) {
  const ref = useRef(handler);
  useEffect(() => {
    ref.current = handler;
  });
  useEffect(() => {
    const listener = (e: Event) => ref.current((e as CustomEvent<AppEvents[K]>).detail);
    window.addEventListener(name, listener);
    return () => window.removeEventListener(name, listener);
  }, [name]);
}
