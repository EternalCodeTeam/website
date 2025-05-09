import Project from "@/components/projects/Projects";
import type { Metadata } from "next";
import Hero from "@/components/header/hero/Hero";

export const dynamic = "force-dynamic";
export const fetchCache = "force-cache";

export const metadata: Metadata = {
  title: "EternalCode.pl | Projects",
  description: "See our open source projects",
};

export default async function Projects() {
  return (
    <main>
      <Hero />
      <Project />
    </main>
  );
}
