"use client";

import { RotateCw } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  front: ReactNode;
  back: ReactNode;
  flipLabel: string;
  flipBackLabel: string;
  className?: string;
}

const face =
  "absolute inset-0 flex flex-col overflow-y-auto rounded-xl border border-line bg-card p-6 transition-colors duration-150 [backface-visibility:hidden] group-hover:border-line-strong";

export function FlipCard({ front, back, flipLabel, flipBackLabel, className }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={cn("group relative [perspective:1000px]", className)}>
      <div
        data-print-flat
        className="relative size-full transition-transform duration-[600ms] ease-(--ease-out-expo) [transform-style:preserve-3d] motion-reduce:transition-none"
        style={{ transform: flipped ? "rotateY(180deg)" : undefined }}
      >
        <div className={face} inert={flipped}>
          {front}
        </div>
        <div className={cn(face, "[transform:rotateY(180deg)]")} inert={!flipped}>
          {back}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={flipped ? flipBackLabel : flipLabel}
        title={flipped ? flipBackLabel : flipLabel}
        className="absolute top-4 right-4 z-[1] grid size-8 place-items-center rounded-md border border-line bg-raised text-muted transition-colors hover:border-line-strong hover:text-accent print:hidden"
      >
        <RotateCw className={cn("size-3.5 transition-transform", flipped && "-rotate-180")} />
      </button>
    </div>
  );
}
