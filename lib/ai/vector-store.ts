import fs from "node:fs/promises";
import path from "node:path";
import type { VectorIndex } from "./types";

const INDEX_PATH = path.join(process.cwd(), "content/_generated/vector-index.json");

let cachedIndex: VectorIndex | null = null;

export async function loadVectorIndex(): Promise<VectorIndex> {
  if (cachedIndex) {
    return cachedIndex;
  }

  try {
    const raw = await fs.readFile(INDEX_PATH, "utf-8");
    cachedIndex = JSON.parse(raw) as VectorIndex;
    return cachedIndex;
  } catch (err) {
    const error = err as NodeJS.ErrnoException;
    if (error.code === "ENOENT") {
      throw new Error(
        "Vector index not found. Run `bun run build:index` before starting the server."
      );
    }
    throw err;
  }
}

export function invalidateVectorIndex(): void {
  cachedIndex = null;
}
