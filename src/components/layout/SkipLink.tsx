import { getTranslations } from "next-intl/server";

export async function SkipLink() {
  const t = await getTranslations("nav");
  return (
    <a
      href="#work"
      className="fixed top-3 left-3 z-[60] -translate-y-16 rounded-lg bg-accent px-3 py-2 font-mono text-xs text-accent-ink transition-transform focus:translate-y-0 print:hidden"
    >
      {t("skip")}
    </a>
  );
}
