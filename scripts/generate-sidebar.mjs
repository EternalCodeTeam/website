#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MDX_EXTENSION = /\.mdx$/;

function readFrontMatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = matter(content);
    return data;
  } catch {
    return null;
  }
}

function findFolderMetadata(entries, dirPath) {
  const folderMeta = new Map();

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      const baseName = entry.name.replace(MDX_EXTENSION, "");
      const hasFolder = entries.some((e) => e.isDirectory() && e.name === baseName);
      if (hasFolder) {
        const fm = readFrontMatter(path.join(dirPath, entry.name));
        if (fm) {
          folderMeta.set(baseName, fm);
        }
      }
    }
  }

  return folderMeta;
}

function processEntries(entries, dirPath, urlPrefix, folderMeta) {
  const items = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const urlPath = `${urlPrefix}/${entry.name.replace(MDX_EXTENSION, "")}`;

    if (entry.isDirectory()) {
      const meta = folderMeta.get(entry.name);
      const children = scanDirectory(fullPath, urlPath);
      items.push({
        title: meta?.title || entry.name,
        path: urlPath,
        icon: meta?.icon,
        sidebar_position: meta?.sidebar_position,
        children,
      });
    } else if (entry.name.endsWith(".mdx")) {
      const baseName = entry.name.replace(MDX_EXTENSION, "");
      if (folderMeta.has(baseName)) {
        continue;
      }

      const fm = readFrontMatter(fullPath);
      items.push({
        title: fm?.title || baseName,
        path: urlPath,
        icon: fm?.icon,
        sidebar_position: fm?.sidebar_position,
      });
    }
  }

  return items;
}

function scanDirectory(dirPath, urlPrefix = "") {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const folderMeta = findFolderMetadata(entries, dirPath);
  const items = processEntries(entries, dirPath, urlPrefix, folderMeta);

  return items.sort((a, b) => {
    const posA = a.sidebar_position ?? 999;
    const posB = b.sidebar_position ?? 999;
    if (posA !== posB) {
      return posA - posB;
    }
    return a.title.localeCompare(b.title);
  });
}

const docsDir = path.join(process.cwd(), "content/docs");
const structure = scanDirectory(docsDir, "/docs");
const outputPath = path.join(process.cwd(), "lib/generated-sidebar.json");

fs.writeFileSync(outputPath, JSON.stringify(structure, null, 2), "utf8");
console.log(`Generated sidebar: ${outputPath}`);
console.log(`Found ${structure.length} categories`);
