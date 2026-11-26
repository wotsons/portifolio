"use client";

import { useSyncExternalStore } from "react";

function createStore<T>(initial: () => T) {
  let value: T | undefined;
  const listeners = new Set<() => void>();
  return {
    get: () => (value ??= initial()),
    set: (next: T) => {
      value = next;
      listeners.forEach((l) => l());
    },
    subscribe: (l: () => void) => {
      listeners.add(l);
      return () => void listeners.delete(l);
    },
  };
}

const EFFECTS_KEY = "effects";

export const effectsStore = createStore<boolean>(() => {
  try {
    return localStorage.getItem(EFFECTS_KEY) !== "off";
  } catch {
    return true;
  }
});

export function setEffects(on: boolean) {
  effectsStore.set(on);
  try {
    localStorage.setItem(EFFECTS_KEY, on ? "on" : "off");
  } catch {}
}

export function useEffectsEnabled() {
  return useSyncExternalStore(effectsStore.subscribe, effectsStore.get, () => true);
}

/** 1+ unlocks snake, 2+ triggers the light show. */
export const konamiStore = createStore<number>(() => 0);

export function useKonamiCount() {
  return useSyncExternalStore(konamiStore.subscribe, konamiStore.get, () => 0);
}
