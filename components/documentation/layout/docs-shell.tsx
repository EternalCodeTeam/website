import type { ReactNode } from "react";

import type { DocumentationPageLink } from "@/lib/documentation/navigation";
import type { DocProject, DocProjectSlug } from "@/lib/documentation/projects";

import { ArticleActions } from "./article-actions";
import { DocsBreadcrumbs } from "./docs-breadcrumbs";
import { DocsPagination } from "./docs-pagination";
import { DocsSidebar } from "./docs-sidebar";
import { MobileDocsNav } from "./mobile-docs-nav";

export function DocsShell({
  activeUrl,
  children,
  description,
  editUrl,
  group,
  next,
  previous,
  project,
  projectSlug,
  title,
}: {
  readonly activeUrl: string;
  readonly children: ReactNode;
  readonly description: string;
  readonly editUrl: string;
  readonly group?: string;
  readonly next: DocumentationPageLink | null;
  readonly previous: DocumentationPageLink | null;
  readonly project: DocProject;
  readonly projectSlug: DocProjectSlug;
  readonly title: string;
}) {
  const sidebar = <DocsSidebar activeUrl={activeUrl} project={projectSlug} />;

  return (
    <div className="docs-reading-layout">
      <div className="docs-desktop-sidebar">{sidebar}</div>
      <main className="docs-article">
        <MobileDocsNav>{sidebar}</MobileDocsNav>
        <DocsBreadcrumbs group={group} project={project} title={title} />
        <header className="docs-article-header">
          <p className="docs-kicker">{project.name.toUpperCase()} / GUIDE</p>
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
          <ArticleActions editUrl={editUrl} />
        </header>
        <article className="docs-prose">{children}</article>
        <DocsPagination next={next} previous={previous} />
      </main>
    </div>
  );
}
