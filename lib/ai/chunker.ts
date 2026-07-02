const MAX_CHUNK_CHARS = 1200;
const MIN_CHUNK_CHARS = 60;
const PARAGRAPH_SPLIT_REGEX = /\n\n+/;
const HEADING_REGEX = /^(#{1,3})\s+(.+)/;

export interface ChunkDraft {
  anchor: string;
  text: string;
}

function toSlug(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function stripMarkdown(raw: string): string {
  return raw
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[*_]{1,3}([^*_]+)[*_]{1,3}/gm, "$1")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/^>\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function splitByParagraph(text: string, anchor: string, title: string): ChunkDraft[] {
  const paragraphs = text.split(PARAGRAPH_SPLIT_REGEX).filter((p) => p.trim().length > 0);
  const chunks: ChunkDraft[] = [];
  let current = "";

  for (const para of paragraphs) {
    if (current.length + para.length > MAX_CHUNK_CHARS && current.length >= MIN_CHUNK_CHARS) {
      chunks.push({ anchor, text: `${title}\n\n${current.trim()}` });
      current = para;
    } else {
      current += (current ? "\n\n" : "") + para;
    }
  }

  if (current.trim().length >= MIN_CHUNK_CHARS) {
    chunks.push({ anchor, text: `${title}\n\n${current.trim()}` });
  }

  return chunks;
}

export function chunkMarkdown(rawContent: string, pageTitle: string): ChunkDraft[] {
  const plain = stripMarkdown(rawContent);
  const lines = plain.split("\n");

  const sections: Array<{ anchor: string; heading: string; lines: string[] }> = [];
  let currentAnchor = "introduction";
  let currentHeading = pageTitle;
  let currentLines: string[] = [];

  const rawLines = rawContent.split("\n");

  for (const line of rawLines) {
    const match = HEADING_REGEX.exec(line);
    if (match) {
      if (currentLines.length > 0) {
        sections.push({ anchor: currentAnchor, heading: currentHeading, lines: currentLines });
      }
      currentHeading = match[2].trim();
      currentAnchor = toSlug(currentHeading);
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  if (currentLines.length > 0) {
    sections.push({ anchor: currentAnchor, heading: currentHeading, lines: currentLines });
  }

  if (sections.length === 0) {
    sections.push({ anchor: "introduction", heading: pageTitle, lines });
  }

  const chunks: ChunkDraft[] = [];

  for (const section of sections) {
    const sectionText = stripMarkdown(section.lines.join("\n")).trim();
    if (sectionText.length < MIN_CHUNK_CHARS) {
      continue;
    }

    const prefix = `${pageTitle} — ${section.heading}`;

    if (sectionText.length <= MAX_CHUNK_CHARS) {
      chunks.push({ anchor: section.anchor, text: `${prefix}\n\n${sectionText}` });
    } else {
      const sub = splitByParagraph(sectionText, section.anchor, prefix);
      chunks.push(...sub);
    }
  }

  return chunks;
}
