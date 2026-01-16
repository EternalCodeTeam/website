"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface HotReloadProps {
  slug: string[];
  lastModified: number;
}

export function HotReload({ slug, lastModified }: HotReloadProps) {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/doc-check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });

        if (res.ok) {
          const data = (await res.json()) as { lastModified: number };

          if (data.lastModified > lastModified) {
            console.log("[HMR] Content changed, refreshing...");
            router.refresh(); // Soft refresh
          }
        }
      } catch (_e) {
        // Intentionally ignore fetch errors during hot reload checks
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [slug, lastModified, router]);

  return null;
}
