import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components, mdxOptions } from "@/lib/mdx";
import { docsStructure } from "@/components/docs/sidebar-structure";
import type { Metadata } from "next";
import { Suspense, cache } from "react";

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
    const result: { title: string; path: string }[] = [];
    for (const item of structure) {
      if (item.children && item.children.length > 0) {
        for (const child of item.children) {
          result.push({ title: child.title, path: child.path });
        }
      } else {
        result.push({ title: item.title, path: item.path });
      }
    }
    return result;
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
  const currentIndex = flatDocs.findIndex((doc: { path: string }) => doc.path === currentPath);
  return {
    prev: currentIndex > 0 ? flatDocs[currentIndex - 1] : null,
    next:
      currentIndex < flatDocs.length - 1 ? flatDocs[currentIndex + 1] : null,
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
    title: `${doc.meta.title} | EternalCode Documentation`,
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
    <div className="animate-pulse">
      <div className="mb-4 h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-8 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
        ))}
      </div>
    </div>
  );
}

// Generate static paths for all documentation pages
export async function generateStaticParams() {
  const flatDocs = getFlatDocs();
  return flatDocs.map((doc: { path: string }) => ({
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
  let category = null;
  for (const item of docsStructure) {
    if (currentPath.startsWith(item.path)) {
      category = item.title;
      break;
    }
  }

  return (
    <div>
      <article className="prose mx-auto max-w-5xl dark:prose-invert">
        {category && (
          <div
            className="text-muted-foreground mb-1 text-sm uppercase tracking-wide"
            style={{ letterSpacing: "0.08em" }}
          >
            {category}
          </div>
        )}
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight">
          {doc.meta.title}
        </h1>
        {doc.meta.description && (
          <p className="text-muted-foreground mb-2 text-lg">
            {doc.meta.description}
          </p>
        )}
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <Suspense fallback={<LoadingFallback />}>
          <MDXRemote
            source={doc.content}
            components={components}
            options={{
              mdxOptions,
            }}
          />
        </Suspense>
      </article>
      <div className="mx-auto mt-12 flex w-full max-w-5xl justify-between">
        {prev ? (
          <a href={prev.path} className="btn btn-outline">
            ← {prev.title}
          </a>
        ) : (
          <div />
        )}
        {next ? (
          <a
            href={next.path}
            className="btn btn-primary"
          >
            {next.title} →
          </a>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
