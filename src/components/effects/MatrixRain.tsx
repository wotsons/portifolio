"use client";

import { useEffect, useRef, useState } from "react";
import { useIdle } from "@/hooks/useIdle";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAppEvent } from "@/lib/events";
import { useEffectsEnabled } from "@/lib/settings";
import { cn } from "@/lib/utils";

const CHARS = "01<>[]{}/\\;=";
const SIZE = 16;
const FRAME_MS = 50;

/** Subtle full-screen "digital rain". Columns near the pointer brighten and speed up. */
export function MatrixRain() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const idle = useIdle(30_000);
  const enabled = useEffectsEnabled() && !reduced;
  const [burst, setBurst] = useState(false);
  useAppEvent("rain:burst", () => {
    setBurst(true);
    window.setTimeout(() => setBurst(false), 1000);
  });

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx || !enabled) return;

    let drops: number[] = [];
    let mouseX = -1e4;
    let timer = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = window.innerWidth * dpr;
      el.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(window.innerWidth / SIZE);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };

    const draw = () => {
      const styles = getComputedStyle(document.documentElement);
      const accent = styles.getPropertyValue("--accent").trim() || "#2dd4bf";
      ctx.fillStyle = "rgba(13, 17, 23, 0.08)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.font = `${SIZE}px ui-monospace, monospace`;
      for (let i = 0; i < drops.length; i++) {
        const x = i * SIZE;
        const near = Math.abs(x - mouseX) < 80;
        ctx.fillStyle = near ? "#e6fffb" : accent;
        ctx.fillText(CHARS[(Math.random() * CHARS.length) | 0], x, drops[i] * SIZE);
        if (drops[i] * SIZE > window.innerHeight && Math.random() > 0.975) drops[i] = 0;
        drops[i] += near ? 2 : 1;
      }
    };

    const start = () => {
      if (!timer) timer = window.setInterval(draw, FRAME_MS);
    };
    const stop = () => {
      clearInterval(timer);
      timer = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onMove = (e: PointerEvent) => (mouseX = e.clientX);

    resize();
    start();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 size-full transition-opacity duration-1000 print:hidden",
        burst ? "opacity-40" : idle ? "opacity-[0.22]" : "opacity-[0.07]",
      )}
    />
  );
}
