import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SideNav } from "@/components/layout/SideNav";
import { SkipLink } from "@/components/layout/SkipLink";

export default async function HomePage() {
  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <SideNav />
      <main>
        {(["home", "work", "profile", "experience", "contact"] as const).map((id) => (
          <section key={id} id={id} className="section min-h-screen">
            {id}
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
