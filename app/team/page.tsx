import type { Metadata } from "next";
import { Suspense } from "react";
import { generateOgImageMetadata } from "@/components/og-image";
import Team from "@/components/team/team";
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

export default function TeamMembers() {
  return (
    <div className="team-page">
      <Suspense fallback={<TeamSkeleton />}>
        <Team />
      </Suspense>
    </div>
  );
}
