"use client";

import { useEffect } from "react";

/**
 * Fades in every `.reveal` element once it scrolls into view. Server
 * components only need the class name, no client wrapper. Elements stay
 * visible without JS because the hidden state is gated on `html.js`.
 */
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
