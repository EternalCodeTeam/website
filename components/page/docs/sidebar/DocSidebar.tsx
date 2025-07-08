"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

import { cn } from "@/lib/utils";

import { docsStructure } from "./sidebar-structure";
import SidebarItem from "./SidebarItem";
import { DocSidebarProps } from "./types";
import { useMobileSidebar } from './useMobileSidebar';

const DocSidebar: React.FC<DocSidebarProps> = ({ className = "", onItemClick }) => {
  const pathname = usePathname();
  const { isOpen, isMobile, toggleSidebar, sidebarRef, toggleButtonRef, setIsOpen } = useMobileSidebar();

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && isMobile) {
        toggleSidebar();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, isMobile, toggleSidebar]);

  return (
    <>
      {isMobile && (
        <button
          ref={toggleButtonRef}
          onClick={toggleSidebar}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 dark:bg-gray-800 dark:text-white lg:hidden"
          aria-expanded={isOpen}
          aria-controls="doc-sidebar"
        >
          {isOpen ? (
            <>
              <X className="h-4 w-4" />
              <span>Close navigation</span>
            </>
          ) : (
            <>
              <Menu className="h-4 w-4" />
              <span>Open navigation</span>
            </>
          )}
        </button>
      )}

      {(isOpen || !isMobile) && (
        <nav
          ref={sidebarRef}
          id="doc-sidebar"
          className={cn(
            "w-full",
            isMobile
              ? "fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-white p-4 shadow-lg dark:bg-gray-900"
              : className
          )}
          role="navigation"
          aria-label="Documentation navigation"
        >
          <div className="space-y-1">
            {docsStructure.map((item, index) => (
              <SidebarItem
                key={item.path}
                item={item}
                level={0}
                isActive={pathname === item.path}
                onItemClick={(path) => {
                  onItemClick?.(path);
                  if (isMobile) setIsOpen(false);
                }}
                index={index}
              />
            ))}
          </div>
        </nav>
      )}

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default DocSidebar;
