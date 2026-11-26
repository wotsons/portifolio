"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ScrollToEnd({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
