"use client";

import MiniMessage from "minimessage-js";
import { type FC, useMemo } from "react";
import "./minecraft-text-formatting.css";

type MinecraftTextProps = {
  text: string;
};

export const MinecraftText: FC<MinecraftTextProps> = ({ text }) => {
  const cleanedText = useMemo(() => sanitizeInput(text), [text]);

  const parsedElements = useMemo(() => {
    try {
      const miniMessageString = convertLegacyToMini(cleanedText);
      const deserialized = MiniMessage.miniMessage().deserialize(miniMessageString);
      const html = MiniMessage.toHTML(deserialized);

      // biome-ignore lint/security/noDangerouslySetInnerHtml: it's safe here
      return <span dangerouslySetInnerHTML={{ __html: html }} />;
    } catch {
      return <span>{cleanedText}</span>;
    }
  }, [cleanedText]);

  return (
    <span
      className="font-minecraft"
      style={{
        imageRendering: "pixelated",
        textRendering: "optimizeSpeed",
        WebkitFontSmoothing: "none",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      {parsedElements}
    </span>
  );
};

function sanitizeInput(input: string): string {
  if (!input) {
    return "";
  }
  return input
    .replaceAll("\0", "")
    .replaceAll("\r", "")
    .replaceAll("\n", "")
    .replaceAll("\v", "")
    .replaceAll("\u2028", "")
    .replaceAll("\u2029", "");
}

function convertLegacyToMini(text: string): string {
  const codeToTag: Record<string, string> = {
    "0": "black",
    "1": "dark_blue",
    "2": "dark_green",
    "3": "dark_aqua",
    "4": "dark_red",
    "5": "dark_purple",
    "6": "gold",
    "7": "gray",
    "8": "dark_gray",
    "9": "blue",
    a: "green",
    b: "aqua",
    c: "red",
    d: "light_purple",
    e: "yellow",
    f: "white",
    l: "bold",
    o: "italic",
    n: "underlined",
    m: "strikethrough",
    k: "obfuscated",
    r: "reset",
  };

  return text.replace(/[§&]([0-9A-FK-OR])/gi, (_, code) => {
    const key = code.toLowerCase();
    const tag = codeToTag[key];
    if (!tag) {
      return "";
    }
    return tag === "reset" ? "</reset>" : `<${tag}>`;
  });
}
