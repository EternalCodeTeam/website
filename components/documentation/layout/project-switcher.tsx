import { ChevronDown } from "lucide-react";
import Link from "next/link";

import {
  DOC_PROJECTS,
  type DocProjectSlug,
  getProject,
  getProjectEntryUrl,
} from "@/lib/documentation/projects";

export function ProjectSwitcher({ project }: { readonly project: DocProjectSlug }) {
  const current = getProject(project);
  const CurrentIcon = current?.icon;

  return (
    <details className="docs-project-switcher">
      <summary>
        <span>
          {CurrentIcon ? <CurrentIcon aria-hidden="true" size={17} /> : null}
          <span>
            <small>Documentation</small>
            <strong>{current?.name}</strong>
          </span>
        </span>
        <ChevronDown aria-hidden="true" size={16} />
      </summary>
      <div className="docs-project-switcher-menu">
        {DOC_PROJECTS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              aria-current={item.slug === project ? "page" : undefined}
              href={getProjectEntryUrl(item.slug)}
              key={item.slug}
            >
              <Icon aria-hidden="true" size={16} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </details>
  );
}
