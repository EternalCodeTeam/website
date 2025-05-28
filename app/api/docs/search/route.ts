import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";


export const dynamic = "force-dynamic"; // Search results should always be fresh
export const revalidate = 0;

interface SearchResult {
  title: string;
  path: string;
  excerpt: string;
}

async function searchInDirectory(
  dir: string,
  query: string
): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const subResults = await searchInDirectory(fullPath, query);
      results.push(...subResults);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const content = await fs.readFile(fullPath, "utf-8");
      const { data, content: markdownContent } = matter(content);

      const title = data.title || entry.name.replace(".md", "");
      const relativePath = fullPath
        .replace(process.cwd(), "")
        .replace(/\\/g, "/")
        .replace("/content/docs", "/docs")
        .replace(".md", "");

      const excerpt = markdownContent
        .split("\n")
        .slice(0, 3)
        .join(" ")
        .substring(0, 150);

      if (
        title.toLowerCase().includes(query) ||
        markdownContent.toLowerCase().includes(query)
      ) {
        results.push({
          title,
          path: relativePath,
          excerpt,
        });
      }
    }
  }

  return results;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  if (!query) {
    return NextResponse.json([], {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  try {
    const docsDir = path.join(process.cwd(), "content/docs");
    const results = await searchInDirectory(docsDir, query);
    return NextResponse.json(results, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Search failed" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
