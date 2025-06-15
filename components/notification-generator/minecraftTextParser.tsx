import MiniMessage from "minimessage-js";
import React, { FC, useMemo } from "react";
import "./minecraft-text-formatting.css";

interface MinecraftTextProps {
  text: string;
}

export const MinecraftText: FC<MinecraftTextProps> = ({ text }) => {
  const cleanedText = useMemo(() => sanitizeInput(text), [text]);

  const htmlOutput = useMemo(() => {
    try {
      const miniMessageString = convertLegacyToMini(cleanedText);
      console.log("MiniMessage Input:", miniMessageString);
      const deserialized = MiniMessage.miniMessage().deserialize(miniMessageString);
      const html = MiniMessage.toHTML(deserialized);
      console.log("MiniMessage HTML Output:", html);
      return html;
    } catch (error) {
      console.warn("MiniMessage parse failed:", error);
      return `<span>${cleanedText}</span>`;
    }
  }, [cleanedText]);

  return <span className="font-minecraft" dangerouslySetInnerHTML={{ __html: htmlOutput }} />;
};

function sanitizeInput(input: string): string {
  if (!input) return "";
  return input.replace(/\x00|\u0000|[\r\n\v\u2028\u2029]/g, "");
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
    if (!tag) return "";
    return tag === "reset" ? "</reset>" : `<${tag}>`;
  });
}
