import React, { FC, useMemo } from 'react';
import MiniMessage from 'minimessage-js';

interface MinecraftTextProps {
  text: string;
}

export const MinecraftText: FC<MinecraftTextProps> = ({ text }) => {
  const cleanedText = useMemo(() => sanitizeInput(text), [text]);

  const htmlOutput = useMemo(() => {
    try {
      const miniMessageString = convertLegacyToMini(cleanedText);
      const deserialized = MiniMessage.miniMessage().deserialize(miniMessageString);
      return MiniMessage.toHTML(deserialized);
    } catch (error) {
      console.warn('MiniMessage parse failed, falling back to legacy parser:', error);
      return null;
    }
  }, [cleanedText]);

  if (htmlOutput) {
    return (
      <span className="font-minecraft" dangerouslySetInnerHTML={{ __html: htmlOutput }} />
    );
  }

  return <>{renderLegacy(cleanedText)}</>;
};

function sanitizeInput(input: string): string {
  if (!input) return '';
  return input.replace(/\x00|\u0000|[\r\n\v\u2028\u2029]/g, '');
}

function convertLegacyToMini(text: string): string {
  const codeToTag: Record<string, string> = {
    '0': 'black','1': 'dark_blue','2': 'dark_green','3': 'dark_aqua',
    '4': 'dark_red','5': 'dark_purple','6': 'gold','7': 'gray',
    '8': 'dark_gray','9': 'blue','a': 'green','b': 'aqua',
    'c': 'red','d': 'light_purple','e': 'yellow','f': 'white',
    'l': 'bold','o': 'italic','n': 'underlined','m': 'strikethrough',
    'k': 'obfuscated','r': 'reset'
  };
  return text.replace(/§([0-9A-FK-OR])/gi, (_, code) => {
    const key = code.toLowerCase();
    const tag = codeToTag[key];
    if (!tag) return '';
    return tag === 'reset' ? '</reset>' : `<${tag}>`;
  });
}

function renderLegacy(text: string): React.ReactNode[] {
  const output: React.ReactNode[] = [];
  let buffer = '';
  let currentStyle: React.CSSProperties = {};

  const flushBuffer = (key: number) => {
    if (buffer) {
      output.push(
        <span key={key} style={currentStyle}>{buffer}</span>
      );
      buffer = '';
    }
  };

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '§' && i + 1 < text.length) {
      const code = text[i + 1].toLowerCase();
      flushBuffer(i);
      i++;
      switch (code) {
        case 'l':
          currentStyle = { ...currentStyle, fontWeight: 'bold' };
          break;
        case 'o':
          currentStyle = { ...currentStyle, fontStyle: 'italic' };
          break;
        case 'n':
          currentStyle = { ...currentStyle, textDecoration: 'underline' };
          break;
        case 'm':
          currentStyle = { ...currentStyle, textDecoration: 'line-through' };
          break;
        case 'r':
          currentStyle = {};
          break;
        case 'k':
          return [
            ...output,
            <span key={i} className="font-minecraft-obfuscated" style={currentStyle}>
              {text.slice(i + 1)}
            </span>
          ];
        default:
          if (/^[0-9a-f]$/.test(code)) {
            currentStyle = { ...currentStyle, color: getLegacyColor(code) };
          }
      }
    } else {
      buffer += text[i];
    }
  }

  flushBuffer(text.length + 1);
  return output;
}

function getLegacyColor(code: string): string {
  const colors: Record<string, string> = {
    '0': '#000000','1': '#0000AA','2': '#00AA00','3': '#00AAAA',
    '4': '#AA0000','5': '#AA00AA','6': '#FFAA00','7': '#AAAAAA',
    '8': '#555555','9': '#5555FF','a': '#55FF55','b': '#55FFFF',
    'c': '#FF5555','d': '#FF55FF','e': '#FFFF55','f': '#FFFFFF'
  };
  return colors[code] ?? '#FFFFFF';
}
