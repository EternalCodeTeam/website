"use client";

import { useTheme } from "next-themes";
import DarkThemeIcon from "@/components/icons/dark-theme";
import LightThemeIcon from "@/components/icons/light-theme";

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      {theme === "dark" ? (
        <button onClick={() => setTheme("light")}>
          <LightThemeIcon className="h-6 w-6 text-white" />
        </button>
      ) : (
        <button onClick={() => setTheme("dark")}>
          <DarkThemeIcon className="h-6 w-6 text-black" />
        </button>
      )}
    </div>
  );
}
