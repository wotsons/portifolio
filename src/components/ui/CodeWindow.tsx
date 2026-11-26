"use client";

import { useMemo } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { sliceTokens, tokenize, type TokenKind } from "@/lib/highlight";
import { cn } from "@/lib/utils";

const COLORS: Record<TokenKind, string> = {
  keyword: "text-accent",
  string: "text-[#9ecbff]",
  number: "text-[#f78c6c]",
  boolean: "text-[#f78c6c]",
  key: "text-fg",
  punct: "text-muted",
  plain: "text-fg-2",
};

interface Props {
  title: string;
  code: string;
  start: boolean;
  className?: string;
}

export function CodeWindow({ title, code, start, className }: Props) {
  const tokens = useMemo(() => tokenize(code), [code]);
  const { visible, done } = useTypewriter(code, { speed: 18, newlinePause: 140, enabled: start });
  const shown = sliceTokens(tokens, visible);

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-card shadow-float",
        className,
      )}
    >
      <figcaption className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden />
        <span className="ml-2 font-mono text-xs text-muted">{title}</span>
      </figcaption>
      {/* Full code is exposed to assistive tech; the animated copy is decorative. */}
      <pre className="sr-only">{code}</pre>
      <pre
        aria-hidden
        className="min-h-[268px] overflow-x-auto p-5 font-mono text-[13px] leading-[22px]"
      >
        <code className={cn(!done && "caret")}>
          {shown.map((t, i) => (
            <span key={i} className={COLORS[t.kind]}>
              {t.text}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
