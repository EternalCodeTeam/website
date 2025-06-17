"use client";

import React, { useRef, useEffect, useState } from "react";
import DocSearch from "./DocSearch";
import DocSidebar from "./DocSidebar";

const SidebarWrapper = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Check if we've already animated before
    const hasAnimatedBefore = localStorage.getItem("sidebarHasAnimated") === "true";
    setHasAnimated(hasAnimatedBefore);
    setIsMounted(true);

    // If we haven't animated before, set the flag after animation completes
    if (!hasAnimatedBefore) {
      const timer = setTimeout(() => {
        localStorage.setItem("sidebarHasAnimated", "true");
        setHasAnimated(true);
      }, 1000); // Give enough time for animation to complete

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-full flex-shrink-0 lg:block lg:w-64">
        <div className="sticky top-32 z-20 flex flex-col gap-4" ref={sidebarRef}>
          <DocSearch />
          {isMounted && <DocSidebar hasAnimated={hasAnimated} />}
        </div>
      </aside>

      {/* Mobile sidebar - rendered directly in DocSidebar component */}
      <div className="lg:hidden">
        <DocSearch />
        {isMounted && <DocSidebar hasAnimated={hasAnimated} />}
      </div>
    </>
  );
};

export default SidebarWrapper; 