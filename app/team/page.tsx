import Team from "@/components/team/Team";
import type { Metadata } from "next";
import Hero from "@/components/header/hero/Hero";

export const metadata: Metadata = {
  title: "EternalCode.pl | Team",
  description: "See our team members and their roles in our projects",
};

export default async function TeamMembers() {
  return (
    <main>
      <Hero />
      <Team />
    </main>
  );
}
