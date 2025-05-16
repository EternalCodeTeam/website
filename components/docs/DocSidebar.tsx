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

const DocItemComponent: React.FC<DocItemProps> = React.memo(({ 
  item, 
  level, 
  isActive,
  onItemClick 
}) => {
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = useCallback(() => {
    onItemClick?.(item.path);
  }, [item.path, onItemClick]);

  if (hasChildren) {
    return (
      <div className={cn("mb-3", level === 0 && "first:mt-0")}>
        <div 
          className={cn(
            "font-semibold text-sm mb-1",
            level > 0 && "pl-4",
            "text-gray-900 dark:text-white tracking-wide"
          )}
          role="heading"
          aria-level={level + 1}
        >
          <Folder 
            className="inline-block mr-2 -mt-0.5 w-4 h-4 text-gray-500 dark:text-gray-400 align-middle" 
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
        "block rounded-lg transition-colors font-medium text-sm pl-4 py-1",
        isActive
          ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {item.title}
    </Link>
  );
});

DocItemComponent.displayName = "DocItemComponent";

const DocSidebar: React.FC<DocSidebarProps> = ({ 
  className = "",
  onItemClick 
}) => {
  const pathname = usePathname();

  const sidebarContent = useMemo(() => (
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
  ), [pathname, onItemClick]);

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
