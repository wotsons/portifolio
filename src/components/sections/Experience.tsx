import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/content/experience";

export async function Experience() {
  const t = await getTranslations("experience");
  const locale = await getLocale();
  const format = await getFormatter();

  const month = (ym: string) =>
    format.dateTime(new Date(`${ym}-01T12:00:00Z`), { month: "short", year: "numeric" });

  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <SectionHeading id="experience" title={t("title")} subtitle={t("subtitle")} />

      <ol className="relative border-l border-line">
        {experience.map((job, i) => (
          <li key={`${job.company}-${job.start}`} className="reveal relative pb-12 pl-8 last:pb-0">
            <span
              aria-hidden
              className={`absolute top-1.5 -left-[5px] size-[9px] rounded-full border ${
                i === 0 && !job.end
                  ? "border-accent bg-accent shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_20%,transparent)]"
                  : "border-line-strong bg-bg"
              }`}
            />
            <p className="font-mono text-xs leading-4 text-muted">
              <time dateTime={job.start}>{month(job.start)}</time>
              {" — "}
              {job.end ? (
                <time dateTime={job.end}>{month(job.end)}</time>
              ) : (
                <span className="text-accent">{t("present")}</span>
              )}
              <span className="mx-2">·</span>
              {job.location[locale]}
            </p>
            <h3 className="mt-2 text-xl leading-7 font-medium text-fg">
              {job.role[locale]} <span className="text-muted">@</span>{" "}
              {job.companyUrl ? (
                <a
                  href={job.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline"
                >
                  {job.company}
                </a>
              ) : (
                <span className="text-accent">{job.company}</span>
              )}
            </h3>
            <ul className="mt-3 flex max-w-[68ch] flex-col gap-2">
              {job.highlights[locale].map((h) => (
                <li key={h} className="flex gap-3 text-fg-2">
                  <span aria-hidden className="font-mono text-accent">
                    &gt;
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {job.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-md border border-line bg-raised px-2 py-0.5 font-mono text-[11px] leading-4 text-fg-2"
                >
                  {s}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
