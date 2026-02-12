"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronLeft, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Dropdown, type DropdownOption } from "@/components/ui/dropdown";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getDocProjectIcon } from "@/lib/docs-projects";
import { cn } from "@/lib/utils";
import { NetlifyHighlight } from "./netlify-highlight";
import SidebarItem from "./sidebar-item";
import type { DocSidebarProps } from "./types";
import { useMobileSidebar } from "./use-mobile-sidebar";

const DocSidebar: FC<DocSidebarProps> = ({ className = "", onItemClick, sidebarStructure }) => {
  const pathname = usePathname();
  const { isOpen, isMobile, toggleSidebar, sidebarRef, toggleButtonRef, setIsOpen } =
    useMobileSidebar();
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const currentProject = useMemo(() => {
    return (
      sidebarStructure.find((item) => pathname.startsWith(item.path))?.path ||
      sidebarStructure[0]?.path ||
      ""
    );
  }, [pathname, sidebarStructure]);

  const [selectedProject, setSelectedProject] = useState<string>(currentProject);

  useEffect(() => {
    setSelectedProject(currentProject);
  }, [currentProject]);

  const projectOptions: DropdownOption[] = useMemo(() => {
    return sidebarStructure.map((item) => {
      const Icon = getDocProjectIcon(item.path);
      return {
        value: item.path,
        label: item.title.charAt(0).toUpperCase() + item.title.slice(1),
        icon: <Icon className="h-4 w-4" />,
      };
    });
  }, [sidebarStructure]);

  const filteredDocsStructure = useMemo(() => {
    return sidebarStructure.filter((item) => item.path === selectedProject);
  }, [selectedProject, sidebarStructure]);

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
      <div className="relative z-10 flex shrink-0 flex-col gap-3 border-gray-200 border-b bg-gray-50/50 px-4 py-4 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/20">
        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-xs dark:bg-blue-500"
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            whileHover={{
              scale: prefersReducedMotion ? 1 : 1.1,
              rotate: prefersReducedMotion ? 0 : 5,
            }}
          >
            <BookOpen className="h-5 w-5 text-white" />
          </motion.div>
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900 text-sm dark:text-white">Documentation</h2>
            <p className="text-gray-500 text-xs dark:text-gray-400">Browse all topics</p>
          </div>
        </div>

        {/* Project Filter Dropdown */}
        <div className="relative z-[100] mt-2">
          <Dropdown
            buttonClassName="h-10 text-xs"
            className="w-full"
            menuClassName="max-h-[300px] z-[100]"
            onChange={setSelectedProject}
            options={projectOptions}
            value={selectedProject}
          />
        </div>
      </div>

      <NetlifyHighlight />

      {/* Sidebar Content - Scrollable with hidden scrollbar */}
      <div
        className="scrollbar-hide flex-1 px-3 py-4"
        style={{ contentVisibility: "auto", containIntrinsicSize: "320px 800px" }}
      >
        <div className="space-y-1">
          {filteredDocsStructure.map((item, index) => (
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
            <motion.div
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
            >
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
          className="group mb-4 flex w-full items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 text-sm shadow-xs transition-[border-color,box-shadow,background-color,transform] hover:border-blue-300 hover:shadow-md lg:hidden dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-blue-700"
          onClick={toggleSidebar}
          ref={toggleButtonRef}
          whileHover={{ scale: prefersReducedMotion ? 1 : 1.01 }}
          whileTap={{ scale: prefersReducedMotion ? 1 : 0.99 }}
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
              "h-4 w-4 transform-gpu transition-transform duration-300 will-change-transform",
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
                  exit={{ x: prefersReducedMotion ? 0 : -280 }}
                  id="doc-sidebar-mobile"
                  initial={{ x: prefersReducedMotion ? 0 : -280 }}
                  ref={sidebarRef}
                  role="navigation"
                  transition={{
                    type: prefersReducedMotion ? "tween" : "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: prefersReducedMotion ? 0 : undefined,
                  }}
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
