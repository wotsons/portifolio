import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/content/profile";
import { ContactForm } from "./ContactForm";

export async function Contact() {
  const t = await getTranslations("contact");

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <SectionHeading id="contact" title={t("title")} />
      <div className="reveal mb-10 flex flex-col gap-2 font-mono text-[13px]">
        <p className="text-fg-2">
          <span className="text-accent">&gt;</span> {t("intro")}
        </p>
        <p className="text-fg-2">
          <span className="text-accent">&gt;</span> {t("emailLabel")}{" "}
          <a
            href={`mailto:${profile.email}`}
            className="text-fg underline-offset-4 hover:text-accent hover:underline"
          >
            {profile.email}
          </a>
        </p>
      </div>
      <ContactForm email={profile.email} />
    </section>
  );
}
