import type { Metadata } from "next";
import { generateOgImageMetadata } from "@/components/og-image";
import { DocsView } from "./view";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Browse our comprehensive documentation for all EternalCode projects",
  ...generateOgImageMetadata({
    title: "Documentation",
    subtitle: "Browse our comprehensive guides and references",
  }),
};

export default function DocsPage() {
  return <DocsView />;
}
