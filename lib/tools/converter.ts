/**
 * Enhanced BBCode <-> Markdown Converter
 * Architecture: Mask & Process
 * 1. Tokenize (Mask) safe blocks like Code to prevent regex collisions.
 * 2. Process formatting (Headers, Tables, Lists).
 * 3. Detokenize (Unmask) to restore safe blocks.
 */

interface TokenMap {
  [key: string]: string;
}

/**
 * MASKING UTILITIES
 */
const TABLE_SEPARATOR_REGEX = /^\|[\s-:|]+\|$/;
const QUOTE_PREFIX_REGEX = /^> /;
const BBCODE_BLOCK_REGEX = /\[code(?:=([a-zA-Z0-9]+))?\]([\s\S]*?)\[\/code\]/i;
const MARKDOWN_BLOCK_REGEX = /```(\w+)?\n([\s\S]*?)\n```/;

const maskCodeBlocks = (text: string, tokenMap: TokenMap, mode: "md" | "bb"): string => {
  let masked = text;
  let counter = 0;

  if (mode === "md") {
    // Mask Fenced Code Blocks: ```lang ... ```
    masked = masked.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match) => {
      const token = `__CODE_BLOCK_${counter++}__`;
      tokenMap[token] = match; // Store ORIGINAL content
      return token;
    });
    // Mask Inline Code: `...`
    // Note: We normally convert this to [b], but we mask it FIRST to ensure
    // it doesn't get processed by italic/bold/header regexes.
    // However, for this specific "Table Fix" user request, they WANT `...` to become `[b]`.
    // If we mask it, we restore it as `...` later.
    // So we should NOT mask inline code if we intend to transform it later,
    // UNLESS we transform it explicitly during the "Process" phase.
    // Optimization: We will mask it to protect content, and then transform the *token content* or handle it in process.
    // Actually, for the Table fix, we want `text` inside ` to be processed? No, usually code is raw.
    // Let's mask it, but we'll need a way to transform it to `[b]` when unmasking or handle it separately.
    // Decision: Mask inline code now, but with a specific token type so we can restore it as [b] later if needed.
    masked = masked.replace(/`([^`]+)`/g, (match) => {
      const token = `__INLINE_CODE_${counter++}__`;
      tokenMap[token] = match;
      return token;
    });
  } else {
    // BBCode mode
    // [code=lang]...[/code] or [code]...[/code]
    masked = masked.replace(/\[code(?:=[a-zA-Z0-9]+)?\]([\s\S]*?)\[\/code\]/gi, (match) => {
      const token = `__CODE_BLOCK_${counter++}__`;
      tokenMap[token] = match;
      return token;
    });
  }

  return masked;
};

const unmaskToMarkdown = (text: string, tokenMap: TokenMap): string => {
  let unmasked = text;
  for (const token of Object.keys(tokenMap)) {
    const original = tokenMap[token];
    // Strategy: If token stored [code], convert to ```.
    // If it was inline, usually no tag, just restore.
    if (token.startsWith("__CODE_BLOCK_")) {
      const match = original.match(BBCODE_BLOCK_REGEX);
      if (match) {
        const lang = match[1] || "";
        const code = match[2];
        const replacement = `\`\`\`${lang}\n${code}\n\`\`\``;
        unmasked = unmasked.replace(token, replacement);
        continue;
      }
    }
    unmasked = unmasked.replace(token, original);
  }
  return unmasked;
};

const unmaskToBBCode = (text: string, tokenMap: TokenMap): string => {
  let unmasked = text;
  for (const token of Object.keys(tokenMap)) {
    const original = tokenMap[token];

    if (token.startsWith("__CODE_BLOCK_")) {
      const match = original.match(MARKDOWN_BLOCK_REGEX);
      if (match) {
        const lang = match[1] ? `=${match[1]}` : "";
        const code = match[2];
        const replacement = `[code${lang}]${code}[/code]`;
        unmasked = unmasked.replace(token, replacement);
        continue;
      }
    }

    if (token.startsWith("__INLINE_CODE_")) {
      // MD `code` -> BBCode [b] (User Request override)
      const content = original.substring(1, original.length - 1);
      const replacement = `[b]${content}[/b]`;
      unmasked = unmasked.replace(token, replacement);
      continue;
    }

    unmasked = unmasked.replace(token, original);
  }
  return unmasked;
};

const unmaskCodeBlocks = (text: string, tokenMap: TokenMap, mode: "md" | "bb"): string => {
  if (mode === "md") {
    return unmaskToMarkdown(text, tokenMap);
  }
  return unmaskToBBCode(text, tokenMap);
};

/**
 * CONVERTERS
 */

