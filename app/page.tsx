import type { Metadata } from "next";

import AnimatedHome from "@/components/animated-home";
import { getCommunityStats } from "@/lib/stats/community-stats";

// Prerendered, then refreshed hourly so the Modrinth/bStats numbers stay current.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Home",
  description:
    "EternalCode.pl delivers high-quality open source Minecraft server plugins including EternalCore and EternalCombat. Built with focus on performance and innovation.",
  alternates: {
    canonical: "https://eternalcode.pl",
  },
  openGraph: {
    title: "EternalCode.pl | We are a team creating open source projects!",
    description:
      "EternalCode.pl delivers high-quality open source Minecraft server plugins including EternalCore and EternalCombat. Built with focus on performance and innovation.",
    url: "https://eternalcode.pl",
    siteName: "EternalCode.pl",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "EternalCode.pl",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EternalCode.pl | We are a team creating open source projects!",
    description:
      "EternalCode.pl delivers high-quality open source Minecraft server plugins including EternalCore and EternalCombat. Built with focus on performance and innovation.",
    images: ["/opengraph-image"],
  },
};

export default async function Home() {
  const stats = await getCommunityStats();

  return <AnimatedHome stats={stats} />;
}
