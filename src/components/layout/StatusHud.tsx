"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

export function formatUptime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  return `${pad(h)}:${pad(m)}:${pad(totalSeconds % 60)}`;
}

export function scrollPercent(scrollY: number, scrollHeight: number, viewport: number) {
  const max = scrollHeight - viewport;
  return max > 0 ? Math.min(100, Math.round((scrollY / max) * 100)) : 0;
}

export function StatusHud() {
  const t = useTranslations("hud");
  const [seconds, setSeconds] = useState(0);
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(
        scrollPercent(window.scrollY, document.documentElement.scrollHeight, window.innerHeight),
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const row = "flex items-center justify-between gap-6";

  return (
    <aside
      aria-label={t("label")}
      className="fixed top-5 right-5 z-30 hidden min-w-[176px] flex-col gap-1.5 rounded-lg border border-line bg-bg-deep/80 px-3.5 py-3 font-mono text-[11px] leading-4 text-muted backdrop-blur min-[1000px]:flex print:hidden"
    >
      <div className={row}>
        <span>{t("uptime")}</span>
        <span className="text-fg tabular-nums">{formatUptime(seconds)}</span>
      </div>
      <div className={row}>
        <span>{t("scrolled")}</span>
        <span className="text-fg tabular-nums">{scrolled}%</span>
      </div>
      <div className={row}>
        <span>{t("available")}</span>
        <span className="relative flex size-2" aria-hidden>
          <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative size-2 rounded-full bg-accent" />
        </span>
      </div>
    </aside>
  );
}
