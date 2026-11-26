"use client";

import { useEffect } from "react";

/** The hidden `.reveal` state is gated on `html.js`, so content stays visible without JS. */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 },
    );
    document.querySelectorAll(".reveal:not([data-visible])").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
