import Project from "@/components/projects/Projects";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const fetchCache = "force-cache";

export const metadata: Metadata = {
  title: "EternalCode.pl | Projects",
  description: "See our open source projects",
};

export default function Projects() {
  return (
    <main>
      <Project />
    </main>
  );
}
