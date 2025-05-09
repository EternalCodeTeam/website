"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Folder from "@/components/icons/folder";
import { docsStructure, DocItem } from "./sidebar-structure";

export default function DocSidebar() {
  const pathname = usePathname();

  const renderDocItem = (item: DocItem, level = 0) => {
    const isActive = pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.path} className={`ml-${level * 4}`}>
        {hasChildren ? (
          <div
            className={`flex select-none items-center rounded-lg px-3 py-2 font-medium text-gray-600 opacity-80 transition-colors dark:text-gray-400`}
          >
            <Folder className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </div>
        ) : (
          <Link
            href={item.path}
            className={`flex items-center rounded-lg px-3 py-2 transition-colors ${
              isActive
                ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            }`}
          >
            {hasChildren && <Folder className="mr-2 h-4 w-4" />}
            <span>{item.title}</span>
          </Link>
        )}
        {hasChildren && item.children && (
          <div className="mt-1">
            {item.children.map((child) => renderDocItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="sticky top-4">
      <div className="space-y-1">
        {docsStructure.map((item) => renderDocItem(item))}
      </div>
    </nav>
  );
}
