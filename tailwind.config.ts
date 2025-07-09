import containerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        monospace: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gray: {
          50: "#f7f8fa",
          100: "#eef1f5",
          200: "#dde2ea",
          300: "#c4cdd8",
          400: "#8d99a9",
          500: "#5d6b7c",
          600: "#3e4a59",
          700: "#2a3441",
          800: "#141a23",
          850: "#131720",
          900: "#0c1218",
          950: "#080c11",
        },
        lightGray: {
          50: "#ffffff",
          100: "#fafbfc",
          200: "#f4f6f8",
          300: "#e8ecf1",
          400: "#d3d9e0",
          500: "#b4bcc8",
          600: "#8f99a8",
          700: "#6e7a8c",
          800: "#4e5b6e",
          850: "#3a4655",
          900: "#2a3441",
          950: "#1a1f27",
        },
      },
      borderRadius: {
        xs: "0.125rem",
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [containerQueries, typography],
};
export default config;
