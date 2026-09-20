import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { DocumentationPageLink } from "@/lib/documentation/navigation";

export function DocsPagination({
  next,
  previous,
}: {
  readonly next: DocumentationPageLink | null;
  readonly previous: DocumentationPageLink | null;
}) {
  if (!(previous || next)) {
    return null;
  }

  return (
    <nav aria-label="Documentation pagination" className="docs-pagination">
      {previous ? (
        <Link href={previous.url}>
          <ArrowLeft aria-hidden="true" size={16} />
          <span>
            <small>Previous</small>
            <strong>{previous.title}</strong>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.url}>
          <span>
            <small>Next</small>
            <strong>{next.title}</strong>
          </span>
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      ) : null}
    </nav>
  );
}
