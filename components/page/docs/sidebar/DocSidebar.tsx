"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useCallback } from "react";

import Folder from "@/components/icons/folder";
import { cn } from "@/lib/utils";

import { docsStructure, DocItem } from "../sidebar-structure";
import { sidebarStaggerContainer, sidebarFadeInLeft, sidebarFadeInUp, sidebarItemHover } from "./animations";
import { useMobileSidebar } from "./useMobileSidebar";

/**
 * Props for the DocSidebar component
 */
interface DocSidebarProps {
  /** Additional CSS classes to apply */
  className?: string;
  /** Callback function when a sidebar item is clicked */
  onItemClick?: (path: string) => void;
  /** Whether the sidebar has already been animated */
  hasAnimated?: boolean;
}

/**
 * Props for the DocItemComponent
 */
interface DocItemProps {
  /** The documentation item to render */
  item: DocItem;
  /** The nesting level of the item */
  level: number;
  /** Whether the item is currently active */
  isActive: boolean;
  /** Callback function when the item is clicked */
  onItemClick?: (path: string) => void;
  /** Index of the item in its parent's children array */
  index: number;
}

/**
 * Component for rendering a single documentation item in the sidebar
 */
const DocItemComponent: React.FC<DocItemProps> = React.memo(
  ({ item, level, isActive, onItemClick, index }) => {
    const pathname = usePathname();
    const hasChildren = item.children && item.children.length > 0;

    const isPathActive = useCallback(
      (path: string) => pathname === path || pathname.startsWith(`${path}/`),
      [pathname]
    );

    const handleClick = useCallback(() => {
      onItemClick?.(item.path);
    }, [item.path, onItemClick]);

    if (hasChildren) {
      return (
        <motion.div
          className={cn("mb-3", level === 0 && "first:mt-0")}
          variants={sidebarFadeInUp}
          custom={index}
          layout
        >
          <motion.div
            className={cn(
              "mb-1 text-sm font-semibold",
              level > 0 && "pl-4",
              "tracking-wide text-gray-900 dark:text-white"
            )}
            role="heading"
            aria-level={level + 1}
            whileHover={sidebarItemHover}
            layout
          >
            <Folder
              className="-mt-0.5 mr-2 inline-block h-4 w-4 align-middle text-gray-500 dark:text-gray-400"
              aria-hidden="true"
            />
            {item.title}
          </motion.div>
          <motion.ul
            className="list-none space-y-1"
            variants={sidebarStaggerContainer}
            layout
          >
            {item.children?.map((child, childIndex) => (
              <li key={child.path}>
                <DocItemComponent
                  item={child}
                  level={level + 1}
                  isActive={isPathActive(child.path)}
                  onItemClick={onItemClick}
                  index={childIndex}
                />
              </li>
            ))}
          </motion.ul>
        </motion.div>
      );
    }

    return (
      <motion.div variants={sidebarFadeInUp} custom={index} layout>
        <Link
          href={item.path}
          onClick={handleClick}
          className={cn(
            "relative block rounded-lg py-1 pl-4 pr-8 text-sm font-medium transition-colors",
            isActive
              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          )}
          aria-current={isActive ? "page" : undefined}
        >
          <motion.span
            className="flex w-full items-start"
            whileHover={sidebarItemHover}
            layout
          >
            <span className="block flex-1">{item.title}</span>
          </motion.span>
        </Link>
      </motion.div>
    );
  }
);

DocItemComponent.displayName = "DocItemComponent";

/**
 * Documentation sidebar component
 * 
 * Renders the navigation sidebar for the documentation pages
 * with support for both desktop and mobile views
 */
const DocSidebar: React.FC<DocSidebarProps> = React.memo(({ 
  className = "", 
  onItemClick, 
  hasAnimated = false 
}) => {
  const pathname = usePathname();
  const {
    isOpen,
    isMobile,
    toggleSidebar,
    sidebarRef,
    toggleButtonRef,
    setIsOpen,
  } = useMobileSidebar();

  const sidebarContent = useMemo(
    () => (
      <motion.ul
        className="list-none space-y-1"
        variants={sidebarStaggerContainer}
        initial={!hasAnimated ? "hidden" : false}
        animate={!hasAnimated ? "visible" : false}
        layout
      >
        {docsStructure.map((item, index) => (
          <li key={item.path}>
            <DocItemComponent
              item={item}
              level={0}
              isActive={pathname === item.path}
              onItemClick={(path) => {
                onItemClick?.(path);
                if (isMobile) setIsOpen(false);
              }}
              index={index}
            />
          </li>
        ))}
      </motion.ul>
    ),
    [pathname, onItemClick, isMobile, hasAnimated, setIsOpen]
  );

  return (
    <>
      {/* Mobile sidebar toggle button */}
      {isMobile && (
        <button
          ref={toggleButtonRef}
          id="sidebar-toggle"
          onClick={toggleSidebar}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
          aria-expanded={isOpen}
          aria-controls="doc-sidebar"
        >
          {isOpen ? (
            <>
              <X className="h-4 w-4" />
              <span>Close Navigation</span>
            </>
          ) : (
            <>
              <Menu className="h-4 w-4" />
              <span>Open Navigation</span>
            </>
          )}
        </button>
      )}

      {/* Sidebar navigation */}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.nav
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
            variants={sidebarFadeInLeft}
            initial={!hasAnimated ? "hidden" : false}
            animate={!hasAnimated ? "visible" : false}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            layout
          >
            {sidebarContent}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile sidebar backdrop */}
      {isMobile && isOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleSidebar}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </>
  );
});

DocSidebar.displayName = "DocSidebar";

export default DocSidebar;
