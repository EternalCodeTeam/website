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
      fontFamily: {
        monospace: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Custom gray palette based on EternalCode.pl design
        gray: {
          50: '#f7f8fa',   // Lightest (for text on dark backgrounds)
          100: '#eef1f5',  // Very light
          200: '#dde2ea',  // Light
          300: '#c4cdd8',  // Medium light
          400: '#8d99a9',  // Medium
          500: '#5d6b7c',  // Base gray
          600: '#3e4a59',  // Medium dark
          700: '#2a3441',  // Dark
          800: '#141a23',  // Your base color (main background)
          850: '#131720',  // Custom shade (darker sections)
          900: '#0c1218',  // Darkest (header/navigation background)
          950: '#080c11',  // Ultra dark
        },
        lightGray: {
          50: '#ffffff',
          100: '#f7f8fa',
          200: '#eef1f5',
          300: '#dde2ea',
          400: '#c4cdd8',
          500: '#8d99a9',
          600: '#5d6b7c',
          700: '#3e4a59',
          800: '#2a3441',
          850: '#141a23',
          900: '#10161e',
          950: '#0c1218',
        },
      },
      borderRadius: {
        'xs': '0.125rem',
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries"), require("@tailwindcss/typography")],
};
export default config;
