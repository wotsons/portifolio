"use client";

import { useLocale, useTranslations } from "next-intl";
import { SECTIONS } from "@/content/sections";
import { profile } from "@/content/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn, pad3 } from "@/lib/utils";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function SideNav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const active = useActiveSection(SECTIONS);

  return (
    <nav
      id="side-nav"
      aria-label={t("label")}
      className="fixed top-1/2 left-6 z-10 -translate-y-1/2 max-[700px]:left-3 print:hidden"
    >
      <ul className="flex flex-col">
        {SECTIONS.map((id, i) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={cn(
                "flex h-8 items-center gap-2 font-mono text-xs leading-4 transition-colors duration-150",
                active === id ? "text-accent" : "text-muted hover:text-fg",
              )}
            >
              <span>{pad3(i + 1)}</span>
              <span className="max-[700px]:sr-only">{t(id)}</span>
            </a>
          </li>
        ))}
        <li className="mt-2 border-t border-line pt-2">
          <a
            href={profile.resume[locale]}
            download
            className="flex h-8 items-center gap-2 font-mono text-xs leading-4 text-muted transition-colors hover:text-accent"
          >
            <span aria-hidden>↓</span>
            <span className="max-[700px]:sr-only">{t("resume")}</span>
          </a>
        </li>
        <li>
          <LocaleSwitcher />
        </li>
      </ul>
    </nav>
  );
}
