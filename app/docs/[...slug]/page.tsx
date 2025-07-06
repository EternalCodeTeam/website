import fs from "fs/promises";
import path from "path";

import matter from "gray-matter";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Suspense, cache } from "react";

import { components, mdxOptions } from "@/components/mdx/mdx-components";
import { DocsHeader } from "@/components/page/docs/content/DocsHeader";
import { EditOnGitHub } from "@/components/page/docs/content/EditOnGitHub";
import { ErrorBoundary } from "@/components/page/docs/content/ErrorBoundary";
import { ReadingTime } from "@/components/page/docs/content/ReadingTime";
import { ShortLink } from "@/components/page/docs/content/ShortLink";
import { docsStructure } from "@/components/page/docs/sidebar-structure";

interface DocMeta {
  title: string;
  description?: string;
  lastModified?: string;
  author?: string;
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

const getFlatDocs = cache(() => {
  function flattenDocs(
    structure: {
      title: string;
      path: string;
      children?: { title: string; path: string }[];
    }[]
  ): { title: string; path: string }[] {
    return structure.reduce<{ title: string; path: string }[]>((acc, item) => {
      if (item.children?.length) {
        acc.push(...item.children);
      } else {
        acc.push({ title: item.title, path: item.path });
      }
      return acc;
    }, []);
  }
  return flattenDocs(docsStructure);
});

const getDocBySlug = cache(async (slug: string[]): Promise<Doc | null> => {
  const docsDirectory = path.join(process.cwd(), "content/docs");
  const fullPath = path.join(docsDirectory, slug.join("/") + ".md");

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
    console.error(`Error reading doc file ${fullPath}:`, error);
    return null;
  }
});

const getDocNavigation = cache((currentPath: string): DocNavigation => {
  const flatDocs = getFlatDocs();
  const currentIndex = flatDocs.findIndex((doc) => doc.path === currentPath);
  return {
    prev: currentIndex > 0 ? flatDocs[currentIndex - 1] : null,
    next: currentIndex < flatDocs.length - 1 ? flatDocs[currentIndex + 1] : null,
  };
});

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

function LoadingFallback() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
      ))}
    </div>
  );
}

export async function generateStaticParams() {
  const flatDocs = getFlatDocs();
  return flatDocs.map((doc) => ({
    slug: doc.path.replace("/docs/", "").split("/"),
  }));
}

export default async function DocPage({ params }: Props) {
  const resolvedParams = await params;
  const doc = await getDocBySlug(resolvedParams.slug);
  if (!doc) notFound();

  const currentPath = "/docs/" + resolvedParams.slug.join("/");
  const { prev, next } = getDocNavigation(currentPath);

  const category = docsStructure.find((item) => currentPath.startsWith(item.path))?.title;

  return (
    <div>
      <article className="prose mx-auto max-w-5xl dark:prose-invert">
        <DocsHeader
          category={category}
          title={doc.meta.title}
          description={doc.meta.description}
          actions={
            <>
              <ReadingTime content={doc.content} />
              <ShortLink path={currentPath} />
              <EditOnGitHub filePath={resolvedParams.slug.join("/")} />
            </>
          }
        />

        <hr className="my-8 border-gray-300 dark:border-gray-600 sm:mx-auto lg:my-10" />

        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <MDXRemote
              source={doc.content}
              components={components}
              options={{ mdxOptions }}
            />
          </Suspense>
        </ErrorBoundary>
      </article>

      <div className="mx-auto mt-12 flex w-full max-w-5xl items-center justify-between gap-2">
        {prev ? (
          <Link
            href={prev.path}
            className="group flex items-center gap-1 text-sm font-normal text-gray-500 transition-colors hover:text-gray-700"
            prefetch={true}
            aria-label={`Previous: ${prev.title}`}
          >
            <span className="inline-block align-middle transition-transform group-hover:-translate-x-0.5">
              &#8592;
            </span>
            <span className="truncate">{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={next.path}
            className="group flex items-center justify-end gap-1 text-sm font-normal text-gray-500 transition-colors hover:text-gray-700"
            prefetch={true}
            aria-label={`Next: ${next.title}`}
          >
            <span className="truncate">{next.title}</span>
            <span className="inline-block align-middle transition-transform group-hover:translate-x-0.5">
              &#8594;
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
