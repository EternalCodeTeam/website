import About from "@/components/about/About";
import Faq from "@/components/faq/Faq";
import Features from "@/components/features/Features";
import Hero from "@/components/header/hero/Hero";

export const dynamic = "force-static";
export const fetchCache = "force-cache";

export default async function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Features />
      <Faq />
    </main>
  );
}
