import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SideNav } from "@/components/layout/SideNav";
import { SkipLink } from "@/components/layout/SkipLink";
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
        {(["contact"] as const).map((id) => (
          <section key={id} id={id} className="section min-h-screen">
            {id}
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
