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
};

export default function Home() {
  return <AnimatedHome />;
}
