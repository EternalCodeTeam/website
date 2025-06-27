import { Metadata } from "next";

import { generateOgImageMetadata } from "@/components/OgImage";
import AnimatedHome from "@/components/page/home/AnimatedHome";

export const dynamic = "force-static";
export const fetchCache = "force-cache";

export const metadata: Metadata = {
  title: "Home",
  description:
    "EternalCode.pl delivers open source projects with a focus on quality, performance, and innovation.",
  alternates: {
    canonical: "https://eternalcode.pl",
  },
  ...generateOgImageMetadata({
    title: "Home",
    subtitle: "EternalCode.pl",
  }),
};

export default function Home() {
  return <AnimatedHome />;
}
