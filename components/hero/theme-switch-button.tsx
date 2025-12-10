"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

import DarkThemeIcon from "@/components/icons/dark-theme";
import LightThemeIcon from "@/components/icons/light-theme";
import { Button } from "@/components/ui/button";

export default function ThemeChanger() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  if (!mounted) {
    return null;
  }

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
        <LightThemeIcon aria-label="Light theme icon" className="h-6 w-6" />
      ) : (
        <DarkThemeIcon aria-label="Dark theme icon" className="h-6 w-6" />
      )}
    </Button>
  );
}
