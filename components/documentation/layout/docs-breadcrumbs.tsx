import { ChevronRight } from "lucide-react";
import Link from "next/link";

import type { DocProject } from "@/lib/documentation/projects";

export function DocsBreadcrumbs({
  group,
  project,
  title,
}: {
  readonly group?: string;
  readonly project: DocProject;
  readonly title: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="docs-breadcrumbs">
      <Link href="/docs">Docs</Link>
      <ChevronRight aria-hidden="true" size={13} />
      <span>{project.name}</span>
      {group ? (
        <>
          <ChevronRight aria-hidden="true" size={13} />
          <span>{group}</span>
        </>
      ) : null}
      <ChevronRight aria-hidden="true" size={13} />
      <span aria-current="page">{title}</span>
    </nav>
  );
}
