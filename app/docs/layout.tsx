import type { Metadata } from "next";
import type { ReactNode } from "react";

import { DocsSearch } from "@/components/documentation/search/docs-search";

export const metadata: Metadata = {
  title: {
    template: "%s | EternalCode.pl",
    default: "Documentation | EternalCode.pl",
  },
  description: "Focused guides and API references for every EternalCode project.",
};

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="docs-root">
      {children}
      <DocsSearch />
    </div>
  );
}
