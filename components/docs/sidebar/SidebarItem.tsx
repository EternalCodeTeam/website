import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, FileText, Folder, FolderOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC, type MouseEvent, memo, useCallback, useState } from "react";

import { DocIcon } from "@/components/docs/content/DocIcon";
import { cn } from "@/lib/utils";

import type { DocItemProps } from "./types";

const SidebarItem: FC<DocItemProps> = memo(({ item, level, onItemClick }) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  const isActive = pathname === item.path;
  const isChildActive = item.children?.some((child) => pathname.startsWith(child.path));

  const handleClick = useCallback(() => {
    onItemClick?.(item.path);
  }, [item.path, onItemClick]);

  const toggleExpanded = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsExpanded(!isExpanded);
    },
    [isExpanded]
  );

  const paddingLeft = level * 12 + 12;

  if (hasChildren) {
    return (
      <div className="mb-0.5">
        <motion.div
          className={cn(
            "group flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all",
            isChildActive
              ? "bg-blue-50/50 text-blue-700 dark:bg-blue-900/10 dark:text-blue-400"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          )}
          style={{ paddingLeft }}
          onClick={toggleExpanded}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleExpanded(e as unknown as MouseEvent<HTMLDivElement>);
            }
          }}
          role="button"
          tabIndex={0}
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
          </motion.div>

          {isExpanded ? (
            <FolderOpen className="h-4 w-4 flex-shrink-0 text-blue-500 dark:text-blue-400" />
          ) : (
            <Folder className="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500" />
          )}

          <span className="flex-1 truncate">{item.title}</span>

          {item.children && (
            <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gray-200 px-1.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {item.children.length}
            </span>
          )}
        </motion.div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-0.5 space-y-0.5">
                {item.children?.map((child, childIndex) => (
                  <SidebarItem
                    key={child.path}
                    item={child}
                    level={level + 1}
                    isActive={pathname === child.path}
                    onItemClick={onItemClick}
                    index={childIndex}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link href={item.path} onClick={handleClick}>
      <motion.div
        className={cn(
          "group mb-0.5 flex select-none items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
          isActive
            ? "bg-blue-600 font-medium text-white shadow-sm dark:bg-blue-600"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        )}
        style={{ paddingLeft }}
        whileHover={{ x: isActive ? 0 : 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {item.icon ? (
          <DocIcon
            iconName={item.icon}
            className={cn(
              "h-4 w-4 flex-shrink-0",
              isActive
                ? "text-white"
                : "text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-400"
            )}
            size={16}
          />
        ) : (
          <FileText
            className={cn(
              "h-4 w-4 flex-shrink-0",
              isActive
                ? "text-white"
                : "text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-400"
            )}
          />
        )}
        <span className="flex-1 truncate">{item.title}</span>

        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="h-2 w-2 rounded-full bg-white"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </motion.div>
    </Link>
  );
});

SidebarItem.displayName = "SidebarItem";

export default SidebarItem;
