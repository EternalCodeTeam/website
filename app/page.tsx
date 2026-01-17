import type { Metadata } from "next";

import AnimatedHome from "@/components/home/animated-home";

export const dynamic = "force-static";
export const fetchCache = "force-cache";

export const metadata: Metadata = {
  title: "Home",
  description:
    "EternalCode.pl delivers open source projects with a focus on quality, performance, and innovation.",
  alternates: {
    canonical: "https://eternalcode.pl",
  },
  openGraph: {
    title: "EternalCode.pl | We are a team creating open source projects!",
    description:
      "EternalCode.pl delivers open source solutions with a focus on quality, performance, and innovation.",
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
      "EternalCode.pl delivers open source solutions with a focus on quality, performance, and innovation.",
    images: ["/opengraph-image"],
  },
};

export default function Home() {
  return <AnimatedHome />;
}
