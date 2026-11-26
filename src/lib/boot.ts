"use client";

import { useSyncExternalStore } from "react";
import { BOOT_CLASS } from "./init-script";

/**
 * Shared "is the boot screen finished?" flag. On the client it starts from the
 * class the pre-paint script set, so hero animations never start under the boot.
 */
let done =
  typeof document === "undefined" || !document.documentElement.classList.contains(BOOT_CLASS);
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
