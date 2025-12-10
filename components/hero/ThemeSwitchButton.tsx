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
      aria-label={`Change to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      className="rounded-full p-2"
      onClick={toggleTheme}
      size="sm"
      type="button"
      variant="ghost"
    >
      {resolvedTheme === "dark" ? (
        <LightThemeIcon aria-hidden="true" className="h-6 w-6" />
      ) : (
        <DarkThemeIcon aria-hidden="true" className="h-6 w-6" />
      )}
    </Button>
  );
}
