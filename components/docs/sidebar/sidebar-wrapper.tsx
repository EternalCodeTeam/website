"use client";

import Lenis from "lenis";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { SearchModal } from "@/components/docs/search/search-modal";
import { SearchTrigger } from "@/components/docs/search/search-trigger";
import { useSpotlight } from "@/hooks/use-spotlight";
import DocSidebar from "./doc-sidebar";
import type { DocItem } from "./types";

interface SidebarWrapperProps {
  sidebarStructure: DocItem[];
}

const SidebarWrapper: FC<SidebarWrapperProps> = ({ sidebarStructure }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const spotlight = useSpotlight<HTMLDivElement>();

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="sticky top-32 flex h-[calc(100vh-8rem)] flex-col gap-4">
          <SearchTrigger onClick={() => setIsSearchOpen(true)} />
          <div
            className="spotlight-card scrollbar-hide relative flex min-h-0 flex-1 flex-col overflow-auto overscroll-contain rounded-xl border border-gray-200 bg-white/90 shadow-lg backdrop-blur-md transition-shadow hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/60"
            onPointerLeave={spotlight.onPointerLeave}
            onPointerMove={spotlight.onPointerMove}
            ref={sidebarRef}
          >
            <DocSidebar sidebarStructure={sidebarStructure} />
          </div>
        </div>
      </aside>

      <div className="flex flex-col gap-4 lg:hidden">
        <SearchTrigger onClick={() => setIsSearchOpen(true)} />
        <DocSidebar sidebarStructure={sidebarStructure} />
      </div>
    </>
  );
};

export default SidebarWrapper;
