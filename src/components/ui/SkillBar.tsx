"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  name: string;
  level: number;
  loadingLabel: string;
  doneLabel: string;
}

export function SkillBar({ name, level, loadingLabel, doneLabel }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-baseline justify-between font-mono text-xs">
        <span className="text-fg">{name}</span>
        <span className={done ? "text-accent" : "text-muted"} aria-hidden>
          {visible ? (done ? doneLabel : loadingLabel) : ""}
        </span>
      </div>
      <div
        role="meter"
        aria-label={name}
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 overflow-hidden rounded-[2px] bg-raised"
      >
        <div
          className="h-full bg-accent transition-[width] duration-[1200ms] ease-(--ease-out-expo)"
          style={{ width: visible ? `${level}%` : 0 }}
          onTransitionEnd={() => setDone(true)}
        />
      </div>
    </div>
  );
}
