import { ChevronRight, Folder } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, memo, useCallback, useState, MouseEvent } from "react";

import { cn } from "@/lib/utils";

import { DocItemProps } from "./types";

const SidebarItem: FC<DocItemProps> = memo(
  ({ item, level, onItemClick }) => {
    const pathname = usePathname();
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = item.children && item.children.length > 0;

    const isActive = pathname === item.path;

    const handleClick = useCallback(() => {
      onItemClick?.(item.path);
    }, [item.path, onItemClick]);

    const toggleExpanded = useCallback((event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsExpanded(!isExpanded);
    }, [isExpanded]);

    const paddingLeft = level * 16 + 8;

    if (hasChildren) {
      return (
        <div className="mb-1">
          <div
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md cursor-pointer transition-colors"
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
          >
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isExpanded ? "rotate-90" : "rotate-0"
              )}
            />
            <Folder className="h-4 w-4" />
            <span className="flex-1">{item.title}</span>
          </div>

          {isExpanded && (
            <div className="mt-1">
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
          )}
        </div>
      );
    }

    return (
      <Link
        href={item.path}
        onClick={handleClick}
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors mb-1",
          isActive
            ? "bg-blue-50 text-blue-700 font-medium dark:bg-blue-900/20 dark:text-blue-400"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        )}
        style={{ paddingLeft }}
      >
        <span className="flex-1">{item.title}</span>
      </Link>
    );
  }
);

SidebarItem.displayName = "SidebarItem";

export default SidebarItem;
