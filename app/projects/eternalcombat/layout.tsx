import type { Metadata } from "next";
import { SoftwareApplicationSchema } from "@/components/seo/software-application-schema";

export const metadata: Metadata = {
  title: "EternalCombat | Advanced PvP & Combat Plugin",
  description:
    "EternalCombat is an advanced Minecraft PvP and combat system plugin offering extensive customization, modern features, and seamless performance for competitive gameplay.",
  alternates: {
    canonical: "https://eternalcode.pl/projects/eternalcombat",
  },
  openGraph: {
    title: "EternalCombat | Advanced PvP & Combat Plugin",
    description:
      "Advanced Minecraft PvP and combat system with extensive customization and modern features for competitive gameplay.",
    url: "https://eternalcode.pl/projects/eternalcombat",
    type: "website",
  },
};

export default function EternalCombatLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SoftwareApplicationSchema
        applicationCategory="DeveloperApplication"
        description="EternalCombat is an advanced Minecraft PvP and combat system plugin offering extensive customization, modern features, and seamless performance for competitive gameplay."
        downloadUrl="https://eternalcode.pl/builds"
        name="EternalCombat"
        operatingSystem="Java"
        url="https://eternalcode.pl/projects/eternalcombat"
      />
      {children}
    </>
  );
}
