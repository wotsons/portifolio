"use client";

import { useMemo } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { sliceTokens, splitLines, tokenize, type CodeLine, type TokenKind } from "@/lib/highlight";
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
  const allLines = useMemo(() => splitLines(tokens), [tokens]);
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
      {/*
       * Long lines wrap with a hanging indent instead of scrolling sideways.
       * The full code sits invisibly in the same grid cell so the window's
       * height is fixed from the start and doesn't jump while typing.
       */}
      <div
        aria-hidden
        className="grid p-5 font-mono text-[13px] leading-[22px] [overflow-wrap:anywhere] whitespace-pre-wrap"
      >
        <div className="invisible col-start-1 row-start-1 min-w-0">
          <Lines lines={allLines} />
        </div>
        <div className="col-start-1 row-start-1 min-w-0">
          <Lines lines={splitLines(shown)} caret={!done} />
        </div>
      </div>
    </figure>
  );
}

function Lines({ lines, caret = false }: { lines: CodeLine[]; caret?: boolean }) {
  return lines.map((line, i) => (
    <div
      key={i}
      className={cn("min-h-[22px]", caret && i === lines.length - 1 && "caret")}
      // First visual row starts at the code's indent; wrapped rows sit 2ch deeper.
      style={{ paddingLeft: `${line.indent + 2}ch`, textIndent: "-2ch" }}
    >
      {line.tokens.map((t, j) => (
        <span key={j} className={COLORS[t.kind]}>
          {t.text}
        </span>
      ))}
    </div>
  ));
}
