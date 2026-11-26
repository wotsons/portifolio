import { Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { hasGithub, profile } from "@/content/profile";
import { getContributions, getRecentRepos, toWeeks } from "@/lib/github";
import { RelativeTime } from "./RelativeTime";
import { ScrollToEnd } from "./ScrollToEnd";

const LEVEL_BG = [
  "bg-raised",
  "bg-[color-mix(in_srgb,var(--accent)_25%,var(--color-raised))]",
  "bg-[color-mix(in_srgb,var(--accent)_50%,var(--color-raised))]",
  "bg-[color-mix(in_srgb,var(--accent)_75%,var(--color-raised))]",
  "bg-accent",
];

export async function GithubActivity() {
  const t = await getTranslations("profile");

  const [contributions, repos] = hasGithub
    ? await Promise.all([getContributions(profile.github), getRecentRepos(profile.github)])
    : [null, null];

  if (!contributions && !repos) {
    return <p className="text-sm text-muted">{t("githubUnavailable")}</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {contributions && (
        <div>
          <p className="mb-3 text-sm text-fg-2">
            {t("contributions", { count: contributions.total })}
          </p>
          <ScrollToEnd className="overflow-x-auto pb-2">
            <div
              className="flex w-max gap-[3px]"
              role="img"
              aria-label={t("contributions", { count: contributions.total })}
            >
              {toWeeks(contributions.days).map((week, w) => (
                <div key={w} className="flex flex-col gap-[3px]">
                  {week.map((day, d) => (
                    <span
                      key={d}
                      title={day ? `${day.date}: ${day.count}` : undefined}
                      className={`size-[10px] rounded-[2px] ${day ? LEVEL_BG[day.level] : "bg-transparent"}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </ScrollToEnd>
          <div
            aria-hidden
            className="mt-2 flex items-center gap-1 font-mono text-[11px] text-muted"
          >
            {t("less")}
            {LEVEL_BG.map((c) => (
              <span key={c} className={`size-[10px] rounded-[2px] ${c}`} />
            ))}
            {t("more")}
          </div>
        </div>
      )}

      {repos && repos.length > 0 && (
        <div>
          <p className="mono-label mb-3">{t("recentRepos")}</p>
          <ul className="flex flex-col">
            {repos.map((r) => (
              <li key={r.name}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="-mx-3 flex items-baseline gap-4 rounded-lg px-3 py-2.5 transition-colors hover:bg-raised"
                >
                  <span className="font-mono text-[13px] text-fg">{r.name}</span>
                  <span className="hidden min-w-0 flex-1 truncate text-sm text-muted sm:block">
                    {r.description}
                  </span>
                  <span className="ml-auto flex shrink-0 items-center gap-3 font-mono text-[11px] text-muted">
                    {r.language && <span>{r.language}</span>}
                    <span className="flex items-center gap-1">
                      <Star className="size-3" aria-hidden />
                      {r.stars}
                    </span>
                    <RelativeTime iso={r.pushedAt} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
