"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function HashScroll() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // biome-ignore lint/correctness/useExhaustiveDependencies: We want to trigger when path changes
  useEffect(() => {
    // Small delay to ensure layout is stable
    const timeoutId = setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "auto", block: "start" });
        }
      }
    }, 100); // 100ms delay to allow paint

    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams]);

  return null;
}
