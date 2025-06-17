"use client";

import React, { useRef, useEffect, useState } from "react";

import DocSearch from "./DocSearch";
import DocSidebar from "./DocSidebar";

const SidebarWrapper = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
   
    const hasAnimatedBefore = localStorage.getItem("sidebarHasAnimated") === "true";
    setHasAnimated(hasAnimatedBefore);
    setIsMounted(true);

   
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