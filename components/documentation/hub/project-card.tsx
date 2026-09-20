import { ArrowRight } from "lucide-react";
import Link from "next/link";

import {
  createProjectUrl,
  type DocProject,
  type DocProjectSlug,
  getProjectEntryUrl,
} from "@/lib/documentation/projects";

export function ProjectCard({ project }: { readonly project: DocProject }) {
  const Icon = project.icon;
  const projectSlug = project.slug as DocProjectSlug;

  return (
    <article
      className="docs-project-card"
      data-accent={project.accent}
      data-doc-project={project.slug}
    >
      <div className="docs-project-card-topline">
        <span className="docs-project-icon">
          <Icon aria-hidden="true" size={22} />
        </span>
        <span className="docs-project-label">Open source</span>
      </div>
      <div>
        <h2>{project.name}</h2>
        <p>{project.shortDescription}</p>
      </div>
      <div className="docs-project-links">
        {project.quickLinks.map((link) => (
          <Link href={createProjectUrl(projectSlug, link.slug)} key={link.label}>
            {link.label}
          </Link>
        ))}
      </div>
      <Link className="docs-project-primary" href={getProjectEntryUrl(projectSlug)}>
        Explore {project.name}
        <ArrowRight aria-hidden="true" size={17} />
      </Link>
    </article>
  );
}
