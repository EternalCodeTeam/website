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
