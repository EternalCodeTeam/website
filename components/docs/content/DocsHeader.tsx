"use client";
import { ReactNode } from "react";

interface DocHeaderProps {
  category?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function DocsHeader({ category, title, description, actions }: DocHeaderProps) {
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

      <h1 className="mb-1 text-4xl font-extrabold tracking-tight">
        <span>{title}</span>
      </h1>

      {description && (
        <p className="text-muted-foreground mt-0 mb-0 text-lg">{description}</p>
      )}
    </div>
  );
}
