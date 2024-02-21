import About from "@/components/about/About";
import Faq from "@/components/faq/Faq";
import Features from "@/components/features/Features";

export const dynamic = "force-static";
export const fetchCache = "force-cache";

export const dynamic = "force-static";
export default function Home() {
  return (
    <main>
      <About />
      <Features />
      <Faq />
    </main>
  );
}
