"use client";

import { useTranslations } from "next-intl";
import { emit } from "@/lib/events";

export function AdminButton({ label }: { label: string }) {
  const t = useTranslations("terminal");
  return (
    <button
      type="button"
      onClick={() => emit("terminal:open", { message: t("accessDenied") })}
      className="cursor-pointer transition-colors hover:text-negative"
    >
      {label}
    </button>
  );
}
