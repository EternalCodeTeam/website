import type { Metadata } from "next";

import { generateOgImageMetadata } from "@/components/OgImage";
import Hero from "@/components/page/header/Hero";
import Project from "@/components/page/projects/Projects";

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
