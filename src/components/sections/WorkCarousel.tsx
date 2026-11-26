"use client";

import type { ReactNode } from "react";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { cn } from "@/lib/utils";

interface Props {
  heading: ReactNode;
  hint: string;
  children: ReactNode;
}

export function WorkCarousel({ heading, hint, children }: Props) {
  const { pinned, wrapper, track } = useHorizontalScroll<HTMLDivElement, HTMLUListElement>();

  return (
    <div ref={wrapper} data-print-static className="relative">
      <div
        data-print-static
        className={cn(
          "flex flex-col justify-center",
          pinned && "sticky top-0 h-screen overflow-hidden",
        )}
        style={{ padding: "96px 0 64px var(--pad-left)" }}
      >
        <div className="max-w-[960px]" style={{ paddingRight: "var(--pad-right)" }}>
          {heading}
        </div>
        <div className={cn(!pinned && "-mb-4 [scrollbar-width:thin] overflow-x-auto pb-4")}>
          <ul
            ref={track}
            data-print-track
            className={cn(
              "flex w-max gap-6 will-change-transform",
              !pinned && "snap-x snap-mandatory",
            )}
            style={{ paddingRight: "var(--pad-right)" }}
          >
            {children}
          </ul>
        </div>
        <p aria-hidden className="mono-label mt-6">
          {hint}
        </p>
      </div>
    </div>
  );
}
