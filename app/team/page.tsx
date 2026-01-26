import type { Metadata } from "next";
import { Suspense } from "react";
import { generateOgImageMetadata } from "@/components/og-image";
import Team from "@/components/team/team";
import TeamHero from "@/components/team/team-hero";
import TeamSkeleton from "@/components/team/team-skeleton";

export const metadata: Metadata = {
  title: "EternalCode.pl | Team",
  description:
    "Meet the talented developers and contributors behind EternalCode projects. Learn about our team members, their expertise, and their roles in building quality open source software.",
  alternates: {
    canonical: "https://eternalcode.pl/team",
  },
  ...generateOgImageMetadata({
    title: "Team",
    subtitle: "EternalCode.pl",
  }),
};

import { FacadePattern } from "@/components/ui/facade-pattern";

export default function TeamMembers() {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        {/* Top Center - Hero backing */}
        <div className="absolute -top-20 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-2xl filter dark:bg-blue-500/5 dark:blur-3xl" />
        {/* Team Area - Purple/Pink spread */}
        <div className="absolute top-[40%] left-0 h-[800px] w-[800px] -translate-x-1/3 rounded-full bg-purple-500/10 blur-2xl filter dark:bg-purple-500/5 dark:blur-3xl" />
        {/* Bottom Right - Cyan accent */}
        <div className="absolute right-0 bottom-0 h-[600px] w-[600px] translate-x-1/3 rounded-full bg-cyan-500/10 blur-2xl filter dark:bg-cyan-500/5 dark:blur-3xl" />

        <FacadePattern className="absolute inset-0 h-full opacity-30 dark:opacity-10" />
      </div>

      <div className="relative z-10 pt-28 md:pt-32">
        <TeamHero />
        <Suspense fallback={<TeamSkeleton />}>
          <Team />
        </Suspense>
      </div>
    </div>
  );
}
