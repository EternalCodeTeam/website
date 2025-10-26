import { allowedTags } from "../colorConstants";

export const isValidTag = (tag: string): boolean =>
  Object.values(allowedTags).some(
    (category) => category.pattern.test(tag) || category.tags.includes(tag)
  );

export const toggleFormatting = (
  text: string,
  start: number,
  end: number,
  format: string
): { newValue: string; newCursorPosition: number } => {
  const selectedText = text.substring(start, end);
  const formatTags: Record<string, { open: string; close: string }> = {
    bold: { open: "<b>", close: "</b>" },
    italic: { open: "<i>", close: "</i>" },
    underline: { open: "<u>", close: "</u>" },
    strikethrough: { open: "<st>", close: "</st>" },
  };
  const { open, close } = formatTags[format];
  const regex = new RegExp(`^${open}.*?${close}$`);
  if (regex.test(selectedText)) {
    return {
      newValue:
        text.substring(0, start) +
        selectedText.substring(open.length, selectedText.length - close.length) +
        text.substring(end),
      newCursorPosition: end - (open.length + close.length),
    };
  }
  return {
    newValue: text.substring(0, start) + open + selectedText + close + text.substring(end),
    newCursorPosition: end + open.length + close.length,
  };
};

export const insertTag = (
  text: string,
  start: number,
  end: number,
  tag: string
): { newValue: string; newCursorPosition: number } => {
  if (!isValidTag(tag)) {
    console.warn(`Invalid tag format: ${tag}`);
    return { newValue: text, newCursorPosition: end };
  }
  if (start !== end) {
    const selectedText = text.substring(start, end);
    const tagWithContent = tag.replace("></", `>${selectedText}</`);
    return {
      newValue: text.substring(0, start) + tagWithContent + text.substring(end),
      newCursorPosition: start + tagWithContent.length,
    };
  }
  return {
    newValue: text.substring(0, start) + tag + text.substring(end),
    newCursorPosition: start + tag.length,
  };
};
