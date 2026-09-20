"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const DocsSearchDialog = dynamic(
  () => import("./docs-search-dialog").then((module) => module.DocsSearchDialog),
  { ssr: false }
);

export function DocsSearch() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function showSearch(trigger?: HTMLElement | null) {
      triggerRef.current = trigger ?? (document.activeElement as HTMLElement | null);
      setMounted(true);
      setOpen(true);
    }

    function handleClick(event: MouseEvent) {
      const trigger = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-docs-search-trigger]"
      );
      if (trigger) {
        showSearch(trigger);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        showSearch();
      }
    }

    document.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function closeSearch() {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }

  return mounted ? <DocsSearchDialog onClose={closeSearch} open={open} /> : null;
}
