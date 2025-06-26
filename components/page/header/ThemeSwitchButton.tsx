"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";

import DarkThemeIcon from "@/components/icons/dark-theme";
import LightThemeIcon from "@/components/icons/light-theme";
import { Button } from "@/components/ui/button";

export default function ThemeChanger() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <Button
      variant="ghost"
      size="sm"
      className="rounded-full p-2"
      aria-label={`Change to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={toggleTheme}
      type="button"
    >
      {resolvedTheme === "dark" ? (
        <LightThemeIcon className="h-6 w-6" aria-hidden="true" />
      ) : (
        <DarkThemeIcon className="h-6 w-6" aria-hidden="true" />
      )}
    </Button>
  );
}
