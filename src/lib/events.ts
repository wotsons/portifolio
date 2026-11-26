"use client";

import { useEffect, useRef } from "react";

/**
 * Tiny typed event bus over window CustomEvents. Lets unrelated widgets
 * (footer button, keyboard shortcuts, context menu, terminal) talk without
 * a global store or prop drilling.
 */
export interface AppEvents {
  "terminal:open": { message?: string };
  "terminal:toggle": undefined;
  "game:open": { game: "snake" | "hunt" };
  "contact:prefill": { message: string };
  toast: { message: string };
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
