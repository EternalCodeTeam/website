"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Folder from "@/components/icons/folder";
import { docsStructure, DocItem } from "./sidebar-structure";

interface DocSidebarProps {
  className?: string;
}

const DocSidebar: React.FC<DocSidebarProps> = ({ className = "" }) => {
  const pathname = usePathname();

  const renderDocItem = React.useCallback((item: DocItem, level = 0) => {
    const isActive = pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      return (
        <div key={item.path} className={level === 0 ? "mb-3" : ""}>
          <div 
            className={`font-semibold text-sm mb-1 ${level > 0 ? "pl-4" : ""} text-gray-900 dark:text-white tracking-wide`}
            role="heading"
            aria-level={level + 1}
          >
            <Folder className="inline-block mr-2 -mt-0.5 w-4 h-4 text-gray-500 dark:text-gray-400 align-middle" aria-label="folder" />
            {item.title}
          </div>
          <div className="space-y-1" role="list">
            {item.children?.map((child) => renderDocItem(child, level + 1))}
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item.path}
        href={item.path}
        className={`block rounded-lg transition-colors font-medium text-sm pl-4 py-1 ${
          isActive
            ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {item.title}
      </Link>
    );
  }, [pathname]);

  const sidebarContent = useMemo(() => (
    <div className="space-y-1">
      {docsStructure.map((item) => renderDocItem(item))}
    </div>
  ), [renderDocItem]);

  return (
    <nav 
      className={className}
      role="navigation"
      aria-label="Documentation navigation"
    >
      {sidebarContent}
    </nav>
  );
};

export default React.memo(DocSidebar);
