import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, FileText, Folder, FolderOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC, type MouseEvent, memo, useCallback, useState } from "react";

import { DocIcon } from "@/components/docs/content/doc-icon";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { expandCollapse, rotateToggle, type MotionCustom } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

import type { DocItemProps } from "./types";

const SidebarItem: FC<DocItemProps> = memo(({ item, level, onItemClick }) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const prefersReducedMotion = useReducedMotion();

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
      <FolderItem
        isActive={!!isChildActive}
        isExpanded={isExpanded}
        item={item}
        level={level}
        onItemClick={onItemClick}
        onToggle={toggleExpanded}
        paddingLeft={paddingLeft}
        pathname={pathname}
        prefersReducedMotion={prefersReducedMotion}
      />
    );
  }

  return (
    <FileItem isActive={isActive} item={item} onClick={handleClick} paddingLeft={paddingLeft} />
  );
});

const FolderItem: FC<{
  item: DocItemProps["item"];
  level: number;
  isExpanded: boolean;
  isActive: boolean;
  paddingLeft: number;
  onToggle: (event: MouseEvent<HTMLDivElement>) => void;
  onItemClick?: (path: string) => void;
  pathname: string;
  prefersReducedMotion: boolean;
}> = ({
  item,
  level,
  isExpanded,
  isActive,
  paddingLeft,
  onToggle,
  onItemClick,
  pathname,
  prefersReducedMotion,
}) => (
  <div className="mb-0.5">
    <motion.div
      aria-expanded={isExpanded}
      className={cn(
        "group flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2 font-medium text-sm transition-all",
        isActive
          ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
      )}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onToggle(e as unknown as MouseEvent<HTMLDivElement>);
        }
      }}
      role="button"
      style={{ paddingLeft }}
      tabIndex={0}
    >
      <motion.div
        custom={{ reduced: prefersReducedMotion } satisfies MotionCustom}
        initial="collapsed"
        variants={rotateToggle}
        animate={isExpanded ? "expanded" : "collapsed"}
      >
        <ChevronRight className="h-4 w-4 shrink-0" />
      </motion.div>

      {isExpanded ? (
        <FolderOpen className="h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400" />
      ) : (
        <Folder className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
      )}

      <span className="flex-1 truncate">{item.title}</span>

      {!!item.children && (
        <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gray-200 px-1.5 font-medium text-gray-600 text-xs dark:bg-gray-700 dark:text-gray-300">
          {item.children.length}
        </span>
      )}
    </motion.div>

    <AnimatePresence initial={false}>
      {!!isExpanded && (
        <motion.div
          className="overflow-hidden"
          custom={{ reduced: prefersReducedMotion } satisfies MotionCustom}
          exit="hidden"
          initial="hidden"
          variants={expandCollapse}
          animate="visible"
        >
          <div className="mt-0.5 space-y-0.5">
            {item.children?.map((child, childIndex) => (
              <SidebarItem
                index={childIndex}
                isActive={pathname === child.path}
                item={child}
                key={child.path}
                level={level + 1}
                onItemClick={onItemClick}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FileItem: FC<{
  item: DocItemProps["item"];
  isActive: boolean;
  paddingLeft: number;
  onClick: () => void;
}> = ({ item, isActive, paddingLeft, onClick }) => (
  <Link href={item.path} onClick={onClick}>
    <motion.div
      className={cn(
        "group mb-0.5 flex select-none items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
        isActive
          ? "bg-blue-50 font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
      )}
      style={{ paddingLeft }}
    >
      {item.icon ? (
        <DocIcon
          className={cn(
            "h-4 w-4 shrink-0",
            isActive
              ? "text-blue-700 dark:text-blue-400"
              : "text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300"
          )}
          iconName={item.icon}
          size={16}
        />
      ) : (
        <FileText
          className={cn(
            "h-4 w-4 shrink-0",
            isActive
              ? "text-blue-700 dark:text-blue-400"
              : "text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300"
          )}
        />
      )}
      <span className="flex-1 truncate">{item.title}</span>
    </motion.div>
  </Link>
);

SidebarItem.displayName = "SidebarItem";

export default SidebarItem;
