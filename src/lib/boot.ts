"use client";

import { useSyncExternalStore } from "react";

/**
 * Shared "is the boot screen finished?" flag. Defaults to done; the boot
 * screen flips it to pending in a layout effect (before any passive effects
 * start hero animations) and back to done when dismissed.
 */
let done = true;
const listeners = new Set<() => void>();

function set(value: boolean) {
  done = value;
  listeners.forEach((l) => l());
}

export const beginBoot = () => set(false);
export const finishBoot = () => set(true);

export function useBootDone() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => done,
    () => true,
  );
}
