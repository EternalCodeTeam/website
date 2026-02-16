"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { cn } from "@/lib/utils";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const defaultLabel = useMemo(() => `Change to ${isDark ? "light" : "dark"} mode`, [isDark]);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nextTheme = isDark ? "light" : "dark";
    const root = document.documentElement;
    const transitionDocument = document as ViewTransitionDocument;

    if (!transitionDocument.startViewTransition || prefersReducedMotion) {
      setTheme(nextTheme);
      root.classList.toggle("dark", nextTheme === "dark");
      return;
    }

    await transitionDocument.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
        root.classList.toggle("dark", nextTheme === "dark");
      });
    }).ready;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    root.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [duration, isDark, setTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <button
      ref={buttonRef}
      {...props}
      aria-label={props["aria-label"] ?? defaultLabel}
      className={cn(
        "flex items-center justify-center rounded-full p-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
        className
      )}
      onClick={toggleTheme}
      type={props.type ?? "button"}
    >
      {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
