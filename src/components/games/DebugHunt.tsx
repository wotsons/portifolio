"use client";

import { Bug } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { GameModal } from "./GameModal";

const DURATION = 15;
const SPAWN_MS = 700;
const LIFETIME_MS = 1200;

interface Target {
  id: number;
  x: number;
  y: number;
}

type Phase = "idle" | "running" | "over";

export function DebugHunt({ onClose }: { onClose: () => void }) {
  const t = useTranslations("games");
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(DURATION);
  const [bugs, setBugs] = useState<Target[]>([]);

  const start = useCallback(() => {
    setScore(0);
    setTime(DURATION);
    setBugs([]);
    setPhase("running");
  }, []);

  useEffect(() => {
    if (phase !== "running") return;
    let id = 0;
    const spawn = window.setInterval(() => {
      const bug = { id: ++id, x: 6 + Math.random() * 82, y: 6 + Math.random() * 78 };
      setBugs((b) => [...b, bug]);
      window.setTimeout(() => setBugs((b) => b.filter((x) => x.id !== bug.id)), LIFETIME_MS);
    }, SPAWN_MS);
    let remaining = DURATION;
    const clock = window.setInterval(() => {
      remaining -= 1;
      setTime(remaining);
      if (remaining <= 0) {
        setPhase("over");
        setBugs([]);
      }
    }, 1000);
    return () => {
      clearInterval(spawn);
      clearInterval(clock);
    };
  }, [phase]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && phase !== "running") start();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, start]);

  return (
    <GameModal
      title={t("hunt.title")}
      help={t("hunt.help")}
      closeLabel={t("close")}
      onClose={onClose}
    >
      <div className="mb-2 flex justify-between font-mono text-xs text-fg-2" aria-live="polite">
        <span>{t("hunt.score", { score })}</span>
        <span>{t("hunt.time", { time })}</span>
      </div>
      <div className="relative h-[260px] overflow-hidden rounded-lg border border-line bg-bg-deep">
        {phase === "over" && (
          <p className="absolute inset-0 grid place-items-center p-6 text-center font-mono text-xs text-fg-2">
            {t("hunt.over", { score })}
          </p>
        )}
        {phase === "running" &&
          bugs.map((b) => (
            <button
              key={b.id}
              type="button"
              aria-label="bug"
              onClick={() => {
                setScore((s) => s + 1);
                setBugs((list) => list.filter((x) => x.id !== b.id));
              }}
              className="absolute grid size-8 -translate-1/2 place-items-center rounded-full text-negative transition-transform hover:scale-125"
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
            >
              <Bug className="size-5" />
            </button>
          ))}
      </div>
      <Button className="mt-3 h-9 w-full" onClick={start} disabled={phase === "running"}>
        {t("start")}
      </Button>
    </GameModal>
  );
}
