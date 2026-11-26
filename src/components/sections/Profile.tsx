import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { GithubActivity } from "@/components/github/GithubActivity";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBar } from "@/components/ui/SkillBar";
import { profile } from "@/content/profile";
import { highlights, skills } from "@/content/skills";

export async function Profile() {
  const t = await getTranslations("profile");
  const locale = await getLocale();

  return (
    <section id="profile" aria-labelledby="profile-title" className="section">
      <SectionHeading id="profile" label={t("label")} title={t("title")} />

      <div className="flex max-w-[62ch] flex-col gap-4 text-[17px] leading-7 text-fg-2">
        {profile.bio[locale].map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-2 gap-12 max-[900px]:grid-cols-1">
        <div>
          <h3 className="mono-label mb-5 text-accent">{t("highlights")}</h3>
          <ul className="grid gap-3">
            {highlights.map((h) => (
              <li
                key={h.detail.en}
                className="rounded-xl border border-line bg-card p-5 transition-colors hover:border-line-strong"
              >
                <p className="flex items-baseline justify-between gap-4">
                  <span className="font-medium text-fg">{h.title[locale]}</span>
                  <span className="font-mono text-xs text-muted">{h.year}</span>
                </p>
                <p className="mt-1 text-sm text-fg-2">{h.detail[locale]}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mono-label mb-5 text-accent">{t("skills")}</h3>
          <div className="flex flex-col gap-5">
            {skills.map((s) => (
              <SkillBar
                key={s.name}
                name={s.name}
                level={s.level}
                loadingLabel={t("skillLoading")}
                doneLabel={t("skillDone")}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="mono-label mb-5 text-accent">{t("github")}</h3>
        <Suspense
          fallback={<p className="caret font-mono text-xs text-muted">{t("skillLoading")}</p>}
        >
          <GithubActivity />
        </Suspense>
      </div>
    </section>
  );
}
