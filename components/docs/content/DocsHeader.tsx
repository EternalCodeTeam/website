"use client";
import type { ReactNode } from "react";

import { DocIcon } from "./DocIcon";

interface DocHeaderProps {
  category?: string;
  title: string;
  description?: string;
  icon?: string;
  actions?: ReactNode;
}

export function DocsHeader({ category, title, description, icon, actions }: DocHeaderProps) {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between gap-4">
        {category && (
          <div
            className="text-muted-foreground text-sm uppercase tracking-wide"
            style={{ letterSpacing: "0.08em" }}
          >
            {category}
          </div>
        )}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      <div className="flex items-center gap-3">
        {icon && (
          <DocIcon iconName={icon} className="text-primary-600 dark:text-primary-400" size={32} />
        )}
        <h1 className="mb-1 text-4xl font-extrabold tracking-tight">
          <span>{title}</span>
        </h1>
      </div>

      {description && <p className="text-muted-foreground mb-0 mt-0 text-lg">{description}</p>}
    </div>
  );
}
