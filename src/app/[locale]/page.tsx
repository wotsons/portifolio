import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("nav");
  return <main>{t("home")}</main>;
}
