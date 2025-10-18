"use client";
import * as LucideIcons from "lucide-react";

interface DocIconProps {
  iconName?: string;
  className?: string;
  size?: number;
}

export function DocIcon({ iconName, className = "", size = 24 }: DocIconProps) {
  if (!iconName) return null;

  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent ? <IconComponent className={className} size={size} /> : null;
}
