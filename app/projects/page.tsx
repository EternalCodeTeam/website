import Project from "@/components/projects/Projects";
import type { Metadata } from "next";
import Hero from "@/components/header/hero/Hero";
import { generateOgImageMetadata } from "@/components/OgImage";

export const dynamic = "force-dynamic";
export const fetchCache = "force-cache";

export const metadata: Metadata = {
  title: "EternalCode.pl | Projects",
  description: "See our open source projects",
  ...generateOgImageMetadata({
    title: "Our Projects",
    subtitle: "Open Source Solutions by EternalCode",
  }),
};

export default async function Projects() {
  return (
    <main>
      <Hero />
      <Project />
    </main>
  );
}
