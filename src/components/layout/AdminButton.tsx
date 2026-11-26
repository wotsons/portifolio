"use client";

import { Bug } from "lucide-react";
import { useTranslations } from "next-intl";
import { emit } from "@/lib/events";

export function AdminButton({ label }: { label: string }) {
  const t = useTranslations("terminal");
  return (
    <button
      type="button"
      onClick={() =>
        emit("terminal:open", {
          lines: [{ text: t("adminAccess"), kind: "muted" }],
          message: t("accessDenied"),
        })
      }
      className="cursor-pointer transition-colors hover:text-negative"
    >
      {label}
    </button>
  );
}

export function HuntButton() {
  const t = useTranslations("games.hunt");
  return (
    <button
      type="button"
      onClick={() => emit("game:open", { game: "hunt" })}
      aria-label={t("title")}
      title={t("title")}
      className="cursor-pointer text-muted transition-colors hover:text-negative"
    >
      <Bug className="size-3.5" aria-hidden />
    </button>
  );
}
