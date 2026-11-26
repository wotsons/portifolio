"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { GameModal } from "./GameModal";
import { GRID, initialState, step, turn, type Dir } from "./snake-logic";

const CELL = 16;
const TICK = 120;

const KEYS: Record<string, Dir> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};

export function Snake({ onClose }: { onClose: () => void }) {
  const t = useTranslations("games");
  const canvas = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState(initialState);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const queued = useRef<Dir | null>(null);

  const start = useCallback(() => {
    queued.current = null;
    setState(initialState());
    setPaused(false);
    setStarted(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const dir = KEYS[e.key.length === 1 ? e.key.toLowerCase() : e.key];
      if (dir) {
        e.preventDefault();
        queued.current = dir;
      } else if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      } else if (e.key === "Enter") {
        start();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [start]);

  useEffect(() => {
    if (!started || paused || state.over) return;
    const timer = window.setInterval(() => {
      setState((s) => {
        const dir = queued.current ? turn(s, queued.current) : s.dir;
        queued.current = null;
        return step({ ...s, dir });
      });
    }, TICK);
    return () => clearInterval(timer);
  }, [started, paused, state.over]);

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    ctx.fillStyle = "#0a0e13";
    ctx.fillRect(0, 0, GRID * CELL, GRID * CELL);
    ctx.fillStyle = "#e6edf3";
    ctx.fillRect(state.food.x * CELL + 4, state.food.y * CELL + 4, CELL - 8, CELL - 8);
    state.snake.forEach((p, i) => {
      ctx.globalAlpha = i === 0 ? 1 : Math.max(0.35, 1 - i / state.snake.length);
      ctx.fillStyle = accent;
      ctx.fillRect(p.x * CELL + 1, p.y * CELL + 1, CELL - 2, CELL - 2);
    });
    ctx.globalAlpha = 1;
  }, [state]);

  return (
    <GameModal
      title={t("snake.title")}
      help={t("snake.help")}
      closeLabel={t("close")}
      onClose={onClose}
    >
      <canvas
        ref={canvas}
        width={GRID * CELL}
        height={GRID * CELL}
        className="mx-auto block aspect-square w-full max-w-[320px] rounded-lg border border-line"
        aria-label={t("snake.score", { score: state.score })}
      />
      <p className="mt-3 font-mono text-xs text-fg-2" aria-live="polite">
        {state.over
          ? t("snake.gameOver", { score: state.score })
          : started && state.score === 0
            ? t("snake.go")
            : t("snake.score", { score: state.score })}
      </p>
      <Button className="mt-3 h-9 w-full" onClick={start} disabled={started && !state.over}>
        {t("start")}
      </Button>
    </GameModal>
  );
}
