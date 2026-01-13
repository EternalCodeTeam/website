import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Suspense } from "react";

import { DocsHeader } from "@/components/docs/content/docs-header";
import { DocsNavigation } from "@/components/docs/content/docs-navigation";
import { EditOnGitHub } from "@/components/docs/content/edit-on-github";
import { ErrorBoundary } from "@/components/docs/content/error-boundary";
import { ReadingTime } from "@/components/docs/content/reading-time";
import { components, mdxOptions } from "@/components/ui/mdx/mdx-components";
import { docsStructure } from "@/lib/sidebar-structure";

interface DocMeta {
  title: string;
  description?: string;
  lastModified?: string;
  author?: string;
  icon?: string;
  [key: string]: string | undefined;
}

interface Doc {
  meta: DocMeta;
  content: string;
}

interface DocNavigation {
  prev: { title: string; path: string } | null;
  next: { title: string; path: string } | null;
}

interface DocStructureItem {
  title: string;
  path: string;
  children?: DocStructureItem[];
}

function getFlatDocs(): { title: string; path: string }[] {
  function flattenDocs(structure: DocStructureItem[]): { title: string; path: string }[] {
    const result: { title: string; path: string }[] = [];

    for (const item of structure) {
      const hasChildren = item.children && item.children.length > 0;

      if (hasChildren) {
        result.push(...flattenDocs(item.children ?? []));
      } else {
        result.push({ title: item.title, path: item.path });
      }
    }

    return result;
  }

  return flattenDocs(docsStructure);
}

async function getDocBySlug(slug: string[]): Promise<Doc | null> {
  const docsDirectory = path.join(process.cwd(), "content/docs");
  const fullPath = path.join(docsDirectory, `${slug.join("/")}.mdx`);

  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = await fs.stat(fullPath);

    return {
      meta: {
        ...(data as DocMeta),
        lastModified: stats.mtime.toISOString(),
      },
      content,
    };
  } catch (error) {
    // If file doesn't exist, check if it's a folder - if so return null (notFound)
    const stats = await fs.stat(path.join(docsDirectory, slug.join("/"))).catch(() => null);
    if (stats?.isDirectory()) {
      // It is a folder, not a file - return null to trigger notFound
      return null;
    }
    console.error(`Error reading doc file ${fullPath}:`, error);
    return null;
  }
}

function getDocNavigation(currentPath: string): DocNavigation {
  const flatDocs = getFlatDocs();
  const currentIndex = flatDocs.findIndex((doc) => doc.path === currentPath);
  return {
    prev: currentIndex > 0 ? flatDocs[currentIndex - 1] : null,
    next: currentIndex < flatDocs.length - 1 ? flatDocs[currentIndex + 1] : null,
  };
}

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const doc = await getDocBySlug(resolvedParams.slug);
  if (!doc) {
    return {
      title: "Documentation Not Found",
      description: "The requested documentation page could not be found.",
    };
  }

  return {
    title: doc.meta.title,
    description: doc.meta.description || "EternalCode Documentation",
    openGraph: {
      title: doc.meta.title,
      description: doc.meta.description,
      type: "article",
      publishedTime: doc.meta.lastModified,
      authors: doc.meta.author ? [doc.meta.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: doc.meta.title,
      description: doc.meta.description,
    },
  };
}

const skeletonKeys = Array.from({ length: 5 }, () => crypto.randomUUID());

function LoadingFallback() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-3/4 rounded-sm bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-1/2 rounded-sm bg-gray-200 dark:bg-gray-700" />
      {skeletonKeys.map((key) => (
        <div className="h-4 rounded-sm bg-gray-200 dark:bg-gray-700" key={key} />
      ))}
    </div>
  );
}

export function generateStaticParams() {
  const flatDocs = getFlatDocs();
  return flatDocs.map((doc) => ({
    slug: doc.path.replace("/docs/", "").split("/"),
  }));
}

export default async function DocPage({ params }: Props) {
  const resolvedParams = await params;
  const currentPath = `/docs/${resolvedParams.slug.join("/")}`;

  // Check if it's a folder (has children in structure) - if so, redirect to the first child
  const folderItem = docsStructure.find((item) => item.path === currentPath);
  if (folderItem?.children && folderItem.children.length > 0) {
    const firstChild = folderItem.children[0];
    const { redirect } = await import("next/navigation");
    redirect(firstChild.path);
  }

  const doc = await getDocBySlug(resolvedParams.slug);
  if (!doc) {
    notFound();
  }

  const { prev, next } = getDocNavigation(currentPath);

  const category = docsStructure.find((item) => currentPath.startsWith(item.path))?.title;

  return (
    <div className="lg:mt-2">
      <DocsHeader
        actions={
          <>
            <ReadingTime content={doc.content} />
            <EditOnGitHub filePath={resolvedParams.slug.join("/")} />
          </>
        }
        category={category}
        description={doc.meta.description}
        icon={doc.meta.icon}
        title={doc.meta.title}
      />

      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700" />

      <article className="prose dark:prose-invert max-w-none">
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <MDXRemote
              components={components}
              // biome-ignore lint/suspicious/noExplicitAny: Type mismatch with rehype-prism-plus
              options={{ mdxOptions: mdxOptions as any }}
              source={doc.content}
            />
          </Suspense>
        </ErrorBoundary>
      </article>

      <DocsNavigation next={next} prev={prev} />
    </div>
  );
}
