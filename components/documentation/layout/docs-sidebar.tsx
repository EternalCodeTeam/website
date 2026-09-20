import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { getProjectNavigation } from "@/lib/documentation/navigation";
import type { DocProjectSlug } from "@/lib/documentation/projects";

import { ProjectSwitcher } from "./project-switcher";

export function DocsSidebar({
  activeUrl,
  project,
}: {
  readonly activeUrl: string;
  readonly project: DocProjectSlug;
}) {
  const navigation = getProjectNavigation(project);

  return (
    <aside className="docs-sidebar" data-lenis-prevent>
      <ProjectSwitcher project={project} />
      <button className="docs-sidebar-search" data-docs-search-trigger type="button">
        <span>Search documentation</span>
        <kbd>⌘ K</kbd>
      </button>
      <nav aria-label="Project documentation">
        {navigation.map((item) =>
          item.type === "page" ? (
            <Link
              aria-current={item.url === activeUrl ? "page" : undefined}
              className="docs-sidebar-link"
              href={item.url}
              key={item.url}
            >
              {item.title}
            </Link>
          ) : (
            <div className="docs-sidebar-group" key={item.slug}>
              <p>
                <ChevronRight aria-hidden="true" size={13} /> {item.title}
              </p>
              {item.children.map((child) => (
                <Link
                  aria-current={child.url === activeUrl ? "page" : undefined}
                  className="docs-sidebar-link docs-sidebar-child"
                  href={child.url}
                  key={child.url}
                >
                  {child.title}
                </Link>
              ))}
            </div>
          )
        )}
      </nav>
    </aside>
  );
}
