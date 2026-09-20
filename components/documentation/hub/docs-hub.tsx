import { ArrowRight, MessagesSquare } from "lucide-react";
import Link from "next/link";

import { DOC_PROJECTS } from "@/lib/documentation/projects";

import { ProjectCard } from "./project-card";

export function DocsHub() {
  const productProjects = DOC_PROJECTS.slice(0, 3);
  const contribute = DOC_PROJECTS[3];
  const ContributeIcon = contribute.icon;

  return (
    <div className="docs-hub">
      <section aria-labelledby="docs-projects-title" className="docs-hub-section">
        <div className="docs-section-heading">
          <div>
            <p className="docs-kicker">CHOOSE YOUR PROJECT</p>
            <h2 id="docs-projects-title">Start where you are building.</h2>
          </div>
          <p>One documentation system. Navigation that stays focused on the active product.</p>
        </div>
        <div className="docs-project-grid">
          {productProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="docs-contribute-strip">
        <span className="docs-project-icon" data-accent="emerald">
          <ContributeIcon aria-hidden="true" size={22} />
        </span>
        <div>
          <p className="docs-kicker">MAKE IT BETTER</p>
          <h2>Documentation is part of the product.</h2>
          <p>{contribute.shortDescription}</p>
        </div>
        <Link href="/docs/contribute/guide">
          Contribution guide <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </section>

      <section className="docs-support-strip">
        <MessagesSquare aria-hidden="true" size={21} />
        <div>
          <strong>Still stuck?</strong>
          <span>Talk to maintainers and server owners on Discord.</span>
        </div>
        <a href="https://discord.gg/eternalcode" rel="noreferrer" target="_blank">
          Join the community <ArrowRight aria-hidden="true" size={16} />
        </a>
      </section>
    </div>
  );
}
