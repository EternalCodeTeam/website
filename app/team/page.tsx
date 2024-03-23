import Team from "@/components/team/Team";
import type { Metadata } from "next";

export const dynamic = "auto";
export const fetchCache = "force-cache";

export const metadata: Metadata = {
  title: "EternalCode.pl | Team",
  description: "See our team members and their roles in our projects",
};

export default async function TeamMembers() {
  return (
    <main>
      <Team />
    </main>
  );
}
