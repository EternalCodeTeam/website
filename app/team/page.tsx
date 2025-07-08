import type { Metadata } from "next";

import Hero from "@/components/hero/Hero";
import { generateOgImageMetadata } from "@/components/OgImage";
import Team from "@/components/team/Team";

export const metadata: Metadata = {
  title: "EternalCode.pl | Team",
  description: "See our team members and their roles in our projects",
  ...generateOgImageMetadata({
    title: "Team",
    subtitle: "EternalCode.pl",
  }),
};

export default async function TeamMembers() {
  return (
    <main>
      <Hero />
      <Team />
    </main>
  );
}