export const bbcodeToMarkdown = (text: string): string => {
  const tokenMap: TokenMap = {};

  // 1. Normalize
  let res = text.replace(/\r\n/g, "\n");

  // 2. Mask Code
  res = maskCodeBlocks(res, tokenMap, "md");

  // 3. Process Formatting

  // Headers
  // [size=7] -> #, [size=6] -> ##
  res = res.replace(/\[size=7\]([\s\S]*?)\[\/size\]/gi, "# $1");
  res = res.replace(/\[size=6\]([\s\S]*?)\[\/size\]/gi, "## $1");
  res = res.replace(/\[size=5\]([\s\S]*?)\[\/size\]/gi, "### $1");
  res = res.replace(/\[size=4\]([\s\S]*?)\[\/size\]/gi, "### $1"); // Map 4->3 to keep it visible

  // Also support [h1]..[h3]
  res = res.replace(/\[h1\]([\s\S]*?)\[\/h1\]/gi, "# $1");
  res = res.replace(/\[h2\]([\s\S]*?)\[\/h2\]/gi, "## $1");
  res = res.replace(/\[h3\]([\s\S]*?)\[\/h3\]/gi, "### $1");

  // Bold/Italic/etc
  res = res.replace(/\[b\]([\s\S]*?)\[\/b\]/gi, "**$1**");
  res = res.replace(/\[i\]([\s\S]*?)\[\/i\]/gi, "*$1*");
  res = res.replace(/\[u\]([\s\S]*?)\[\/u\]/gi, "<u>$1</u>"); // MD doesn't natively support U, use HTML
  res = res.replace(/\[s\]([\s\S]*?)\[\/s\]/gi, "~~$1~~");

  // Alignment (HTML)
  res = res.replace(/\[center\]([\s\S]*?)\[\/center\]/gi, '<div align="center">\n$1\n</div>');
  res = res.replace(/\[left\]([\s\S]*?)\[\/left\]/gi, '<div align="left">\n$1\n</div>');
  res = res.replace(/\[right\]([\s\S]*?)\[\/right\]/gi, '<div align="right">\n$1\n</div>');

  // Quotes
  // BBCode: [quote]text\nmore[/quote]
  // MD: > text\n> more
  res = res.replace(/\[quote\]([\s\S]*?)\[\/quote\]/gi, (_match, content) => {
    const trimmed = content.trim();
    return `${trimmed
      .split("\n")
      .map((line: string) => `> ${line}`)
      .join("\n")}\n`;
  });
  // Named quote
  res = res.replace(/\[quote=(.*?)\]([\s\S]*?)\[\/quote\]/gi, (_match, name, content) => {
    const trimmed = content.trim();
    const body = trimmed
      .split("\n")
      .map((line: string) => `> ${line}`)
      .join("\n");
    return `> **${name}** said:\n${body}\n`;
  });

  // Links & Images
  res = res.replace(/\[url=(.*?)\]([\s\S]*?)\[\/url\]/gi, "[$2]($1)");
  res = res.replace(/\[url\]([\s\S]*?)\[\/url\]/gi, "[$1]($1)");
  res = res.replace(/\[img\]([\s\S]*?)\[\/img\]/gi, "![]($1)");

  // Lists
  // [list][*]a[*]b[/list] -> - a\n- b
  // Simple parser for standard flat lists
  res = res.replace(/\[list\]([\s\S]*?)\[\/list\]/gi, (_match: string, content: string) => {
    return `${content
      .split("[*]")
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0)
      .map((item: string) => `- ${item}`)
      .join("\n")}\n`;
  });

  // Tables (BBCode -> MD)
  // [table][tr][td]A[/td][td]B[/td][/tr][/table]
  // We need to identify headers vs body. BBCode usually lacks this.
  // We will assume row 1 is header.
  if (res.includes("[table]")) {
    // Regex for full table block
    res = res.replace(/\[table\]([\s\S]*?)\[\/table\]/gi, (match: string, tableInner: string) => {
      const rows = tableInner.match(/\[tr\]([\s\S]*?)\[\/tr\]/gi);
      if (!rows) {
        return match;
      }

      let md = "";
      rows.forEach((row: string, i: number) => {
        // strip tags to split
        const cells = row.match(/\[td\]([\s\S]*?)\[\/td\]/gi);
        if (!cells) {
          return;
        }

        const cellContent = cells.map((c: string) => c.replace(/\[\/?td\]/g, "").trim());
        md += `| ${cellContent.join(" | ")} |\n`;

        if (i === 0) {
          // Add separator
          md += `| ${cellContent.map(() => "---").join(" | ")} |\n`;
        }
      });
      return `\n${md}\n`;
    });
  }

  // 4. Detokenize (Restore Code)
  res = unmaskCodeBlocks(res, tokenMap, "md");

  return res.trim();
};

