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
  

  const colorCodeRegex = /&([0-9a-fk-or])/gi;
  const colorCodeMap: Record<string, string> = {
    '0': '#000', // black
    '1': '#00a', // dark_blue
    '2': '#0a0', // dark_green
    '3': '#0aa', // dark_aqua
    '4': '#a00', // dark_red
    '5': '#a0a', // dark_purple
    '6': '#fa0', // gold
    '7': '#aaa', // gray
    '8': '#555', // dark_gray
    '9': '#55f', // blue
    'a': '#5f5', // green
    'b': '#5ff', // aqua
    'c': '#f55', // red
    'd': '#f5f', // light_purple
    'e': '#ff5', // yellow
    'f': '#fff', // white
  };
  

  let processedText = text;
  let lastColor = '';
  let lastStyle = '';
  

  const parts: React.ReactNode[] = [];
  let currentText = '';
  let currentStyle: React.CSSProperties = {};
  
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '&' && i + 1 < text.length) {
      const code = text[i + 1].toLowerCase();
      

      if (currentText) {
        parts.push(
          <span key={i} style={currentStyle}>
            {currentText}
          </span>
        );
        currentText = '';
      }
      

      if (colorCodeMap[code]) {
        currentStyle = { ...currentStyle, color: colorCodeMap[code] };
        i++; // Skip the next character
      } 

      else if (code === 'l') {
        currentStyle = { ...currentStyle, fontWeight: 'bold' };
        i++;
      } else if (code === 'o') {
        currentStyle = { ...currentStyle, fontStyle: 'italic' };
        i++;
      } else if (code === 'n') {
        currentStyle = { ...currentStyle, textDecoration: 'underline' };
        i++;
      } else if (code === 'm') {
        currentStyle = { ...currentStyle, textDecoration: 'line-through' };
        i++;
      } else if (code === 'k') {

        parts.push(
          <span key={i} className="font-minecraft-obfuscated" style={currentStyle}>
            {text.substring(i + 2)}
          </span>
        );
        return <>{parts}</>;
      } else if (code === 'r') {

        currentStyle = {};
        i++;
      }
    } else {
      currentText += text[i];
    }
  }
  

  if (currentText) {
    parts.push(
      <span key="final" style={currentStyle}>
        {currentText}
      </span>
    );
  }
  

  if (parts.length > 0) {
    return <>{parts}</>;
  }
  

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