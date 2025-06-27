import type { Metadata } from "next";

import { generateOgImageMetadata } from "@/components/OgImage";
import Hero from "@/components/page/header/Hero";
import Team from "@/components/page/team/Team";

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
