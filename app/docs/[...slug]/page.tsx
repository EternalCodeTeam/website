import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components, mdxOptions } from "@/lib/mdx";
import { docsStructure } from "@/components/docs/sidebar-structure";
import type { Metadata } from "next";
import { Suspense } from "react";

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

const flatDocs = flattenDocs(docsStructure);

interface Props {
  params: {
    slug: string[];
  };
}

async function getDocBySlug(slug: string[]): Promise<Doc | null> {
  const docsDirectory = path.join(process.cwd(), "content/docs");
  const fullPath = path.join(docsDirectory, slug.join("/") + ".md");

  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = await fs.stat(fullPath);

    return {
      meta: {
        ...data as DocMeta,
        lastModified: stats.mtime.toISOString(),
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading doc file ${fullPath}:`, error);
    return null;
  }
}

function getDocNavigation(currentPath: string): DocNavigation {
  const currentIndex = flatDocs.findIndex((d) => d.path === currentPath);
  return {
    prev: currentIndex > 0 ? flatDocs[currentIndex - 1] : null,
    next: currentIndex < flatDocs.length - 1 ? flatDocs[currentIndex + 1] : null,
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

function LoadingFallback() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
      <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-8" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        ))}
      </div>
    </div>
  );
}

export default async function DocPage({ params }: Props) {
  const doc = await getDocBySlug(params.slug);
  if (!doc) {
    notFound();
  }

  const currentPath = "/docs/" + params.slug.join("/");
  const { prev, next } = getDocNavigation(currentPath);

  return (
    <div>
      <article className="prose max-w-none dark:prose-invert">
        <h1>{doc.meta.title}</h1>
        {doc.meta.description && (
          <p className="mb-6 text-xl text-gray-600 dark:text-gray-400">
            {doc.meta.description}
          </p>
        )}
        {doc.meta.lastModified && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date(doc.meta.lastModified).toLocaleDateString()}
          </p>
        )}
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
      <div className="mt-8 flex justify-between">
        {prev ? (
          <a
            href={prev.path}
            className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 no-underline transition-colors hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            ← {prev.title}
          </a>
        ) : (
          <div />
        )}
        {next ? (
          <a
            href={next.path}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white no-underline transition-colors hover:bg-blue-700"
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
