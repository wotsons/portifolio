import { Mail } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { buttonClasses } from "@/components/ui/Button";
import { profile } from "@/content/profile";
import { skills } from "@/content/skills";
import { Greeting, HeroCode, TypedTagline } from "./HeroClient";

function buildCode(role: string, location: string) {
  const stack = skills
    .slice(0, 4)
    .map((s) => JSON.stringify(s.name.split(" / ")[0]))
    .join(", ");
  return [
    "const developer = {",
    `  name: ${JSON.stringify(profile.name)},`,
    `  role: ${JSON.stringify(role)},`,
    `  location: ${JSON.stringify(location)},`,
    `  experience: ${JSON.stringify(`${profile.yearsOfExperience}+ years`)},`,
    `  stack: [${stack}],`,
    "  openToWork: true,",
    "};",
  ].join("\n");
}

const rise = (i: number) => ({
  animation: `rise 500ms var(--ease-out-expo) both`,
  animationDelay: `${i * 60}ms`,
});

export async function Hero() {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  const role = profile.role[locale];
  const [first, ...rest] = profile.name.split(" ");

  const socials = [
    { href: `https://github.com/${profile.github}`, label: "GitHub", Icon: GithubIcon },
    { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  ];

  return (
    <section
      id="home"
      aria-label={profile.name}
      className="relative flex min-h-screen items-center"
      style={{ padding: "96px var(--pad-right) 96px var(--pad-left)" }}
    >
      <div className="grid w-full max-w-[1200px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-12">
        <div className="flex flex-col gap-5">
          <p className="font-mono text-[13px] text-accent" style={rise(0)}>
            {t("prompt")}
          </p>
          <div style={rise(1)}>
            <Greeting />
          </div>
          <div style={rise(2)}>
            <h1 className="text-[clamp(44px,7vw,72px)] leading-[1.04] font-medium tracking-[-0.03em] text-fg">
              {first} <span className="text-accent">{rest.join(" ")}</span>
            </h1>
            <p aria-hidden className="mt-1 font-mono text-sm text-line-strong select-none">
              {"=".repeat(Math.min(profile.name.length + 4, 24))}
            </p>
            <p className="mt-3 font-mono text-[13px] text-fg-2">
              {role} <span className="text-muted">·</span> {profile.location[locale]}
            </p>
          </div>
          <div style={rise(3)}>
            <TypedTagline text={profile.tagline[locale]} />
          </div>
          <div className="flex flex-wrap gap-3 pt-2" style={rise(4)}>
            <a href="#work" className={buttonClasses("primary")}>
              {t("viewWork")}
            </a>
            <a
              href={profile.resume[locale]}
              download
              className={buttonClasses("secondary", "print:hidden")}
            >
              {t("resume")}
            </a>
          </div>
          <ul aria-label={t("social")} className="flex gap-5 pt-2" style={rise(5)}>
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="block text-muted transition-colors hover:text-accent"
                >
                  <Icon className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div style={rise(3)}>
          <HeroCode title={t("codeTitle")} code={buildCode(role, profile.location[locale])} />
        </div>
      </div>

      <a
        href="#work"
        className="absolute bottom-8 flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent max-[700px]:hidden"
        style={{ left: "var(--pad-left)" }}
      >
        <span className="inline-block animate-bounce">↓</span> {t("scroll")}
      </a>
    </section>
  );
}
