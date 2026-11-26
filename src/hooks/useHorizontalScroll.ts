"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

const MOBILE_QUERY = "(max-width: 700px)";

/**
 * Pins a section and translates `track` horizontally as the page scrolls
 * vertically through `wrapper`. Disabled on small screens and for reduced
 * motion, where the caller should fall back to native horizontal scrolling.
 */
export function useHorizontalScroll<W extends HTMLElement, T extends HTMLElement>() {
  const wrapper = useRef<W>(null);
  const track = useRef<T>(null);
  const reduced = useReducedMotion();
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const sync = () => setPinned(!reduced && !mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, [reduced]);

  useEffect(() => {
    const wrap = wrapper.current;
    const el = track.current;
    if (!pinned || !wrap || !el) return;

    let maxTranslate = 0;
    let frame = 0;

    const measure = () => {
      // Visible width excludes the parent's left padding (the fade gutter).
      const parent = el.parentElement;
      const visible = parent
        ? parent.clientWidth - parseFloat(getComputedStyle(parent).paddingLeft)
        : 0;
      maxTranslate = Math.max(0, el.scrollWidth - visible);
      wrap.style.height = `${window.innerHeight + maxTranslate}px`;
      update();
    };
    const update = () => {
      frame = 0;
      const top = wrap.getBoundingClientRect().top;
      const progress = maxTranslate ? Math.min(1, Math.max(0, -top / maxTranslate)) : 0;
      el.style.transform = `translate3d(${-progress * maxTranslate}px,0,0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    measure();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      wrap.style.height = "";
      el.style.transform = "";
    };
  }, [pinned]);

  return { pinned, wrapper, track };
}
