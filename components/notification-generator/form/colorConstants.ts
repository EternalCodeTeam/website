import { TagCategory, MinecraftColor } from "./types";

export const minecraftColors: MinecraftColor[] = [
  { name: "Black", hex: "#000000" },
  { name: "Dark Blue", hex: "#0000AA" },
  { name: "Dark Green", hex: "#00AA00" },
  { name: "Dark Aqua", hex: "#00AAAA" },
  { name: "Dark Red", hex: "#AA0000" },
  { name: "Dark Purple", hex: "#AA00AA" },
  { name: "Gold", hex: "#FFAA00" },
  { name: "Gray", hex: "#AAAAAA" },
  { name: "Dark Gray", hex: "#555555" },
  { name: "Blue", hex: "#5555FF" },
  { name: "Green", hex: "#55FF55" },
  { name: "Aqua", hex: "#55FFFF" },
  { name: "Red", hex: "#FF5555" },
  { name: "Light Purple", hex: "#FF55FF" },
  { name: "Yellow", hex: "#FFFF55" },
  { name: "White", hex: "#FFFFFF" },
];

export const allowedTags: Record<string, TagCategory> = {
  formatting: {
    pattern: /<[biu]><\/[biu]>|<st><\/st>/,
    tags: ["<b></b>", "<i></i>", "<u></u>", "<st></st>"],
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
