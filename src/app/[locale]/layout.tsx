import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/layout/JsonLd";
import { profile } from "@/content/profile";
import { routing } from "@/i18n/routing";
import { geist, jetbrainsMono } from "@/lib/fonts";
import { themeInitScript } from "@/lib/theme";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0d1117",
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  const role = profile.role[locale];
  const title = t("title", { name: profile.name, role });
  const description = t("description", { name: profile.name, role });

  return {
    metadataBase: new URL(profile.siteUrl),
    title,
    icons: { icon: "/images/icon.svg" },
    description,
    authors: [{ name: profile.name, url: profile.siteUrl }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
        "x-default": `/${routing.defaultLocale}`,
      },
    },
    openGraph: {
      type: "profile",
      title,
      description,
      url: `/${locale}`,
      siteName: profile.name,
      locale: locale.replace("-", "_"),
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => l.replace("-", "_")),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${geist.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd locale={locale} />
      </head>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
