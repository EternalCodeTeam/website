import type { Metadata } from "next";

import { DocsHub } from "@/components/documentation/hub/docs-hub";
import { generateOgImageMetadata } from "@/components/og-image";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Browse comprehensive documentation for all EternalCode projects including EternalCore, EternalCombat, and Multification. Find guides, API references, and configuration examples.",
  alternates: {
    canonical: "https://eternalcode.pl/docs",
  },
  ...generateOgImageMetadata({
    title: "Documentation",
    subtitle: "Browse our comprehensive guides and references",
  }),
};

export default function DocsPage() {
  return <DocsHub />;
}
