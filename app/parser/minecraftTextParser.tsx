import React from 'react';

export function parseMinecraftText(text: string): React.ReactNode {
  if (!text) return null;
  text = text.replace(/§/g, "&");
  const colorMap: Record<string, string> = {
    red: "#f55",
    green: "#5f5",
    blue: "#55f",
    yellow: "#ff5",
    black: "#000",
    white: "#fff",
    gold: "#fa0",
    gray: "#aaa",
    dark_gray: "#555",
    dark_red: "#a00",
    dark_blue: "#00a",
    dark_green: "#0a0",
    dark_aqua: "#0aa",
    dark_purple: "#a0a",
    aqua: "#5ff",
    light_purple: "#f5f",
  };
  const styleMap: Record<string, React.CSSProperties> = {
    bold: { fontWeight: "bold" },
    italic: { fontStyle: "italic" },
    underlined: { textDecoration: "underline" },
    strikethrough: { textDecoration: "line-through" },
    obfuscated: {},
    reset: {},
  };
  function parseTags(str: string): React.ReactNode {
    const colorTag = str.match(/^<([a-z_]+)>([\s\S]*)$/i);
    if (colorTag && colorMap[colorTag[1]]) {
      return (
        <span style={{ color: colorMap[colorTag[1]] }}>
          {parseTags(colorTag[2])}
        </span>
      );
    }
    const hexTag = str.match(/^<color:#([0-9a-fA-F]{6})>([\s\S]*)$/);
    if (hexTag) {
      return (
        <span style={{ color: `#${hexTag[1]}` }}>{parseTags(hexTag[2])}</span>
      );
    }
    for (const tag in styleMap) {
      const re = new RegExp(`^<${tag}>([\s\S]*)$`);
      const m = str.match(re);
      if (m) {
        return <span style={styleMap[tag]}>{parseTags(m[1])}</span>;
      }
    }
    const obf = str.match(/^<obfuscated>([\s\S]*)$/);
    if (obf) {
      return (
        <span className="font-minecraft-obfuscated">{parseTags(obf[1])}</span>
      );
    }
    const hexShort = str.match(
      /^<#([0-9a-fA-F]{6})>([\s\S]*)$/
    );
    if (hexShort) {
      return (
        <span style={{ color: `#${hexShort[1]}` }}>
          {parseTags(hexShort[2])}
        </span>
      );
    }
    return str;
  }
  return parseTags(text);
} 