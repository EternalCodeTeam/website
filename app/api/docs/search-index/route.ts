import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

function findMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function generateSearchIndex() {
  const docsDir = path.join(process.cwd(), "content/docs");
  const files = findMarkdownFiles(docsDir);
  const searchIndex = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const { data, content: markdownContent } = matter(content);
    const relativePath = path.relative(docsDir, file);
    const urlPath = `/docs/${relativePath.replace(/\.md$/, "")}`;

    const excerpt = markdownContent
      .replace(/[#*`_~]/g, "")
      .replace(/\n/g, " ")
      .trim()
      .substring(0, 150);

    searchIndex.push({
      title: data.title || path.basename(file, ".md"),
      path: urlPath,
      excerpt,
    });
  }

  return searchIndex;
}

export async function GET() {
  try {
    const searchIndex = generateSearchIndex();
    return NextResponse.json(searchIndex);
  } catch (error) {
    console.error("Error generating search index:", error);
    return NextResponse.json(
      { error: "Failed to generate search index" },
      { status: 500 }
    );
  }
}