export const markdownToBBCode = (text: string): string => {
  const tokenMap: TokenMap = {};

  // 1. Normalize
  let res = text.replace(/\r\n/g, "\n");

  // 2. Mask Code
  res = maskCodeBlocks(res, tokenMap, "bb");

  // 3. Process Formatting

  // Headers - Order matters! Longest first
  // # -> size 7, ## -> size 6
  res = res.replace(/^\s*#### (.*$)/gm, "[b][size=4]$1[/size][/b]");
  res = res.replace(/^\s*### (.*$)/gm, "[b][size=5]$1[/size][/b]");
  res = res.replace(/^\s*## (.*$)/gm, "[b][size=6]$1[/size][/b]");
  res = res.replace(/^\s*# (.*$)/gm, "[b][size=7]$1[/size][/b]");

  // Bold/Italic/Strike
  // Markdown uses * for both, so *text* is italic, **text** is bold.
  // Regex must be careful not to match ** inside *
  res = res.replace(/\*\*(?=\S)(.+?)(?<=\S)\*\*/g, "[b]$1[/b]");
  res = res.replace(/\*(?=\S)(.+?)(?<=\S)\*/g, "[i]$1[/i]");
  res = res.replace(/~~(?=\S)(.+?)(?<=\S)~~/g, "[s]$1[/s]");

  // HTML cleanup
  res = res.replace(/<br\s*\/?>/gi, "\n");
  res = res.replace(/<div align="center">([\s\S]*?)<\/div>/gi, "[center]$1[/center]");
  res = res.replace(/<b>([\s\S]*?)<\/b>/gi, "[b]$1[/b]");
  res = res.replace(/<i>([\s\S]*?)<\/i>/gi, "[i]$1[/i]");

  // Links & Images
  // Images first: ![alt](url) -> [img]url[/img]
  res = res.replace(/!\[(.*?)\]\((.*?)\)/g, "[img]$2[/img]");
  // Links: [text](url) -> [url=url]text[/url]
  res = res.replace(/\[(.*?)\]\((.*?)\)/g, "[url=$2]$1[/url]");

  // Explicit Anchor/Img tags (HTML)
  res = res.replace(/<img[^>]+src="([^"]+)"[^>]*>/gi, "[img]$1[/img]");
  res = res.replace(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, "[url=$1]$2[/url]");

  // Blockquotes
  // MD: > line\n> line
  // BBCode: [quote]line\nline[/quote]
  // We need to merge contiguous quoted lines.
  // Regex strategies for multiline prefix are tough.
  // Simple approach: Replace `^> ` with nothing, then wrap contiguous blocks?
  // Better: Identify block of lines starting with >
  res = res.replace(/((?:^> .*(?:\n|$))+)/gm, (match) => {
    const content = match
      .split("\n")
      .map((l) => l.replace(QUOTE_PREFIX_REGEX, ""))
      .join("\n")
      .trim();
    return `[quote]${content}[/quote]\n`;
  });

  // BADGE MERGING LOGIC (Preserved from v4)
  // Join [/img] \n [img] -> [/img]\n[img] (single newline)
  // Consume excessive blank lines between badges
  let oldRes = "";
  while (oldRes !== res) {
    oldRes = res;
    res = res.replace(/(\[\/img\]\[\/url\]|\[\/img\])\s*\n+\s*(\[url|\[img)/gi, "$1\n$2");
  }

  // Tables
  // Simple table line processor
  const lines = res.split("\n");
  const processedLines: string[] = [];
  let inTable = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Strict Table Line Check
    // Must start/end with |, have distinct content.
    // Avoid separator |---|
    if (trimmed.startsWith("|") && trimmed.endsWith("|") && trimmed.length > 2) {
      if (TABLE_SEPARATOR_REGEX.test(trimmed)) {
        continue; // Skip separator
      }

      if (!inTable) {
        processedLines.push("[table]");
        inTable = true;
      }

      const content = trimmed.substring(1, trimmed.length - 1);
      const cells = content
        .split("|")
        .map((c) => `[td]${c.trim()}[/td]`)
        .join("");
      processedLines.push(`[tr]${cells}[/tr]`);
    } else {
      if (inTable) {
        processedLines.push("[/table]");
        inTable = false;
      }
      processedLines.push(line);
    }
  }
  if (inTable) {
    processedLines.push("[/table]");
  }
  res = processedLines.join("\n");

  // Lists
  // - item -> [*] item
  // Wrap contiguous
  res = res.replace(/^\s*-\s+(.*$)/gm, "[*]$1");
  res = res.replace(/((?:\[\*].*?(\n|$))+)/g, "[list]\n$1[/list]\n");

  // 4. Detokenize (Restore Code)
  // This will handle the `...` -> `[b]...[/b]` transformation
  res = unmaskCodeBlocks(res, tokenMap, "bb");

  // 5. Final Polish (Squash newlines)
  res = res.replace(/\n{3,}/g, "\n\n");

  return res.trim();
};
