"use client";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function ThemeChanger() {
  return (
    <AnimatedThemeToggler
      aria-label="Toggle theme"
      className="h-11 w-11 cursor-pointer rounded-full p-2"
    />
  );
}
