import About from "@/components/about/About";
import Faq from "@/components/faq/Faq";
import Features from "@/components/features/Features";
import Hero from "@/components/header/hero/Hero";
import { Metadata } from "next";
import { generateOgImageMetadata } from "@/components/OgImage";

export const dynamic = "force-static";
export const fetchCache = "force-cache";

export const metadata: Metadata = {
  title: "Home",
  description:
    "EternalCode.pl delivers open source projects with a focus on quality, performance, and innovation.",
  alternates: {
    canonical: "https://eternalcode.pl",
  },
  ...generateOgImageMetadata({
    title: "Home",
    subtitle: "EternalCode.pl",
  }),
};

export default async function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <About />
      <Features />
      <Faq />
    </main>
  );
}
