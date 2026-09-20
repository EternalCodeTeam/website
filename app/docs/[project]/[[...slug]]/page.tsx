import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { DocsShell } from "@/components/documentation/layout/docs-shell";
import { getMDXComponents } from "@/components/documentation/mdx/components";
import { getAdjacentPages } from "@/lib/documentation/navigation";
import { getProject, getProjectEntryUrl, isProjectSlug } from "@/lib/documentation/projects";
import { source } from "@/lib/documentation/source";

interface DocumentationPageProps {
  readonly params: Promise<{
    project: string;
    slug?: string[];
  }>;
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    project: page.slugs[0],
    slug: page.slugs.slice(1),
  }));
}

export async function generateMetadata({ params }: DocumentationPageProps): Promise<Metadata> {
  const { project, slug = [] } = await params;
  const page = source.getPage([project, ...slug]);

  if (!page) {
    return { title: "Documentation not found" };
  }

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical: page.url },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: "article",
      url: page.url,
      images: [`/api/og/${page.slugs.join("/")}`],
    },
  };
}

export default async function DocumentationPage({ params }: DocumentationPageProps) {
  const { project: rawProject, slug = [] } = await params;

  if (!isProjectSlug(rawProject)) {
    notFound();
  }

  const project = getProject(rawProject);
  if (!project) {
    notFound();
  }

  if (slug.length === 0 && project.entrySlug.length > 0) {
    redirect(getProjectEntryUrl(rawProject));
  }

  const page = source.getPage([rawProject, ...slug]);
  if (!page || page.data.draft) {
    notFound();
  }

  const Content = page.data.body;
  const adjacent = getAdjacentPages(rawProject, page.slugs);
  const group = page.slugs.length > 2 ? page.slugs[1] : undefined;
  const contentPath =
    slug.length === 0
      ? `content/docs/${rawProject}/index.mdx`
      : `content/docs/${[rawProject, ...slug].join("/")}.mdx`;
  const editUrl = `https://github.com/EternalCodeTeam/website/edit/master/${contentPath}`;

  return (
    <DocsShell
      activeUrl={page.url}
      description={page.data.description}
      editUrl={editUrl}
      group={group}
      next={adjacent.next}
      previous={adjacent.previous}
      project={project}
      projectSlug={rawProject}
      title={page.data.title}
    >
      <Content components={getMDXComponents()} />
    </DocsShell>
  );
}
