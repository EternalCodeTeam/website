#!/usr/bin/env bun
/**
 * setup-ai-links.ts
 *
 * Creates directory junctions (Windows) or symlinks (macOS/Linux) from
 * AI-tool-specific folders to the single source-of-truth at .ai/skills/.
 *
 * Supported tools and their expected directory:
 *   Claude Code  → .claude/skills
 *   OpenAI Codex → .codex/skills
 *   Gemini       → .gemini/skills
 *   Generic agent → .agent/skills & .agents/skills
 *
 * Run manually:   bun run setup:ai
 * Run on dev:     executed automatically before `next dev`
 */

import { existsSync, mkdirSync, readdirSync, rmSync, symlinkSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const SOURCE = join(ROOT, ".ai", "skills");

const TARGETS: { dir: string; subdir: string }[] = [
  { dir: ".claude", subdir: "skills" },
  { dir: ".codex", subdir: "skills" },
  { dir: ".gemini", subdir: "skills" },
  { dir: ".agent", subdir: "skills" },
  { dir: ".agents", subdir: "skills" },
];

const isWindows = process.platform === "win32";

function removeLink(targetPath: string) {
  if (existsSync(targetPath)) {
    try {
      if (isWindows) {
        // rmdir removes junction without deleting the target contents
        execSync(`rmdir "${targetPath}"`, { stdio: "ignore" });
      } else {
        rmSync(targetPath);
      }
    } catch {
      // If it's a real directory (not a junction/symlink), remove recursively
      rmSync(targetPath, { recursive: true, force: true });
    }
  }
}

function createLink(source: string, target: string) {
  if (isWindows) {
    execSync(`mklink /J "${target}" "${source}"`);
  } else {
    symlinkSync(source, target, "dir");
  }
}

console.log("🔗 Setting up AI tool skill links...\n");

if (!existsSync(SOURCE)) {
  console.error(`❌ Source directory not found: ${SOURCE}`);
  process.exit(1);
}

let created = 0;
let skipped = 0;

for (const { dir, subdir } of TARGETS) {
  const parentDir = join(ROOT, dir);
  const targetPath = join(parentDir, subdir);

  // Ensure parent dir exists
  if (!existsSync(parentDir)) {
    mkdirSync(parentDir, { recursive: true });
  }

  // Check if already a valid junction/symlink pointing to the right place
  try {
    const stat = Bun.file(targetPath);
    // If it exists and is a directory, check if it's already linked
    if (existsSync(targetPath)) {
      const entries = readdirSync(SOURCE);
      const targetEntries = readdirSync(targetPath);
      // Quick check: same number of entries → likely already linked, skip
      if (entries.length === targetEntries.length) {
        console.log(`  ✓ ${dir}/${subdir} — already linked, skipping`);
        skipped++;
        continue;
      }
    }
  } catch {
    // doesn't exist yet, proceed
  }

  removeLink(targetPath);
  createLink(SOURCE, targetPath);
  console.log(`  ✅ ${dir}/${subdir} → .ai/skills`);
  created++;
}

console.log(`\n✨ Done! ${created} link(s) created, ${skipped} already up to date.`);

