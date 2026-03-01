#!/usr/bin/env tsx

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import OpenAI from "openai";
import { chunkMarkdown } from "../lib/ai/chunker";
import type { VectorChunk, VectorIndex } from "../lib/ai/types";

const DOCS_DIR = path.join(process.cwd(), "content/docs");
const OUTPUT_PATH = path.join(process.cwd(), "content/_generated/vector-index.json");
const MANIFEST_PATH = path.join(process.cwd(), "content/_generated/vector-manifest.json");
const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_BATCH_SIZE = 20;
const MDX_EXTENSION_REGEX = /\.mdx$/;
const CATEGORY_LABELS: Record<string, string> = {
  eternalcore: "EternalCore",
  eternalcombat: "EternalCombat",
  multification: "Multification",
  contribute: "Contribute",
};

function hashContent(content: string): string {
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 16);
}

function getCategory(relativePath: string): string {
  const top = relativePath.split("/")[0] ?? "";
  return CATEGORY_LABELS[top] ?? top;
}

function buildDocPath(relativePath: string): string {
  return `/docs/${relativePath.replace(MDX_EXTENSION_REGEX, "")}`;
}

async function findMdxFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results = await Promise.all(
    entries.map((e) => {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        return findMdxFiles(full);
      }

      if (e.isFile() && e.name.endsWith(".mdx")) {
        return [full];
      }

      return [];
    })
  );
  return results.flat();
}

async function embedBatch(client: OpenAI, texts: string[]): Promise<number[][]> {
  const embeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += EMBEDDING_BATCH_SIZE) {
    const batch = texts.slice(i, i + EMBEDDING_BATCH_SIZE);
    const response = await client.embeddings.create({
      model: EMBEDDING_MODEL,
      input: batch,
    });
    for (const item of response.data) {
      embeddings.push(item.embedding);
    }
    if (i + EMBEDDING_BATCH_SIZE < texts.length) {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  return embeddings;
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("❌  OPENAI_API_KEY environment variable is not set.");
    process.exit(1);
  }

  const client = new OpenAI({ apiKey });

  let existingChunks: VectorChunk[] = [];
  let manifest: Record<string, string> = {};

  try {
    const raw = await fs.readFile(OUTPUT_PATH, "utf-8");
    const existing = JSON.parse(raw) as VectorIndex;
    existingChunks = existing.chunks;
  } catch {
    existingChunks = [];
  }

  try {
    const raw = await fs.readFile(MANIFEST_PATH, "utf-8");
    manifest = JSON.parse(raw) as Record<string, string>;
  } catch {
    manifest = {};
  }

  const files = await findMdxFiles(DOCS_DIR);
  console.log(`📂  Found ${files.length} MDX files`);

  const allChunks: VectorChunk[] = [];
  const chunksToEmbed: Array<{ chunk: Omit<VectorChunk, "embedding">; text: string }> = [];
  const newManifest: Record<string, string> = {};

  for (const filePath of files) {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    const relativePath = path.relative(DOCS_DIR, filePath).split(path.sep).join("/");
    const docPath = buildDocPath(relativePath);
    const title = (data.title as string) || path.basename(filePath, ".mdx");
    const hash = hashContent(raw);

    newManifest[relativePath] = hash;

    const unchanged = manifest[relativePath] === hash;
    const docExistingChunks = existingChunks.filter((c) => c.docPath === docPath);

    if (unchanged && docExistingChunks.length > 0) {
      allChunks.push(...docExistingChunks);
      continue;
    }

    const _category = getCategory(relativePath);
    const chunkDrafts = chunkMarkdown(content, title);

    for (let i = 0; i < chunkDrafts.length; i++) {
      const draft = chunkDrafts[i];
      const id = `${docPath}#${draft.anchor || `chunk-${i}`}`;
      chunksToEmbed.push({
        chunk: { id, docPath, title, anchor: draft.anchor, text: draft.text },
        text: draft.text,
      });
    }
  }

  if (chunksToEmbed.length > 0) {
    console.log(`🧠  Embedding ${chunksToEmbed.length} new/changed chunks…`);
    const texts = chunksToEmbed.map((c) => c.text);
    const embeddings = await embedBatch(client, texts);

    for (let i = 0; i < chunksToEmbed.length; i++) {
      allChunks.push({ ...chunksToEmbed[i].chunk, embedding: embeddings[i] });
    }
  } else {
    console.log("✅  All files unchanged — using cached embeddings");
  }

  allChunks.sort((a, b) => a.id.localeCompare(b.id));

  const index: VectorIndex = {
    version: 1,
    generatedAt: new Date().toISOString(),
    model: EMBEDDING_MODEL,
    chunks: allChunks,
  };

  await fs.writeFile(OUTPUT_PATH, JSON.stringify(index, null, 2), "utf-8");
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(newManifest, null, 2), "utf-8");

  console.log(`✅  Wrote ${allChunks.length} chunks → ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("❌  Fatal error:", err);
  process.exit(1);
});
