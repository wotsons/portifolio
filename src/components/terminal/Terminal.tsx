"use client";

import { X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { hasGithub, profile } from "@/content/profile";
import { SECTIONS } from "@/content/sections";
import { useRouter } from "@/i18n/navigation";
import { emit, useAppEvent } from "@/lib/events";
import { applyAccentTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { complete, runCommand, type Effect, type Line, type Translate } from "./commands";

const KIND_CLASS: Record<NonNullable<Line["kind"]>, string> = {
  input: "text-fg",
  out: "text-fg-2",
  muted: "text-muted",
  accent: "text-accent",
  error: "text-negative",
};

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  return !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
}

export function Terminal() {
  const tRaw = useTranslations("terminal");
  const t: Translate = (key, values) => tRaw(key as never, values as never);
  const locale = useLocale();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const input = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  const show = (message?: string) => {
    setOpen(true);
    setLines((prev) => {
      const base = prev.length ? prev : [{ text: t("welcome"), kind: "muted" as const }];
      return message ? [...base, { text: message, kind: "error" as const }] : base;
    });
  };

  useAppEvent("terminal:open", (detail) => show(detail?.message));
  useAppEvent("terminal:toggle", () => (open ? setOpen(false) : show()));

  // Global shortcuts: ` toggles the terminal, 1–5 jump between sections.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "`" && (!isTyping(e.target) || e.target === input.current)) {
        e.preventDefault();
        emit("terminal:toggle");
        return;
      }
      if (isTyping(e.target)) return;
      const n = Number(e.key);
      if (n >= 1 && n <= SECTIONS.length) {
        document.getElementById(SECTIONS[n - 1])?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) input.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [lines]);

  const append = (...next: Line[]) => setLines((prev) => [...prev, ...next]);

  const runEffect = async (effect: Effect) => {
    switch (effect.type) {
      case "clear":
        return setLines([]);
      case "close":
        return setOpen(false);
      case "theme":
        return applyAccentTheme(effect.theme);
      case "lang":
        return router.replace("/", { locale: effect.locale });
      case "goto":
        return document.getElementById(effect.section)?.scrollIntoView({ behavior: "smooth" });
      case "open":
        return void window.open(effect.url, "_blank", "noopener");
      case "game":
        setOpen(false);
        return emit("game:open", { game: effect.game });
      case "stats": {
        if (!hasGithub) return append({ text: t("statsError"), kind: "error" });
        try {
          const res = await fetch(`https://api.github.com/users/${profile.github}`);
          if (!res.ok) throw new Error(String(res.status));
          const u = (await res.json()) as {
            public_repos: number;
            followers: number;
            following: number;
          };
          append({
            text: t("statsResult", {
              repos: u.public_repos,
              followers: u.followers,
              following: u.following,
            }),
            kind: "accent",
          });
        } catch {
          append({ text: t("statsError"), kind: "error" });
        }
      }
    }
  };

  const submit = () => {
    const cmd = value;
    setValue("");
    setCursor(-1);
    if (cmd.trim()) setHistory((h) => [cmd, ...h].slice(0, 50));
    const result = runCommand(cmd, { t, locale });
    append({ text: `$ ${cmd}`, kind: "input" }, ...result.lines);
    result.effects.forEach((e) => void runEffect(e));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") return submit();
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "Tab") {
      e.preventDefault();
      const c = complete(value);
      if (c) setValue(`${c} `);
      return;
    }
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(
        -1,
        Math.min(history.length - 1, cursor + (e.key === "ArrowUp" ? 1 : -1)),
      );
      setCursor(next);
      setValue(next === -1 ? "" : history[next]);
    }
    if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const onDragStart = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    const rect = e.currentTarget.parentElement!.getBoundingClientRect();
    drag.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onDragMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    setPos({
      x: Math.max(0, Math.min(window.innerWidth - 120, e.clientX - drag.current.dx)),
      y: Math.max(0, Math.min(window.innerHeight - 48, e.clientY - drag.current.dy)),
    });
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label={t("title")}
      className={cn(
        "fixed z-50 flex h-[min(380px,70vh)] w-[min(580px,calc(100vw-32px))] flex-col overflow-hidden rounded-xl border border-line-strong bg-bg-deep/95 shadow-float backdrop-blur",
        !pos && "right-4 bottom-4",
      )}
      style={pos ? { left: pos.x, top: pos.y } : undefined}
      onClick={() => input.current?.focus({ preventScroll: true })}
    >
      <div
        className="flex cursor-grab touch-none items-center gap-2 border-b border-line px-4 py-2.5 select-none active:cursor-grabbing"
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={() => (drag.current = null)}
      >
        <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden />
        <span className="ml-2 font-mono text-xs text-muted">~/{t("title")}</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t("close")}
          className="ml-auto grid size-6 place-items-center rounded text-muted hover:text-fg"
        >
          <X className="size-3.5" />
        </button>
      </div>
      <div
        ref={body}
        role="log"
        aria-live="polite"
        className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-5 whitespace-pre-wrap"
      >
        {lines.map((line, i) => (
          <div key={i} className={KIND_CLASS[line.kind ?? "out"]}>
            {line.href ? (
              <a href={line.href} target="_blank" rel="noreferrer" className="hover:underline">
                {line.text}
              </a>
            ) : (
              line.text
            )}
          </div>
        ))}
        <div className="flex gap-2">
          <span className="text-accent" aria-hidden>
            $
          </span>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label={t("inputLabel")}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-fg caret-accent outline-none"
          />
        </div>
      </div>
    </div>
  );
}
