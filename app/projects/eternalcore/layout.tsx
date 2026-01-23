import type { Metadata } from "next";
import { SoftwareApplicationSchema } from "@/components/seo/software-application-schema";

export const metadata: Metadata = {
  title: "EternalCore | Minecraft Server Plugin",
  description:
    "EternalCore is a modern, high-performance Minecraft server plugin providing essential commands and features for your server. Built with quality and performance in mind.",
  alternates: {
    canonical: "https://eternalcode.pl/projects/eternalcore",
  },
  openGraph: {
    title: "EternalCore | Minecraft Server Plugin",
    description:
      "Modern, high-performance Minecraft server plugin with essential commands and features for your server.",
    url: "https://eternalcode.pl/projects/eternalcore",
    type: "website",
  },
};

export default function EternalCoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SoftwareApplicationSchema
        applicationCategory="DeveloperApplication"
        description="EternalCore is a modern, high-performance Minecraft server plugin providing essential commands and features for your server. Built with quality and performance in mind."
        downloadUrl="https://eternalcode.pl/builds"
        name="EternalCore"
        operatingSystem="Java"
        url="https://eternalcode.pl/projects/eternalcore"
      />
      {children}
    </>
  );
}
