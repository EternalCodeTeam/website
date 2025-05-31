"use client";

import React, { useMemo, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Folder from "@/components/icons/folder";
import { docsStructure, DocItem } from "./sidebar-structure";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "./DocHeader";

interface DocSidebarProps {
  className?: string;
  onItemClick?: (path: string) => void;
}

interface DocItemProps {
  item: DocItem;
  level: number;
  isActive: boolean;
  onItemClick?: (path: string) => void;
  index: number;
}

// Custom stagger container that ensures top-to-bottom animation
const sidebarStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15
    }
  }
};

// Custom fade in left for sidebar
const sidebarFadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
      duration: 0.6
    }
  }
};

// Custom fade in up variant with scale for items
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
      mass: 0.8
    }
  }
};

const DocItemComponent: React.FC<DocItemProps> = React.memo(
  ({ item, level, isActive, onItemClick, index }) => {
    const hasChildren = item.children && item.children.length > 0;

    const handleClick = useCallback(() => {
      onItemClick?.(item.path);
    }, [item.path, onItemClick]);

    if (hasChildren) {
      return (
        <motion.div 
          className={cn("mb-3", level === 0 && "first:mt-0")}
          variants={sidebarFadeInUp}
          custom={index}
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
          >
            <Folder
              className="-mt-0.5 mr-2 inline-block h-4 w-4 align-middle text-gray-500 dark:text-gray-400"
              aria-hidden="true"
            />
            {item.title}
          </motion.div>
          <motion.div 
            className="space-y-1" 
            role="list"
            variants={sidebarStaggerContainer}
            initial="hidden"
            animate="visible"
          >
            {item.children?.map((child, childIndex) => (
              <DocItemComponent
                key={child.path}
                item={child}
                level={level + 1}
                isActive={false}
                onItemClick={onItemClick}
                index={childIndex}
              />
            ))}
          </motion.div>
        </motion.div>
      );
    }

    return (
      <motion.div 
        variants={sidebarFadeInUp}
        custom={index}
      >
        <Link
          href={item.path}
          onClick={handleClick}
          className={cn(
            "block rounded-lg py-1 pl-4 text-sm font-medium transition-colors",
            isActive
              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          )}
          aria-current={isActive ? "page" : undefined}
        >
          <motion.span
            className="flex items-center"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
          >
            {item.title}
            {isActive && (
              <motion.div
                layoutId="activeSidebarItem"
                className="ml-2 h-1.5 w-1.5 rounded-full bg-blue-500"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.span>
        </Link>
      </motion.div>
    );
  }
);

DocItemComponent.displayName = "DocItemComponent";

const DocSidebar: React.FC<DocSidebarProps> = ({
  className = "",
  onItemClick,
}) => {
  const pathname = usePathname();

  const sidebarContent = useMemo(
    () => (
      <motion.div 
        className="space-y-1"
        variants={sidebarStaggerContainer}
        initial="hidden"
        animate="visible"
      >
        {docsStructure.map((item, index) => (
          <DocItemComponent
            key={item.path}
            item={item}
            level={0}
            isActive={pathname === item.path}
            onItemClick={onItemClick}
            index={index}
          />
        ))}
      </motion.div>
    ),
    [pathname, onItemClick]
  );

  return (
    <motion.nav
      className={cn("w-full", className)}
      role="navigation"
      aria-label="Documentation navigation"
      variants={sidebarFadeInLeft}
      initial="hidden"
      animate="visible"
    >
      {sidebarContent}
    </motion.nav>
  );
};

DocSidebar.displayName = "DocSidebar";

export default React.memo(DocSidebar);
