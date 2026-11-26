"use client";

import { Code2, SquareTerminal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";
import { emit } from "@/lib/events";
import { cn } from "@/lib/utils";

const floatBtn =
  "fixed bottom-5 z-40 flex h-9 items-center gap-2 rounded-lg border border-line bg-raised/90 px-3 font-mono text-xs text-fg-2 shadow-float backdrop-blur transition-colors hover:border-line-strong hover:text-accent print:hidden";

const NOTES = ["note1", "note2", "note3", "note4", "note5", "note6"] as const;

/** Bottom-left dev_mode toggle (with developer notes) and bottom-right terminal toggle. */
export function FloatingButtons() {
  const t = useTranslations("float");
  const [devOpen, setDevOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!devOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDevOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [devOpen]);

  return (
    <>
      <button
        type="button"
        aria-expanded={devOpen}
        aria-controls={panelId}
        onClick={() => setDevOpen((o) => !o)}
        className={cn(floatBtn, "left-4", devOpen && "border-accent text-accent")}
      >
        <Code2 className="size-3.5" aria-hidden />
        {t("devMode")}
      </button>

      <button
        type="button"
        onClick={() => emit("terminal:toggle")}
        className={cn(floatBtn, "right-4")}
      >
        <SquareTerminal className="size-3.5" aria-hidden />
        {t("terminal")}
      </button>

      <section
        id={panelId}
        hidden={!devOpen}
        aria-label={t("devTitle")}
        className="fixed bottom-16 left-4 z-40 w-[min(360px,calc(100vw-32px))] rounded-xl border border-line-strong bg-bg-deep/95 p-4 shadow-float backdrop-blur print:hidden"
      >
        <div className="mb-3 flex items-center">
          <h2 className="font-mono text-xs text-accent">{t("devTitle")}</h2>
          <button
            type="button"
            onClick={() => setDevOpen(false)}
            aria-label={t("close")}
            className="ml-auto grid size-6 place-items-center rounded text-muted hover:text-fg"
          >
            <X className="size-3.5" />
          </button>
        </div>
        <ul className="flex flex-col gap-2.5 text-[13px] leading-5 text-fg-2">
          {NOTES.map((key) => (
            <li key={key} className="flex gap-2">
              <span aria-hidden className="font-mono text-accent">
                &gt;
              </span>
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
