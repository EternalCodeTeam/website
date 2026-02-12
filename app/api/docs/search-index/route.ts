import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

const MDX_EXTENSION_REGEX = /\.mdx$/;
const TITLE_SPLIT_REGEX = /[-_]/;
const CACHE_TTL_MS = 10 * 60 * 1000;

interface SearchIndexItem {
  title: string;
  path: string;
  excerpt: string;
  category: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  eternalcore: "EternalCore",
  eternalcombat: "EternalCombat",
  multification: "Multification",
  contribute: "Contribute",
};

let cache: SearchIndexItem[] | null = null;
let cacheTimestamp = 0;
let cachePromise: Promise<SearchIndexItem[]> | null = null;

function toTitleCase(value: string): string {
  return value
    .split(TITLE_SPLIT_REGEX)
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

function getCategoryLabel(relativePath: string): string {
  const topLevel = relativePath.split("/")[0] ?? "docs";
  return CATEGORY_LABELS[topLevel] ?? toTitleCase(topLevel);
}

async function findMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return findMarkdownFiles(fullPath);
      }

      if (entry.isFile() && entry.name.endsWith(".mdx")) {
        return [fullPath];
      }

      return [];
    })
  );

  return files.flat();
}

async function generateSearchIndex(): Promise<SearchIndexItem[]> {
  const docsDir = path.join(process.cwd(), "content/docs");
  const files = await findMarkdownFiles(docsDir);

  const searchIndex = await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(file, "utf8");
      const { data, content: markdownContent } = matter(content);

      const relativePath = path.relative(docsDir, file).split(path.sep).join("/");
      const urlPath = `/docs/${relativePath.replace(MDX_EXTENSION_REGEX, "")}`;

      const excerpt = markdownContent
        .replace(/[#*`_~]/g, "")
        .replace(/\n/g, " ")
        .trim()
        .substring(0, 150);

      return {
        title: data.title || path.basename(file, ".mdx"),
        path: urlPath,
        excerpt,
        category: getCategoryLabel(relativePath),
      };
    })
  );

  return searchIndex;
}

function getSearchIndexCached(): Promise<SearchIndexItem[]> {
  const now = Date.now();

  if (cache && now - cacheTimestamp < CACHE_TTL_MS) {
    return Promise.resolve(cache);
  }

  if (!cachePromise) {
    cachePromise = generateSearchIndex()
      .then((result) => {
        cache = result;
        cacheTimestamp = Date.now();
        return result;
      })
      .finally(() => {
        cachePromise = null;
      });
  }

  return cachePromise;
}

export async function GET() {
  try {
    const searchIndex = await getSearchIndexCached();
    return NextResponse.json(searchIndex, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating search index:", error);
    return NextResponse.json({ error: "Failed to generate search index" }, { status: 500 });
  }
}
