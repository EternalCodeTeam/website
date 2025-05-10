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

    // Styl głównej kategorii
    if (hasChildren) {
      return (
        <div key={item.path} className={level === 0 ? "mb-3" : ""}>
          <div className={`font-extrabold text-base mb-1 ${level > 0 ? "pl-4" : ""} text-gray-900 dark:text-white`}>{item.title}</div>
          <div className="space-y-1">
            {item.children && item.children.map((child) => renderDocItem(child, level + 1))}
          </div>
        </div>
      );
    }

    // Styl podkategorii
    return (
      <Link
        key={item.path}
        href={item.path}
        className={`block rounded-lg transition-colors font-medium text-sm pl-4 py-1 ${
          isActive
            ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        }`}
      >
        {item.title}
      </Link>
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
