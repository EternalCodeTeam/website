import type { Metadata } from "next";

import Hero from "@/components/hero/Hero";
import { generateOgImageMetadata } from "@/components/OgImage";
import Project from "@/components/projects/Projects";

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
