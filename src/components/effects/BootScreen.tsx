"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { beginBoot, finishBoot } from "@/lib/boot";
import { BOOT_CLASS, BOOT_STORAGE_KEY } from "@/lib/init-script";
import { cn } from "@/lib/utils";

/**
 * The overlay is always in the server HTML but only visible under `html.booting`,
 * which the <head> script sets before first paint; React then types the lines.
 */
export function BootScreen() {
  const t = useTranslations("boot");
  const [state, setState] = useState<"waiting" | "on" | "leaving" | "done">("waiting");
  const text = [
    t("lines.init"),
    t("lines.modules"),
    t("lines.i18n"),
    t("lines.mount"),
    t("lines.user"),
    t("lines.status"),
    "",
    t("lines.welcome"),
  ].join("\n");
  const { visible, done } = useTypewriter(text, {
    speed: 14,
    newlinePause: 120,
    enabled: state === "on",
  });

  // Layout effect so hero animations (passive effects) see the boot as pending.
  useLayoutEffect(() => {
    const booting = document.documentElement.classList.contains(BOOT_CLASS);
    if (booting) beginBoot();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- decided by the pre-paint script
    setState(booting ? "on" : "done");
  }, []);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
    } catch {}
    setState("leaving");
    finishBoot();
    window.setTimeout(() => {
      document.documentElement.classList.remove(BOOT_CLASS);
      setState("done");
    }, 400);
  }, []);

  useEffect(() => {
    if (state !== "on") return;
    const events = ["keydown", "pointerdown", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, finish, { once: true }));
    return () => events.forEach((e) => window.removeEventListener(e, finish));
  }, [state, finish]);

  useEffect(() => {
    if (state !== "on" || !done) return;
    const timer = window.setTimeout(finish, 450);
    return () => clearTimeout(timer);
  }, [state, done, finish]);

  if (state === "done") return null;

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[90] hidden flex-col justify-center bg-bg-deep px-8 font-mono text-sm leading-6 transition-opacity duration-400 in-[.booting]:flex sm:px-[20vw] print:hidden",
        state === "leaving" && "opacity-0",
      )}
    >
      <pre className={cn("whitespace-pre-wrap text-fg-2", !done && "caret")}>
        {text.slice(0, visible)}
      </pre>
      <p className="absolute bottom-8 text-xs text-muted">{t("skip")}</p>
    </div>
  );
}
