"use client";

import React from "react";

import { useTableVisibility } from "./useTableVisibility";

/**
 * Props for the TableWrapper component
 */
interface TableWrapperProps {
  /** Content to be wrapped */
  children: React.ReactNode;
  /** Unique identifier for the table wrapper */
  id: string;
  /** Delay in milliseconds before showing the table (default: 1500ms) */
  delay?: number;
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * TableWrapper component that handles visibility and animation of table content
 *
 * This component ensures tables are properly displayed and animated in the documentation.
 * It uses a MutationObserver to prevent tables from being hidden by other scripts.
 */
export default function TableWrapper({
  children,
  id,
  delay = 1500,
  className = "",
}: TableWrapperProps) {
  const { isVisible, wrapperRef } = useTableVisibility(delay);

  return (
    <div
      id={id}
      ref={wrapperRef}
      className={className}
      style={{
        display: isVisible ? "block" : "none",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}
