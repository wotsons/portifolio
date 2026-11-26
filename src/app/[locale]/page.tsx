import { Effects } from "@/components/effects/Effects";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SideNav } from "@/components/layout/SideNav";
import { SkipLink } from "@/components/layout/SkipLink";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Profile } from "@/components/sections/Profile";
import { Work } from "@/components/sections/Work";

export default async function HomePage() {
  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <SideNav />
      <main>
        <Hero />
        <Work />
        <Profile />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <Effects />
    </>
  );
}
