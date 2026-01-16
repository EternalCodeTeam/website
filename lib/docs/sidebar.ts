import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { DocItem } from "@/components/docs/sidebar/types";
import { FrontmatterSchema } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content/docs");

const MDX_EXT = /\.mdx$/;

export const getSidebar = cache((): Promise<DocItem[]> => {
  return buildTree(CONTENT_DIR, "/docs");
});

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Recursive tree building is complex
async function buildTree(dir: string, urlPrefix: string): Promise<DocItem[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const items: DocItem[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativeName = entry.name.replace(MDX_EXT, "");
    const urlPath = `${urlPrefix}/${relativeName}`;

    if (entry.isDirectory()) {
      let title = entry.name;
      let icon: string | undefined;
      let position = 999;

      // Check for _index.mdx to get folder metadata
      const indexPath = path.join(fullPath, "_index.mdx");
      try {
        const indexContent = await fs.readFile(indexPath, "utf8");
        const { data } = matter(indexContent);
        const parsed = FrontmatterSchema.safeParse(data);
        if (parsed.success) {
          title = parsed.data.title;
          icon = parsed.data.icon;
          position = parsed.data.sidebar_position ?? 999;
        }
      } catch {
        // No _index.mdx or error reading it, fall back to defaults
      }

      const children = await buildTree(fullPath, urlPath);
      if (children.length === 0) {
        continue;
      }

      items.push({
        title,
        path: urlPath,
        children: children.sort(sortDocs),
        icon,
        sidebar_position: position,
      });
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      if (entry.name === "_index.mdx") {
        continue;
      }

      const fileContent = await fs.readFile(fullPath, "utf8");
      const { data } = matter(fileContent);
      const parsed = FrontmatterSchema.safeParse(data);

      if (!parsed.success) {
        continue;
      }

      items.push({
        title: parsed.data.title,
        path: urlPath,
        icon: parsed.data.icon,
        sidebar_position: parsed.data.sidebar_position,
      });
    }
  }

  return items.sort(sortDocs);
}

function sortDocs(a: DocItem, b: DocItem): number {
  const posA = a.sidebar_position ?? 999;
  const posB = b.sidebar_position ?? 999;
  if (posA !== posB) {
    return posA - posB;
  }
  return a.title.localeCompare(b.title);
}

export function getDocNavigation(sidebar: DocItem[], currentPath: string) {
  const flat: DocItem[] = [];

  function traverse(items: DocItem[]) {
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        traverse(item.children);
      } else {
        flat.push(item);
      }
    }
  }
  traverse(sidebar);

  const index = flat.findIndex((i) => i.path === currentPath);
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}
