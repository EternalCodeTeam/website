import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components, mdxOptions } from "@/lib/mdx";
import { docsStructure } from "@/components/docs/sidebar-structure";
import type { Metadata } from "next";
import { Suspense, cache } from "react";
import { Breadcrumbs } from "@/components/docs/Breadcrumbs";
import { EditOnGitHub } from "@/components/docs/EditOnGitHub";
import { ReadingTime } from "@/components/docs/ReadingTime";
import { ShortLink } from "@/components/docs/ShortLink";
import type { MDXComponents } from "mdx/types";
import { ArrowBack } from "@/components/icons/arrow-back";
import { ArrowForward } from "@/components/icons/arrow-forward";

// Enable static generation with revalidation
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

interface DocMeta {
  title: string;
  description?: string;
  lastModified?: string;
  author?: string;
  [key: string]: any;
}

interface Doc {
  meta: DocMeta;
  content: string;
}

interface DocNavigation {
  prev: { title: string; path: string } | null;
  next: { title: string; path: string } | null;
}

// Cache the flattened docs structure
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
        return [...acc, ...item.children];
      }
      return [...acc, { title: item.title, path: item.path }];
    }, []);
  }
  return flattenDocs(docsStructure);
});

// Cache the doc content
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

// Cache the navigation
const getDocNavigation = cache((currentPath: string): DocNavigation => {
  const flatDocs = getFlatDocs();
  const currentIndex = flatDocs.findIndex((doc) => doc.path === currentPath);
  return {
    prev: currentIndex > 0 ? flatDocs[currentIndex - 1] : null,
    next: currentIndex < flatDocs.length - 1 ? flatDocs[currentIndex + 1] : null,
  };
});

interface Props {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = await getDocBySlug(params.slug);
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

// Optimized loading fallback
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

// Generate static paths for all documentation pages
export async function generateStaticParams() {
  const flatDocs = getFlatDocs();
  return flatDocs.map((doc) => ({
    slug: doc.path.replace("/docs/", "").split("/"),
  }));
}

export default async function DocPage({ params }: Props) {
  const doc = await getDocBySlug(params.slug);
  if (!doc) {
    notFound();
  }

  const currentPath = "/docs/" + params.slug.join("/");
  const { prev, next } = getDocNavigation(currentPath);

  // Find category
  const category = docsStructure.find((item) => currentPath.startsWith(item.path))?.title;

  return (
    <div>
      <article className="prose mx-auto max-w-5xl dark:prose-invert">
        <Breadcrumbs currentPath={currentPath} />
        
        {category && (
          <div
            className="text-muted-foreground mb-4 text-sm uppercase tracking-wide"
            style={{ letterSpacing: "0.08em" }}
          >
            {category}
          </div>
        )}

        <div className="flex items-center justify-between">
          <h1 className="mb-1 text-4xl font-extrabold tracking-tight">
            {doc.meta.title}
          </h1>
          <div className="flex items-center space-x-4">
            <ReadingTime content={doc.content} />
            <ShortLink path={currentPath} />
            <EditOnGitHub filePath={params.slug.join("/")} />
          </div>
        </div>

        {doc.meta.description && (
          <p className="text-muted-foreground mb-0 mt-0 text-lg">
            {doc.meta.description}
          </p>
        )}

        <hr className="my-8 border-gray-300 dark:border-gray-600 sm:mx-auto lg:my-10" />

        <Suspense fallback={<LoadingFallback />}>
          <MDXRemote
            source={doc.content}
            components={components as MDXComponents}
            options={{
              mdxOptions,
            }}
          />
        </Suspense>
      </article>

      <div className="mx-auto mt-12 flex w-full max-w-5xl justify-between">
        {prev ? (
          <a
            href={prev.path}
            className="group flex items-center gap-2 rounded-lg bg-gray-200 px-6 py-3 text-sm font-medium text-gray-800 shadow-md transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            <ArrowBack className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            {prev.title}
          </a>
        ) : (
          <div />
        )}
        {next ? (
          <a
            href={next.path}
            className="group flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-md transition hover:bg-blue-700"
          >
            {next.title}
            <ArrowForward className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}