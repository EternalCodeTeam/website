import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Explorer | EternalCode Team",
  description:
    "Access stable releases and development builds for all EternalCode Team projects. Download the latest versions of EternalCore, EternalCombat, and more.",
  alternates: {
    canonical: "https://eternalcode.pl/builds",
  },
  keywords: [
    "minecraft",
    "plugins",
    "builds",
    "downloads",
    "eternalcore",
    "eternalcombat",
    "releases",
    "development builds",
  ],
  openGraph: {
    title: "Build Explorer | EternalCode Team",
    description: "Access stable releases and development builds for all EternalCode Team projects.",
    type: "website",
  },
};

export default function BuildsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
