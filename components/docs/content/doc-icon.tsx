"use client";
// biome-ignore lint/performance/noNamespaceImport: Dynamic icon loading requires all icons to be imported
import * as LucideIcons from "lucide-react";
import type { ComponentType } from "react";

type DocIconProps = {
  iconName?: string;
  className?: string;
  size?: number;
};

export function DocIcon({ iconName, className = "", size = 24 }: DocIconProps) {
  if (!iconName) {
    return null;
  }

  const IconComponent = (
    LucideIcons as unknown as Record<
      string,
      ComponentType<{ className?: string; size?: number }> | undefined
    >
  )[iconName];

  return IconComponent ? <IconComponent className={className} size={size} /> : null;
}
