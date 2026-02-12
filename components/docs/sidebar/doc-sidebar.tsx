"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronLeft, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Dropdown, type DropdownOption } from "@/components/ui/dropdown";
import { getDocProjectIcon } from "@/lib/docs-projects";
import { cn } from "@/lib/utils";
import { NetlifyHighlight } from "./netlify-highlight";
import SidebarItem from "./sidebar-item";
import type { DocSidebarProps } from "./types";

const DocSidebar: FC<DocSidebarProps> = ({ className = "", onItemClick, sidebarStructure }) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(false);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isOpen]);

  // Close on navigation
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally close on pathname change
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && isMobile) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, isMobile]);

  const closeSidebar = useCallback(() => setIsOpen(false), []);
  const toggleSidebar = useCallback(() => setIsOpen((v) => !v), []);

  const handleItemClick = useCallback(
    (path: string) => {
      onItemClick?.(path);
      if (isMobile) {
        setIsOpen(false);
      }
    },
    [isMobile, onItemClick]
  );

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="shrink-0 border-gray-200/80 border-b bg-gray-50/80 px-4 py-4 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/40">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-sm leading-tight dark:text-white">
              Documentation
            </h2>
            <p className="text-gray-500 text-xs dark:text-gray-400">Browse all topics</p>
          </div>
        </div>

        <div className="relative z-[100] mt-3">
          <Dropdown
            buttonClassName="h-9 text-xs"
            className="w-full"
            menuClassName="max-h-[300px] z-[100]"
            onChange={setSelectedProject}
            options={projectOptions}
            value={selectedProject}
          />
        </div>
      </div>

      <NetlifyHighlight />

      {/* Items */}
      <div className="scrollbar-hide flex-1 overflow-y-auto px-3 py-3">
        <div className="space-y-0.5">
          {filteredDocsStructure.map((item, index) => (
            <SidebarItem
              index={index}
              isActive={pathname === item.path}
              item={item}
              key={item.path}
              level={0}
              onItemClick={handleItemClick}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-gray-200/80 border-t bg-gray-50/80 px-4 py-3 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/40">
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-xs dark:text-gray-500">
            &copy; {new Date().getFullYear()} EternalCodeTeam
          </p>
          <Link
            className="text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            href="https://github.com/eternalcodeteam"
            rel="noopener noreferrer"
            target="_blank"
            title="GitHub"
          >
            <Github className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      {!!isMobile && (
        <button
          aria-controls="doc-sidebar"
          aria-expanded={isOpen}
          className="group mb-4 flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left font-medium text-gray-900 text-sm shadow-sm transition-all hover:border-blue-300 hover:shadow-md lg:hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:border-blue-700"
          onClick={toggleSidebar}
          type="button"
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
              "h-4 w-4 transition-transform duration-200",
              isOpen ? "rotate-90" : "-rotate-90"
            )}
          />
        </button>
      )}

      {/* Desktop sidebar */}
      {!isMobile && (
        <nav
          aria-label="Documentation navigation"
          className={cn("flex h-full flex-col", className)}
          id="doc-sidebar"
        >
          {sidebarContent}
        </nav>
      )}

      {/* Mobile sidebar portal */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {!!isMobile && !!isOpen && (
              <>
                <motion.div
                  animate={{ opacity: 1 }}
                  aria-hidden="true"
                  className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  onClick={closeSidebar}
                />
                <motion.nav
                  animate={{ x: 0 }}
                  aria-label="Documentation navigation"
                  className="fixed inset-y-0 left-0 z-[70] flex w-80 max-w-[85vw] flex-col overflow-hidden bg-white shadow-2xl dark:bg-gray-950"
                  exit={{ x: "-100%" }}
                  id="doc-sidebar-mobile"
                  initial={{ x: "-100%" }}
                  role="navigation"
                  transition={{ type: "spring", stiffness: 400, damping: 40 }}
                >
                  {/* Mobile header with close */}
                  <div className="flex items-center justify-between border-gray-100 border-b px-4 py-3 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-gray-900 text-sm dark:text-white">
                        Navigation
                      </span>
                    </div>
                    <button
                      aria-label="Close navigation"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                      onClick={closeSidebar}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Project dropdown */}
                  <div className="border-gray-100 border-b px-4 py-3 dark:border-gray-800">
                    <div className="relative z-[100]">
                      <Dropdown
                        buttonClassName="h-9 text-xs"
                        className="w-full"
                        menuClassName="max-h-[300px] z-[100]"
                        onChange={setSelectedProject}
                        options={projectOptions}
                        value={selectedProject}
                      />
                    </div>
                  </div>

                  {/* Items */}
                  <div className="scrollbar-hide flex-1 overflow-y-auto px-3 py-3">
                    <div className="space-y-0.5">
                      {filteredDocsStructure.map((item, index) => (
                        <SidebarItem
                          index={index}
                          isActive={pathname === item.path}
                          item={item}
                          key={item.path}
                          level={0}
                          onItemClick={handleItemClick}
                        />
                      ))}
                    </div>
                  </div>

                  <NetlifyHighlight />

                  {/* Footer */}
                  <div className="shrink-0 border-gray-100 border-t px-4 py-3 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400 text-xs dark:text-gray-500">
                        &copy; {new Date().getFullYear()} EternalCodeTeam
                      </p>
                      <Link
                        className="text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                        href="https://github.com/eternalcodeteam"
                        rel="noopener noreferrer"
                        target="_blank"
                        title="GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.nav>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default DocSidebar;
