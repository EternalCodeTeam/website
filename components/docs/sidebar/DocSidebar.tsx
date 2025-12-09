"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronLeft, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC, useEffect } from "react";

import { docsStructure } from "@/lib/sidebar-structure";
import { cn } from "@/lib/utils";

import SidebarItem from "./SidebarItem";
import type { DocSidebarProps } from "./types";
import { useMobileSidebar } from "./useMobileSidebar";

const DocSidebar: FC<DocSidebarProps> = ({ className = "", onItemClick }) => {
  const pathname = usePathname();
  const { isOpen, isMobile, toggleSidebar, sidebarRef, toggleButtonRef, setIsOpen } =
    useMobileSidebar();
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && isMobile) {
        toggleSidebar();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, isMobile, toggleSidebar]);

  const sidebarContent = (
    <>
      {/* Sidebar Header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-gray-200 bg-gray-50/50 px-4 py-4 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/20">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-xs dark:bg-blue-500"
        >
          <BookOpen className="h-5 w-5 text-white" />
        </motion.div>
        <div className="flex flex-col">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Documentation</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Browse all topics</p>
        </div>
      </div>

      {/* Sidebar Content - Scrollable with hidden scrollbar */}
      <div className="scrollbar-hide flex-1 overflow-y-auto px-3 py-4">
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
      </div>

      {/* Sidebar Footer - Simple & Clean */}
      <div className="shrink-0 border-t border-gray-200 bg-gray-50/50 px-4 py-3 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/20">
        <div className="flex items-center justify-between">
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Up to date</span>
          </div>

          {/* GitHub Link */}
          <Link
            href="https://github.com/eternalcodeteam"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Github className="h-4 w-4 text-gray-500 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
            </motion.div>
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <motion.button
          ref={toggleButtonRef}
          onClick={toggleSidebar}
          className="group mb-4 flex w-full items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-xs transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-blue-700 lg:hidden"
          aria-expanded={isOpen}
          aria-controls="doc-sidebar"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-2">
            {isOpen ? (
              <X className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            ) : (
              <Menu className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            )}
            <span>{isOpen ? "Close navigation" : "Open navigation"}</span>
          </div>
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </motion.button>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <nav
          id="doc-sidebar"
          className={cn("flex h-full flex-col", className)}
          aria-label="Documentation navigation"
        >
          {sidebarContent}
        </nav>
      )}

      {/* Mobile Sidebar */}
      <AnimatePresence mode="wait">
        {isMobile && isOpen && (
          <motion.nav
            ref={sidebarRef}
            id="doc-sidebar-mobile"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
            role="navigation"
            aria-label="Documentation navigation"
          >
            {sidebarContent}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default DocSidebar;
