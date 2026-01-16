import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { type Doc, FrontmatterSchema } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content/docs");
const MDX_EXT = /\.mdx$/;

export const getDoc = cache(async (slug: string[]): Promise<Doc | null> => {
  const param = slug.join("/");
  const filePath = path.join(CONTENT_DIR, `${param}.mdx`);

  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContent);
    const stats = await fs.stat(filePath);

    const parsedFrontmatter = FrontmatterSchema.safeParse(data);

    if (!parsedFrontmatter.success) {
      console.error(`Invalid Frontmatter in ${filePath}:`, parsedFrontmatter.error);
      throw new Error(`Invalid Frontmatter in ${filePath}`);
    }

    return {
      slug,
      param,
      frontmatter: parsedFrontmatter.data,
      content,
      lastModified: stats.mtimeMs,
    };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    console.error(`Error loading doc ${param}:`, err);
    throw err;
  }
});

export const getAllDocs = cache(async (): Promise<Doc[]> => {
  const docs: Doc[] = [];

  async function scan(dir: string, baseSlug: string[] = []) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        await scan(path.join(dir, entry.name), [...baseSlug, entry.name]);
      } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
        const slug = [...baseSlug, entry.name.replace(MDX_EXT, "")];
        const doc = await getDoc(slug);
        if (doc) {
          docs.push(doc);
        }
      }
    }
  }

  await scan(CONTENT_DIR);
  return docs;
});
