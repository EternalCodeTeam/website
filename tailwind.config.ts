import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        'xs': '0.125rem',    // 2px - for small elements like tags
        'sm': '0.25rem',     // 4px - for small buttons, inputs
        'md': '0.375rem',    // 6px - for medium elements like cards
        'lg': '0.5rem',      // 8px - for larger elements
        'xl': '0.75rem',     // 12px - for prominent elements
        '2xl': '1rem',       // 16px - for featured elements
        '3xl': '1.5rem',     // 24px - for hero sections
        'full': '9999px',    // for circular elements
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries"), require("@tailwindcss/typography")],
};
export default config;
