"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS: Record<Locale, { short: string; name: string }> = {
  "pt-BR": { short: "pt", name: "Português" },
  en: { short: "en", name: "English" },
};

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const current = useLocale();

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn("flex h-8 items-center gap-1 font-mono text-xs leading-4", className)}
    >
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          {i > 0 && (
            <span aria-hidden className="text-line-strong">
              /
            </span>
          )}
          <Link
            href="/"
            locale={locale}
            hrefLang={locale}
            aria-current={locale === current ? "true" : undefined}
            aria-label={t("switchTo", { language: LABELS[locale].name })}
            className={cn(
              "transition-colors",
              locale === current ? "text-accent" : "text-muted hover:text-fg",
            )}
          >
            {LABELS[locale].short}
          </Link>
        </span>
      ))}
    </div>
  );
}
