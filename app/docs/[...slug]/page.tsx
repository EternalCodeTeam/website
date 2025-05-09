import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components, mdxOptions } from "@/lib/mdx";
import { docsStructure } from "@/components/docs/sidebar-structure";

function flattenDocs(
  structure: {
    title: string;
    path: string;
    children?: { title: string; path: string }[];
  }[]
): { title: string; path: string }[] {
  const result: { title: string; path: string }[] = [];
  for (const item of structure) {
    result.push({ title: item.title, path: item.path });
    if (item.children) {
      for (const child of item.children) {
        result.push({ title: child.title, path: child.path });
      }
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

async function getDocBySlug(slug: string[]) {
  const docsDirectory = path.join(process.cwd(), "content/docs");
  const fullPath = path.join(docsDirectory, slug.join("/") + ".md");

  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      meta: data,
      content,
    };
  } catch (error) {
    return null;
  }
}

export default async function DocPage({ params }: Props) {
  const doc = await getDocBySlug(params.slug);
  if (!doc) {
    notFound();
  }
  const currentPath = "/docs/" + params.slug.join("/");
  const currentIndex = flatDocs.findIndex((d) => d.path === currentPath);
  const prev = currentIndex > 0 ? flatDocs[currentIndex - 1] : null;
  const next =
    currentIndex < flatDocs.length - 1 ? flatDocs[currentIndex + 1] : null;

  return (
    <>
      <article className="prose max-w-none dark:prose-invert">
        <h1>{doc.meta.title}</h1>
        {doc.meta.description && (
          <p className="mb-6 text-xl text-gray-600 dark:text-gray-400">
            {doc.meta.description}
          </p>
        )}
        <MDXRemote
          source={doc.content}
          components={components}
          options={{
            mdxOptions,
          }}
        />
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
    </>
  );
}
