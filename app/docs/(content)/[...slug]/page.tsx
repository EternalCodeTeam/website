import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Suspense } from "react";

import { DocsHeader } from "@/components/docs/content/docs-header";
import { DocsNavigation } from "@/components/docs/content/docs-navigation";
import { EditOnGitHub } from "@/components/docs/content/edit-on-github";
import { ErrorBoundary } from "@/components/docs/content/error-boundary";
import { HashScroll } from "@/components/docs/content/hash-scroll";
import { LoadingFallback } from "@/components/docs/content/loading-fallback";
import { ReadingTime } from "@/components/docs/content/reading-time";
import { HotReload } from "@/components/docs/hot-reload";
import { components, mdxOptions } from "@/components/ui/mdx/mdx-components";
import { getAllDocs, getDoc } from "@/lib/docs/loader";
import { getDocNavigation, getSidebar as getSidebarStructure } from "@/lib/docs/sidebar";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const doc = await getDoc(resolvedParams.slug);

  if (!doc) {
    return {
      title: "Doc Not Found",
    };
  }

  const ogImageUrl = `/api/og/${resolvedParams.slug.join("/")}`;

  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    openGraph: {
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      type: "article",
      publishedTime: new Date(doc.lastModified).toISOString(),
      authors: doc.frontmatter.author ? [doc.frontmatter.author] : undefined,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: doc.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      images: [ogImageUrl],
    },
  };
}

export default async function DocPage({ params }: Props) {
  const resolvedParams = await params;
  const doc = await getDoc(resolvedParams.slug);

  if (!doc) {
    const sidebar = await getSidebarStructure();
    const currentPath = `/docs/${resolvedParams.slug.join("/")}`;

    // Helper to find item by path in sidebar tree
    const findItem = (items: typeof sidebar, path: string): (typeof sidebar)[0] | undefined => {
      for (const item of items) {
        if (item.path === path) {
          return item;
        }
        if (item.children) {
          const found = findItem(item.children, path);
          if (found) {
            return found;
          }
        }
      }
      return undefined;
    };

    const categoryItem = findItem(sidebar, currentPath);

    if (categoryItem?.children?.length) {
      // Helper to find first leaf node (document) recursively
      const findFirstDoc = (items: typeof sidebar): string | null => {
        for (const item of items) {
          // If logic: leaf node has no children or empty children array
          if (!item.children || item.children.length === 0) {
            return item.path;
          }
          const found = findFirstDoc(item.children);
          if (found) {
            return found;
          }
        }
        return null;
      };

      const redirectPath = findFirstDoc(categoryItem.children);
      if (redirectPath) {
        redirect(redirectPath);
      }
    }

    notFound();
  }

  const sidebar = await getSidebarStructure();
  const currentPath = `/docs/${resolvedParams.slug.join("/")}`;
  const { prev, next } = getDocNavigation(sidebar, currentPath);

  const category = sidebar.find((item) => currentPath.startsWith(item.path))?.title;

  return (
    <div className="lg:mt-2">
      <HotReload lastModified={doc.lastModified} slug={resolvedParams.slug} />
      <DocsHeader
        actions={
          <>
            <ReadingTime content={doc.content} />
            <EditOnGitHub filePath={resolvedParams.slug.join("/")} />
          </>
        }
        category={category}
        description={doc.frontmatter.description}
        icon={doc.frontmatter.icon}
        title={doc.frontmatter.title}
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
            <HashScroll />
          </Suspense>
        </ErrorBoundary>
      </article>

      <DocsNavigation next={next} prev={prev} />
    </div>
  );
}
