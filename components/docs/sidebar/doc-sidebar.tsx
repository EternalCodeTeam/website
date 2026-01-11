"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronLeft, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { docsStructure } from "@/lib/sidebar-structure";
import { cn } from "@/lib/utils";

import SidebarItem from "./sidebar-item";
import { NetlifyHighlight } from "./netlify-highlight";
import type { DocSidebarProps } from "./types";
import { useMobileSidebar } from "./use-mobile-sidebar";

const DocSidebar: FC<DocSidebarProps> = ({ className = "", onItemClick }) => {
  const pathname = usePathname();
  const { isOpen, isMobile, toggleSidebar, sidebarRef, toggleButtonRef, setIsOpen } =
    useMobileSidebar();
  const [isMounted, setIsMounted] = useState(false);
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
      <div className="flex shrink-0 items-center gap-3 border-gray-200 border-b bg-gray-50/50 px-4 py-4 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/20">
        <motion.div
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-xs dark:bg-blue-500"
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <BookOpen className="h-5 w-5 text-white" />
        </motion.div>
        <div className="flex flex-col">
          <h2 className="font-bold text-gray-900 text-sm dark:text-white">Documentation</h2>
          <p className="text-gray-500 text-xs dark:text-gray-400">Browse all topics</p>
        </div>
      </div>

      <NetlifyHighlight />

      {/* Sidebar Content - Scrollable with hidden scrollbar */}
      <div className="scrollbar-hide flex-1 px-3 py-4">
        <div className="space-y-1">
          {docsStructure.map((item, index) => (
            <SidebarItem
              index={index}
              isActive={pathname === item.path}
              item={item}
              key={item.path}
              level={0}
              onItemClick={(path) => {
                onItemClick?.(path);
                if (isMobile) {
                  setIsOpen(false);
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Sidebar Footer - Simple */}
      <div className="shrink-0 border-gray-200 border-t bg-gray-50/50 px-4 py-3 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/20">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-xs dark:text-gray-400">
            © {new Date().getFullYear()} EternalCodeTeam
          </p>
          <Link
            className="group"
            href="https://github.com/eternalcodeteam"
            rel="noopener noreferrer"
            target="_blank"
            title="GitHub"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Github className="h-4 w-4 text-gray-500 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
            </motion.div>
          </Link>
        </div>
      </div>
    </>
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {/* Mobile toggle button */}
      {!!isMobile && (
        <motion.button
          aria-controls="doc-sidebar"
          aria-expanded={isOpen}
          className="group mb-4 flex w-full items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 text-sm shadow-xs transition-all hover:border-blue-300 hover:shadow-md lg:hidden dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-blue-700"
          onClick={toggleSidebar}
          ref={toggleButtonRef}
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
          aria-label="Documentation navigation"
          className={cn("flex h-full flex-col", className)}
          id="doc-sidebar"
        >
          {sidebarContent}
        </nav>
      )}

      {isMounted &&
        createPortal(
          <>
            <AnimatePresence mode="wait">
              {!!isMobile && !!isOpen && (
                <motion.nav
                  animate={{ x: 0 }}
                  aria-label="Documentation navigation"
                  className="fixed inset-y-0 left-0 z-[70] flex w-72 flex-col overflow-auto overscroll-contain border-gray-200 border-r bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
                  exit={{ x: -280 }}
                  id="doc-sidebar-mobile"
                  initial={{ x: -280 }}
                  ref={sidebarRef}
                  role="navigation"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {sidebarContent}
                </motion.nav>
              )}
            </AnimatePresence>

            {!!isMobile && !!isOpen && (
              <motion.div
                animate={{ opacity: 1 }}
                aria-hidden="true"
                className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-xs lg:hidden"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                onClick={toggleSidebar}
              />
            )}
          </>,
          document.body
        )}
    </>
  );
};

export default DocSidebar;
