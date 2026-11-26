import { getTranslations } from "next-intl/server";
import { cacheLife } from "next/cache";
import { profile } from "@/content/profile";
import { AdminButton } from "./AdminButton";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const t = await getTranslations("footer");
  const year = await currentYear();

  return (
    <footer
      id="site-footer"
      className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line font-mono text-xs leading-4 text-muted"
      style={{ padding: "32px var(--pad-right) 96px var(--pad-left)" }}
    >
      <span>
        © {year} {profile.name}
      </span>
      <span>{t("built")}</span>
      <a
        href={profile.sourceRepo}
        target="_blank"
        rel="noreferrer"
        className="transition-colors hover:text-accent"
      >
        {t("viewSource")}
      </a>
      <AdminButton label={t("admin")} />
      <span className="max-[700px]:hidden">{t("hint")}</span>
    </footer>
  );
}
