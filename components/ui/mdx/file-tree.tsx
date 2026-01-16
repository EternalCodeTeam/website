"use client";

import { File, Folder, FolderOpen } from "lucide-react";
import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface FileTreeProps {
  children: ReactNode;
  className?: string;
}

export function FileTree({ children, className }: FileTreeProps) {
  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm dark:border-gray-800 dark:bg-gray-900/50",
        className
      )}
    >
      {children}
    </div>
  );
}

interface FileTreeItemProps {
  name: string;
  type?: "file" | "directory";
  defaultOpen?: boolean;
  children?: ReactNode;
  className?: string;
}

export function FileTreeItem({
  name,
  type = "file",
  defaultOpen = false,
  children,
  className,
}: FileTreeItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const hasChildren = Boolean(children);

  if (type === "directory") {
    return (
      <div className={cn("select-none", className)}>
        <button
          className="flex cursor-pointer touch-manipulation items-center gap-2 py-1 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          onClick={() => hasChildren && setIsOpen(!isOpen)}
          type="button"
        >
          {isOpen ? (
            <FolderOpen className="h-4 w-4 text-blue-500" />
          ) : (
            <Folder className="h-4 w-4 text-blue-500" />
          )}
          <span>{name}</span>
        </button>
        {isOpen && hasChildren && (
          <div className="mt-1 ml-6 border-gray-300 border-l pl-4 dark:border-gray-700">
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2 py-1 text-gray-700 dark:text-gray-300", className)}>
      <File className="h-4 w-4 shrink-0 text-gray-500" />
      <span>{name}</span>
    </div>
  );
}
