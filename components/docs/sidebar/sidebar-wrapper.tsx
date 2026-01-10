"use client";

import Lenis from "lenis";
import type { FC } from "react";
import { useEffect, useRef } from "react";

import DocSidebar from "./doc-sidebar";
import DocsSearch from "./docs-search";

const SidebarWrapper: FC = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const sidebarElement = sidebarRef.current;
    if (!sidebarElement) {
      return;
    }

    const lenis = new Lenis({
      wrapper: sidebarElement,
      content: sidebarElement,
      lerp: 0.2,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="sticky top-32 flex h-[calc(100vh-8rem)] flex-col gap-4">
          <DocsSearch />
          <div
            className="scrollbar-hide flex min-h-0 flex-1 flex-col overflow-auto overscroll-contain rounded-xl border border-gray-200 bg-white/90 shadow-lg backdrop-blur-md transition-shadow hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/60"
            ref={sidebarRef}
          >
            <DocSidebar />
          </div>
        </div>
      </aside>

      <div className="flex flex-col gap-4 lg:hidden">
        <DocsSearch />
        <DocSidebar />
      </div>
    </>
  );
};

export default SidebarWrapper;
