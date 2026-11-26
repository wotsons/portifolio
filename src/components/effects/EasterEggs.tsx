"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { DebugHunt } from "@/components/games/DebugHunt";
import { Snake } from "@/components/games/Snake";
import { profile } from "@/content/profile";
import { useIdle } from "@/hooks/useIdle";
import { useKonami } from "@/hooks/useKonami";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBootDone } from "@/lib/boot";
import { emit, useAppEvent } from "@/lib/events";
import { konamiStore } from "@/lib/settings";

function flash(className: string, ms: number) {
  const root = document.documentElement;
  root.classList.remove(className);
  void root.offsetWidth; // restart the animation if it is already running
  root.classList.add(className);
  window.setTimeout(() => root.classList.remove(className), ms);
}

/** Konami unlock, game launcher, idle screensaver, away tab title, key clicks, toasts, hint, console and context menu. */
export function EasterEggs() {
  const t = useTranslations("terminal");
  const [game, setGame] = useState<"snake" | "hunt" | null>(null);
  const close = useCallback(() => setGame(null), []);

  useAppEvent("game:open", ({ game }) => setGame(game));
  useKonami(() => {
    const count = konamiStore.get() + 1;
    konamiStore.set(count);
    if (count === 1) {
      flash("konami-flash", 400);
      emit("terminal:open", {
        lines: [
          { text: t("konamiTitle"), kind: "accent" },
          { text: t("konamiBody") },
          { text: t("konamiHint"), kind: "muted" },
        ],
      });
    } else {
      flash("konami-flash-big", 1000);
      emit("rain:burst");
      emit("terminal:open", {
        lines: [
          { text: t("konamiAgainTitle"), kind: "accent" },
          { text: t("konamiAgainBody"), kind: "muted" },
        ],
      });
    }
  });

  return (
    <>
      {game === "snake" && <Snake onClose={close} />}
      {game === "hunt" && <DebugHunt onClose={close} />}
      <Screensaver />
      <AwayTitle />
      <KeySound />
      <Toasts />
      <FirstVisitHint />
      <ConsoleGreeting />
      <ContextMenu />
    </>
  );
}

/** Shows the keyboard tip once, 7s after the boot screen finishes. */
function FirstVisitHint() {
  const t = useTranslations();
  const booted = useBootDone();
  useEffect(() => {
    if (!booted) return;
    try {
      if (localStorage.getItem("hint-seen")) return;
    } catch {
      return;
    }
    const timer = window.setTimeout(() => {
      emit("toast", { message: t("hint"), duration: 5000 });
      try {
        localStorage.setItem("hint-seen", "1");
      } catch {}
    }, 7000);
    return () => clearTimeout(timer);
  }, [booted, t]);
  return null;
}

/** A hello for the curious ones who open devtools. */
function ConsoleGreeting() {
  const t = useTranslations("console");
  const said = useRef(false);
  useEffect(() => {
    if (said.current) return;
    said.current = true;
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent");
    console.log(`%c${t("hello")}`, `color:${accent};font:600 14px ui-monospace,monospace`);
    console.log(t("source", { repo: profile.sourceRepo, email: profile.email }));
  }, [t]);
  return null;
}

function Screensaver() {
  const idle = useIdle(30_000);
  const reduced = useReducedMotion();
  const el = useRef<HTMLSpanElement>(null);
  const active = idle && !reduced;

  useEffect(() => {
    if (!active) return;
    let x = Math.random() * (window.innerWidth - 40);
    let y = Math.random() * (window.innerHeight - 40);
    let vx = 1.6;
    let vy = 1.2;
    let frame = 0;
    const loop = () => {
      const node = el.current;
      if (node) {
        const w = window.innerWidth - node.offsetWidth;
        const h = window.innerHeight - node.offsetHeight;
        x += vx;
        y += vy;
        if (x <= 0 || x >= w) vx *= -1;
        if (y <= 0 || y >= h) vy *= -1;
        node.style.translate = `${x}px ${y}px`;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  if (!active) return null;
  return (
    <span
      ref={el}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[70] font-mono text-3xl text-accent drop-shadow-[0_0_12px_var(--accent)]"
    >
      {"{ }"}
    </span>
  );
}

function AwayTitle() {
  const t = useTranslations("misc");
  const away = t("away");
  useEffect(() => {
    let original = document.title;
    const onChange = () => {
      if (document.hidden) {
        original = document.title;
        document.title = away;
      } else {
        document.title = original;
      }
    };
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, [away]);
  return null;
}

/** Soft synthesized key click while typing in inputs (WebAudio, no assets). */
function KeySound() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    let ctx: AudioContext | null = null;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !/^(INPUT|TEXTAREA)$/.test(target.tagName) || e.key.length > 1) return;
      ctx ??= new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = 1400 + Math.random() * 400;
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      void ctx?.close();
    };
  }, [reduced]);
  return null;
}

/** Stacked toasts, bottom-left above the dev_mode button. */
function Toasts() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const nextId = useRef(0);
  useAppEvent("toast", ({ message, duration = 3200 }) => {
    const id = ++nextId.current;
    setToasts((list) => [...list, { id, message }]);
    window.setTimeout(() => setToasts((list) => list.filter((x) => x.id !== id)), duration);
  });
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-18 left-4 z-[85] flex max-w-[min(360px,calc(100vw-32px))] flex-col gap-2 print:hidden"
    >
      {toasts.map((toast) => (
        <p
          key={toast.id}
          className="animate-[rise_300ms_var(--ease-out-expo)] rounded-lg border border-line-strong bg-raised px-4 py-2 font-mono text-xs text-fg shadow-float"
        >
          {toast.message}
        </p>
      ))}
    </div>
  );
}

function ContextMenu() {
  const t = useTranslations("context");
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onContext = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Keep the native menu for inputs, links, selections and shift+right-click.
      if (e.shiftKey || target.closest("input, textarea, a") || String(window.getSelection()))
        return;
      e.preventDefault();
      setPos({
        x: Math.min(e.clientX, window.innerWidth - 200),
        y: Math.min(e.clientY, window.innerHeight - 180),
      });
    };
    const dismiss = () => setPos(null);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("contextmenu", onContext);
    window.addEventListener("click", dismiss);
    window.addEventListener("scroll", dismiss, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("contextmenu", onContext);
      window.removeEventListener("click", dismiss);
      window.removeEventListener("scroll", dismiss);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (pos) menu.current?.querySelector("button")?.focus();
  }, [pos]);

  if (!pos) return null;

  const items: { label: string; run: () => void }[] = [
    {
      label: t("copyLink"),
      run: () => {
        void navigator.clipboard?.writeText(window.location.href);
        emit("toast", { message: t("copied") });
      },
    },
    { label: t("viewSource"), run: () => window.open(profile.sourceRepo, "_blank", "noopener") },
    { label: t("terminal"), run: () => emit("terminal:open", {}) },
    { label: t("about"), run: () => emit("toast", { message: t("aboutText") }) },
  ];

  return (
    <div
      ref={menu}
      role="menu"
      className="fixed z-[95] min-w-[180px] rounded-lg border border-line-strong bg-raised p-1 font-mono text-xs shadow-float"
      style={{ left: pos.x, top: pos.y }}
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          role="menuitem"
          onClick={() => {
            item.run();
            setPos(null);
          }}
          className="block w-full rounded-md px-3 py-2 text-left text-fg-2 hover:bg-card hover:text-accent focus:bg-card focus:text-accent focus:outline-none"
        >
          <span className="text-accent">&gt;</span> {item.label}
        </button>
      ))}
    </div>
  );
}
