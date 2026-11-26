"use client";

import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";
import { CodeWindow } from "@/components/ui/CodeWindow";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useBootDone } from "@/lib/boot";
import { cn } from "@/lib/utils";

const noop = () => () => {};

function useGreetingKey() {
  return useSyncExternalStore(
    noop,
    () => {
      const h = new Date().getHours();
      return h < 12 ? "morning" : h < 18 ? "afternoon" : "evening";
    },
    () => null,
  );
}

export function Greeting() {
  const t = useTranslations("hero.greeting");
  const key = useGreetingKey();
  return <p className="min-h-5 font-mono text-[13px] leading-5 text-muted">{key ? t(key) : ""}</p>;
}

export function TypedTagline({ text }: { text: string }) {
  const ready = useBootDone();
  const { visible, done } = useTypewriter(text, { speed: 32, delay: 450, enabled: ready });
  return (
    <p className="max-w-[46ch] text-xl leading-7 text-fg-2">
      <span className="sr-only">{text}</span>
      <span aria-hidden className={cn(!done && "caret")}>
        {text.slice(0, visible)}
      </span>
    </p>
  );
}

export function HeroCode({ title, code }: { title: string; code: string }) {
  const ready = useBootDone();
  return <CodeWindow title={title} code={code} start={ready} />;
}
