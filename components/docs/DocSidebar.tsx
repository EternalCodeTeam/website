"use client";

import React, { useMemo, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Folder from "@/components/icons/folder";
import { docsStructure, DocItem } from "./sidebar-structure";
import { cn } from "@/lib/utils";

interface DocSidebarProps {
  className?: string;
  onItemClick?: (path: string) => void;
}

interface DocItemProps {
  item: DocItem;
  level: number;
  isActive: boolean;
  onItemClick?: (path: string) => void;
}

const DocItemComponent: React.FC<DocItemProps> = React.memo(
  ({ item, level, isActive, onItemClick }) => {
    const hasChildren = item.children && item.children.length > 0;

    const handleClick = useCallback(() => {
      onItemClick?.(item.path);
    }, [item.path, onItemClick]);

    if (hasChildren) {
      return (
        <div className={cn("mb-3", level === 0 && "first:mt-0")}>
          <div
            className={cn(
              "mb-1 text-sm font-semibold",
              level > 0 && "pl-4",
              "tracking-wide text-gray-900 dark:text-white"
            )}
            role="heading"
            aria-level={level + 1}
          >
            <Folder
              className="-mt-0.5 mr-2 inline-block h-4 w-4 align-middle text-gray-500 dark:text-gray-400"
              aria-hidden="true"
            />
            {item.title}
          </div>
          <div className="space-y-1" role="list">
            {item.children?.map((child) => (
              <DocItemComponent
                key={child.path}
                item={child}
                level={level + 1}
                isActive={false}
                onItemClick={onItemClick}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
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
        {item.title}
      </Link>
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
      <div className="space-y-1">
        {docsStructure.map((item) => (
          <DocItemComponent
            key={item.path}
            item={item}
            level={0}
            isActive={pathname === item.path}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    ),
    [pathname, onItemClick]
  );

  return (
    <nav
      className={cn("w-full", className)}
      role="navigation"
      aria-label="Documentation navigation"
    >
      {sidebarContent}
    </nav>
  );
};

DocSidebar.displayName = "DocSidebar";

export default React.memo(DocSidebar);
