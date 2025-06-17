"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useCallback, useState, useEffect } from "react";

import Folder from "@/components/icons/folder";
import { cn } from "@/lib/utils";

import { docsStructure, DocItem } from "./sidebar-structure";

interface DocSidebarProps {
  className?: string;
  onItemClick?: (path: string) => void;
  hasAnimated?: boolean;
}

interface DocItemProps {
  item: DocItem;
  level: number;
  isActive: boolean;
  onItemClick?: (path: string) => void;
  index: number;
}

const sidebarStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
};

const sidebarFadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
      duration: 0.6,
    },
  },
};

const sidebarFadeInUp = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 16,
      mass: 0.8,
    },
  },
};

const DocItemComponent: React.FC<DocItemProps> = React.memo(
  ({ item, level, isActive, onItemClick, index }) => {
    const pathname = usePathname();
    const hasChildren = item.children && item.children.length > 0;

    const isPathActive = useCallback(
      (path: string) => {
        return pathname === path || pathname.startsWith(`${path}/`);
      },
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
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
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
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
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

const DocSidebar: React.FC<DocSidebarProps> = React.memo(({ className = "", onItemClick, hasAnimated = false }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      }
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isOpen) {
        const sidebar = document.getElementById("doc-sidebar");
        const toggleButton = document.getElementById("sidebar-toggle");

        if (
          sidebar &&
          !sidebar.contains(event.target as Node) &&
          toggleButton &&
          !toggleButton.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, isOpen]);

  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
                if (isMobile) {
                  setIsOpen(false);
                }
              }}
              index={index}
            />
          </li>
        ))}
      </motion.ul>
    ),
    [pathname, onItemClick, isMobile, hasAnimated]
  );

  return (
    <>
      {isMobile && (
        <button
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

      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.nav
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
