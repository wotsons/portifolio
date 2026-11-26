"use client";

import { Bug } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { GameModal } from "./GameModal";

const DURATION = 20;
const SPAWN_MS = 650;
const LIFETIME_MS = 1100;

interface Target {
  id: number;
  x: number;
  y: number;
}

export function DebugHunt({ onClose }: { onClose: () => void }) {
  const t = useTranslations("games");
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(DURATION);
  const [bugs, setBugs] = useState<Target[]>([]);
  const over = time <= 0;

  useEffect(() => {
    if (over) return;
    let id = 0;
    const spawn = window.setInterval(() => {
      const bug = { id: ++id, x: 6 + Math.random() * 82, y: 6 + Math.random() * 78 };
      setBugs((b) => [...b, bug]);
      window.setTimeout(() => setBugs((b) => b.filter((x) => x.id !== bug.id)), LIFETIME_MS);
    }, SPAWN_MS);
    const clock = window.setInterval(() => setTime((s) => s - 1), 1000);
    return () => {
      clearInterval(spawn);
      clearInterval(clock);
    };
  }, [over, round]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && over) {
        setScore(0);
        setTime(DURATION);
        setBugs([]);
        setRound((r) => r + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [over]);

  return (
    <GameModal
      title={t("hunt.title")}
      help={t("hunt.help")}
      closeLabel={t("close")}
      onClose={onClose}
    >
      <div className="mb-2 flex justify-between font-mono text-xs text-fg-2" aria-live="polite">
        <span>{t("hunt.score", { score })}</span>
        <span>{t("hunt.time", { time: Math.max(0, time) })}</span>
      </div>
      <div className="relative h-[260px] overflow-hidden rounded-lg border border-line bg-bg-deep">
        {over ? (
          <p className="absolute inset-0 grid place-items-center p-6 text-center font-mono text-xs text-fg-2">
            {t("hunt.over", { score })}
          </p>
        ) : (
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
          ))
        )}
      </div>
    </GameModal>
  );
}
