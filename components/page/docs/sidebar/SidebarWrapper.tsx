"use client";

import React, { useRef, useEffect, useState } from "react";

import DocSidebar from "./DocSidebar";
import DocsSearch from "./DocsSearch";

/**
 * SidebarWrapper component that manages the documentation sidebar
 *
 * Handles animation state and responsive behavior for both desktop and mobile views
 */
const SidebarWrapper = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Check if sidebar has already been animated in a previous session
    const hasAnimatedBefore = localStorage.getItem("sidebarHasAnimated") === "true";
    setHasAnimated(hasAnimatedBefore);
    setIsMounted(true);

    // Set up animation end listener if sidebar hasn't been animated before
    if (!hasAnimatedBefore && sidebarRef.current) {
      const handleAnimationEnd = () => {
        localStorage.setItem("sidebarHasAnimated", "true");
        setHasAnimated(true);
      };

      sidebarRef.current.addEventListener('animationend', handleAnimationEnd);

      return () => {
        if (sidebarRef.current) {
          sidebarRef.current.removeEventListener('animationend', handleAnimationEnd);
        }
      };
    }
  }, []);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-full flex-shrink-0 lg:block lg:w-64">
        <div className="sticky top-32 z-20 flex flex-col gap-4" ref={sidebarRef}>
          <DocsSearch />
          {isMounted && <DocSidebar hasAnimated={hasAnimated} />}
        </div>
      </aside>

      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <DocsSearch />
        {isMounted && <DocSidebar hasAnimated={hasAnimated} />}
      </div>
    </>
  );
};

export default SidebarWrapper;
