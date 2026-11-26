"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { beginBoot, finishBoot } from "@/lib/boot";
import { cn } from "@/lib/utils";

const KEY = "booted";

/** First-visit-per-session boot sequence. Any key, click or touch skips it. */
export function BootScreen() {
  const t = useTranslations("boot");
  const [state, setState] = useState<"off" | "on" | "leaving">("off");
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
    let seen = true;
    try {
      seen = !!sessionStorage.getItem(KEY);
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    beginBoot();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- must show before first paint
    setState("on");
  }, []);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    setState("leaving");
    finishBoot();
    window.setTimeout(() => setState("off"), 400);
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

  if (state === "off") return null;

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[90] flex flex-col justify-center bg-bg-deep px-8 font-mono text-sm leading-6 transition-opacity duration-400 sm:px-[20vw] print:hidden",
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
