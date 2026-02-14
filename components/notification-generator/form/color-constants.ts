import type { MinecraftColor, TagCategory } from "./types";

export const minecraftColors: MinecraftColor[] = [
  { name: "Black", hex: "#000000", legacyCode: "&0" },
  { name: "Dark Blue", hex: "#0000AA", legacyCode: "&1" },
  { name: "Dark Green", hex: "#00AA00", legacyCode: "&2" },
  { name: "Dark Aqua", hex: "#00AAAA", legacyCode: "&3" },
  { name: "Dark Red", hex: "#AA0000", legacyCode: "&4" },
  { name: "Dark Purple", hex: "#AA00AA", legacyCode: "&5" },
  { name: "Gold", hex: "#FFAA00", legacyCode: "&6" },
  { name: "Gray", hex: "#AAAAAA", legacyCode: "&7" },
  { name: "Dark Gray", hex: "#555555", legacyCode: "&8" },
  { name: "Blue", hex: "#5555FF", legacyCode: "&9" },
  { name: "Green", hex: "#55FF55", legacyCode: "&a" },
  { name: "Aqua", hex: "#55FFFF", legacyCode: "&b" },
  { name: "Red", hex: "#FF5555", legacyCode: "&c" },
  { name: "Light Purple", hex: "#FF55FF", legacyCode: "&d" },
  { name: "Yellow", hex: "#FFFF55", legacyCode: "&e" },
  { name: "White", hex: "#FFFFFF", legacyCode: "&f" },
];

export const gradientPresets = [
  {
    name: "Rainbow",
    colors: ["#FF0000", "#FFAA00", "#FFFF55", "#00AA00", "#00AAAA", "#0000AA", "#AA00AA"],
  },
  { name: "Sunset", colors: ["#FF5555", "#FFAA00", "#FFFF55"] },
  { name: "Ocean", colors: ["#00AAAA", "#0000AA", "#5555FF"] },
  { name: "Fire", colors: ["#FFFF55", "#FFAA00", "#FF5555"] },
  { name: "Nature", colors: ["#55FF55", "#00AA00", "#00AAAA"] },
  { name: "Neon", colors: ["#FF55FF", "#55FFFF"] },
];

export const allowedTags: Record<string, TagCategory> = {
  formatting: {
    pattern: /<[biu]><\/[biu]>|<st><\/st>|<obf><\/obf>/,
    tags: ["<b></b>", "<i></i>", "<u></u>", "<st></st>", "<obf></obf>"],
  },
  color: {
    pattern: /<color:#[0-9a-fA-F]{6}><\/color>/,
    tags: ["<color:#000000></color>"],
  },
  gradient: {
    pattern: /<gradient:#[0-9a-fA-F]{6}(:#[0-9a-fA-F]{6})+><\/gradient>/,
    tags: ["<gradient:#000000:#FFFFFF></gradient>"],
  },
  minecraftColor: {
    pattern: /<[a-z_]+>/,
    tags: minecraftColors.map((color) => `<${color.name.toLowerCase().replace(/ /g, "_")}>`),
  },
  legacy: {
    pattern: /(?:§|&)[0-9a-fk-or]/i,
    tags: [...minecraftColors.map((color) => color.legacyCode), "&k", "&l", "&m", "&n", "&o", "&r"],
  },
  clickUrl: {
    pattern: /<click:open_url:'[^']*'><\/click>/,
    tags: ["<click:open_url:'url'></click>"],
  },
  clickCommand: {
    pattern: /<click:run_command:'[^']*'><\/click>/,
    tags: ["<click:run_command:'/command'></click>"],
  },
  suggestCommand: {
    pattern: /<click:suggest_command:'[^']*'><\/click>/,
    tags: ["<click:suggest_command:'/command'></click>"],
  },
  hover: {
    pattern: /<hover:show_text:'[^']*'><\/hover>/,
    tags: ["<hover:show_text:'text'></hover>"],
  },
};
