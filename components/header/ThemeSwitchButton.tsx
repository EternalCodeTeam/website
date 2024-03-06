"use client";

import { useTheme } from "next-themes";
import DarkThemeIcon from "@/components/icons/dark-theme";
import LightThemeIcon from "@/components/icons/light-theme";

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  const { resolvedTheme } = useTheme();

  return (
    <button
      aria-label={`Change to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-md p-2 text-gray-800 dark:text-gray-200"
    >
      {resolvedTheme === "dark" ? (
        <LightThemeIcon className="h-6 w-6" />
      ) : (
        <DarkThemeIcon className="h-6 w-6" />
      )}
    </button>
  );
}
