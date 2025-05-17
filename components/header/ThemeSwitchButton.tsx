"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";
import DarkThemeIcon from "@/components/icons/dark-theme";
import LightThemeIcon from "@/components/icons/light-theme";

export default function ThemeChanger() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <button
      aria-label={`Change to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={toggleTheme}
      className="rounded-md p-2 text-gray-800 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
      type="button"
    >
      {resolvedTheme === "dark" ? (
        <LightThemeIcon className="h-6 w-6" aria-hidden="true" />
      ) : (
        <DarkThemeIcon className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
}
