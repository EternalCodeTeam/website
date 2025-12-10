import type { Metadata } from "next";
import { generateOgImageMetadata } from "@/components/OgImage";
import Team from "@/components/team/Team";
import TeamHero from "@/components/team/TeamHero";

export const metadata: Metadata = {
  title: "EternalCode.pl | Team",
  description: "See our team members and their roles in our projects",
  ...generateOgImageMetadata({
    title: "Team",
    subtitle: "EternalCode.pl",
  }),
};

import { FacadePattern } from "@/components/ui/facade-pattern";

export default async function TeamMembers() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        {/* Top Center - Hero backing */}
        <div className="-top-20 -translate-x-1/2 absolute left-1/2 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-3xl filter dark:bg-blue-500/5" />
        {/* Team Area - Purple/Pink spread */}
        <div className="-translate-x-1/3 absolute top-[40%] left-0 h-[800px] w-[800px] rounded-full bg-purple-500/10 mix-blend-multiply blur-3xl filter dark:bg-purple-500/5 dark:mix-blend-screen" />
        {/* Bottom Right - Cyan accent */}
        <div className="absolute right-0 bottom-0 h-[600px] w-[600px] translate-x-1/3 rounded-full bg-cyan-500/10 mix-blend-multiply blur-3xl filter dark:bg-cyan-500/5 dark:mix-blend-screen" />

        <FacadePattern className="absolute inset-0 h-full opacity-30 dark:opacity-10" />
      </div>

      <div className="relative z-10">
        <TeamHero />
        <Team />
      </div>
    </main>
  );
}
