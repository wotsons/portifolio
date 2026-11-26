"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { effectsStore } from "@/lib/settings";

const TRAIL_CHARS = "01<>{}/;";
const INTERACTIVE = "a, button, input, textarea, select, label, [role='button']";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(mql.matches && !reduced);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("cursor-custom");

    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let frame = 0;
    let lastTrail = 0;

    const loop = () => {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      if (ring.current) ring.current.style.translate = `${rx}px ${ry}px`;
      frame = requestAnimationFrame(loop);
    };

    const spawnTrail = (now: number) => {
      if (now - lastTrail < 55 || !trail.current || !effectsStore.get()) return;
      lastTrail = now;
      const span = document.createElement("span");
      span.textContent = TRAIL_CHARS[(Math.random() * TRAIL_CHARS.length) | 0];
      span.className = "absolute font-mono text-xs text-accent";
      span.style.translate = `${x}px ${y}px`;
      span.animate(
        [
          { opacity: 0.8, transform: "translate(-50%, -50%)" },
          { opacity: 0, transform: "translate(-50%, 4px)" },
        ],
        { duration: 700, easing: "ease-out" },
      ).onfinish = () => span.remove();
      trail.current.appendChild(span);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.translate = `${x}px ${y}px`;
      const hovering = (e.target as Element | null)?.closest?.(INTERACTIVE);
      ring.current?.toggleAttribute("data-hover", !!hovering);
      spawnTrail(e.timeStamp);
    };
    const onLeave = () => {
      x = y = -100;
      if (dot.current) dot.current.style.translate = "-100px -100px";
    };

    frame = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("cursor-custom");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] print:hidden">
      <div ref={trail} className="absolute inset-0 overflow-hidden" />
      <div
        ref={ring}
        className="absolute top-0 left-0 -mt-4 -ml-4 size-8 rounded-full border border-line-strong transition-[scale,border-color] duration-150 data-hover:scale-150 data-hover:border-accent"
      />
      <div
        ref={dot}
        className="absolute top-0 left-0 -mt-[3px] -ml-[3px] size-1.5 rounded-full bg-accent"
      />
    </div>
  );
}
