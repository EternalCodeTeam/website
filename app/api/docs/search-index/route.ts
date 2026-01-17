import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { NextResponse } from "next/server";

const MDX_EXTENSION_REGEX = /\.mdx$/;
const TITLE_SPLIT_REGEX = /[-_]/;

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

function toTitleCase(value: string): string {
  return value
    .split(TITLE_SPLIT_REGEX)
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

function getCategoryLabel(relativePath: string): string {
  const topLevel = relativePath.split(path.sep)[0] ?? "docs";
  return CATEGORY_LABELS[topLevel] ?? toTitleCase(topLevel);
}

function findMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
}

function generateSearchIndex() {
  const docsDir = path.join(process.cwd(), "content/docs");
  const files = findMarkdownFiles(docsDir);
  const searchIndex: SearchIndexItem[] = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const { data, content: markdownContent } = matter(content);
    const relativePath = path.relative(docsDir, file);
    const urlPath = `/docs/${relativePath.replace(MDX_EXTENSION_REGEX, "")}`;
    const category = getCategoryLabel(relativePath);

    const excerpt = markdownContent
      .replace(/[#*`_~]/g, "")
      .replace(/\n/g, " ")
      .trim()
      .substring(0, 150);

    searchIndex.push({
      title: data.title || path.basename(file, ".mdx"),
      path: urlPath,
      excerpt,
      category,
    });
  }

  return searchIndex;
}

export function GET() {
  try {
    const searchIndex = generateSearchIndex();
    return NextResponse.json(searchIndex);
  } catch (error) {
    console.error("Error generating search index:", error);
    return NextResponse.json({ error: "Failed to generate search index" }, { status: 500 });
  }
}
