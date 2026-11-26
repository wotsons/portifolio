import type { Locale } from "@/i18n/routing";
import { profile } from "@/content/profile";
import { skills } from "@/content/skills";

export function JsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role[locale],
    description: profile.tagline[locale],
    url: `${profile.siteUrl}/${locale}`,
    email: `mailto:${profile.email}`,
    sameAs: [`https://github.com/${profile.github}`, profile.linkedin],
    knowsAbout: skills.map((s) => s.name),
  };
  return (
    <script
      type="application/ld+json"
      // Escape `<` so the JSON can't close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
