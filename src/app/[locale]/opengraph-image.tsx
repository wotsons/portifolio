import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { profile } from "@/content/profile";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — portfolio`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 96,
        background: "#0d1117",
        color: "#e6edf3",
        fontFamily: "monospace",
      }}
    >
      <div style={{ fontSize: 28, color: "#2dd4bf" }}>$ whoami</div>
      <div style={{ fontSize: 88, fontWeight: 600, marginTop: 24, letterSpacing: -2 }}>
        {profile.name}
      </div>
      <div style={{ fontSize: 40, color: "#a3b1bd", marginTop: 16 }}>{profile.role[locale]}</div>
      <div
        style={{
          display: "flex",
          marginTop: 56,
          height: 6,
          width: 180,
          background: "#2dd4bf",
          borderRadius: 3,
        }}
      />
    </div>,
    size,
  );
}
