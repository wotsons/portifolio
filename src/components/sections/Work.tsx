import { ExternalLink } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import GithubIcon from "@/assets/icons/github.svg?react";
import { FlipCard } from "@/components/ui/FlipCard";
import { ProjectPreview } from "@/components/ui/ProjectPreview";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";
import type { ProjectStatus } from "@/content/types";
import { cn, pad3 } from "@/lib/utils";
import { WorkCarousel } from "./WorkCarousel";

const MAX_TAGS = 4;

const STATUS_STYLES: Record<ProjectStatus, string> = {
  production: "text-accent border-[color-mix(in_srgb,var(--accent)_35%,transparent)]",
  development: "text-[#f7c87a] border-[#f7c87a]/35",
  archived: "text-muted border-line-strong",
};

export async function Work() {
  const t = await getTranslations("work");
  const locale = await getLocale();

  return (
    <section id="work" aria-labelledby="work-title">
      <WorkCarousel
        hint={t("hint")}
        heading={<SectionHeading id="work" title={t("title")} subtitle={t("subtitle")} />}
      >
        {projects.map((p, i) => (
          <li key={p.slug} className="snap-start">
            <FlipCard
              className="h-[460px] w-[360px] max-[440px]:w-[calc(100vw-96px)]"
              flipLabel={t("flip")}
              flipBackLabel={t("flipBack")}
              front={
                <>
                  <div className="-mx-6 -mt-6">
                    <ProjectPreview kind={p.preview} image={p.image} alt={p.title} />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="mono-label">project_{pad3(i + 1).slice(1)}</p>
                    <span
                      className={cn(
                        "rounded-md border px-2 py-0.5 font-mono text-[11px] leading-4",
                        STATUS_STYLES[p.status],
                      )}
                    >
                      {t(`status.${p.status}`)}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl leading-7 font-medium text-fg">{p.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-fg-2">
                    {p.summary[locale]}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {p.stack.slice(0, MAX_TAGS).map((s) => (
                      <li
                        key={s}
                        className="rounded-md bg-raised px-2 py-0.5 font-mono text-[11px] leading-4 text-fg-2"
                      >
                        {s}
                      </li>
                    ))}
                    {p.stack.length > MAX_TAGS && (
                      <li className="px-1 py-0.5 font-mono text-[11px] leading-4 text-muted">
                        +{p.stack.length - MAX_TAGS}
                      </li>
                    )}
                  </ul>
                  <div className="mt-4 flex gap-5 border-t border-line pt-3 font-mono text-xs">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-fg-2 transition-colors hover:text-accent"
                      >
                        <ExternalLink className="size-3.5" aria-hidden /> {t("live")}
                      </a>
                    )}
                    {p.sourceUrl && (
                      <a
                        href={p.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-fg-2 transition-colors hover:text-accent"
                      >
                        <GithubIcon aria-hidden className="size-3.5" /> {t("source")}
                      </a>
                    )}
                  </div>
                </>
              }
              back={
                <>
                  <p className="mono-label text-accent">{t("breakdown")}</p>
                  <h3 className="mt-4 text-lg font-medium text-fg">{p.title}</h3>
                  <dl className="mt-4 flex flex-col gap-4 text-sm">
                    <div>
                      <dt className="mono-label mb-1">{t("stack")}</dt>
                      <dd className="text-fg-2">{p.stack.join(" · ")}</dd>
                    </div>
                    <div>
                      <dt className="mono-label mb-1">{t("challenge")}</dt>
                      <dd className="text-fg-2">{p.challenge[locale]}</dd>
                    </div>
                    <div>
                      <dt className="mono-label mb-1">{t("impact")}</dt>
                      <dd className="text-fg">{p.impact[locale]}</dd>
                    </div>
                  </dl>
                </>
              }
            />
          </li>
        ))}
      </WorkCarousel>
    </section>
  );
}
