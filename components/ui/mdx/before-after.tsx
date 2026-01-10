"use client";

import { Check, X } from "lucide-react";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterProps {
  children: [ReactNode, ReactNode];
  className?: string;
}

export function BeforeAfter({ children, className }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) {
      return;
    }

    const { left, width } = el.getBoundingClientRect();
    const next = ((clientX - left) / width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) {
        return;
      }
      move("touches" in e ? e.touches[0].clientX : e.clientX);
    };

    const stop = () => {
      dragging.current = false;
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("mouseup", stop);
    document.addEventListener("touchend", stop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("mouseup", stop);
      document.removeEventListener("touchend", stop);
    };
  }, [move]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }

    const ro = new ResizeObserver(() => {
      el.style.height = `${el.scrollHeight}px`;
    });

    ro.observe(el);
    return () => {
      ro.disconnect();
    };
  }, []);

  const [before, after] = children;

  return (
    <div className={cn("relative my-6", className)}>
      <div
        aria-label="Comparison slider"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={position}
        className="relative select-none overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-black"
        onMouseDown={(e) => move(e.clientX)}
        onTouchStart={(e) => move(e.touches[0].clientX)}
        ref={containerRef}
        role="slider"
        tabIndex={0}
      >
        <div className="absolute inset-0">{after}</div>

        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          {before}
        </div>

        <div className="absolute top-0 bottom-0 w-px bg-blue-500" style={{ left: `${position}%` }}>
          <button
            aria-label="Drag to compare"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize"
            onMouseDown={() => {
              dragging.current = true;
            }}
            onTouchStart={() => {
              dragging.current = true;
            }}
            type="button"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-blue-500 shadow-lg">
              <div className="flex gap-1">
                <div className="h-4 w-0.5 bg-white" />
                <div className="h-4 w-0.5 bg-white" />
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="mt-2 text-center text-gray-500 text-sm">Drag to compare</div>
    </div>
  );
}

interface BeforeAfterItemProps {
  type: "before" | "after";
  title?: string;
  label?: string;
  children: ReactNode;
}

export function BeforeAfterItem({ type, title, label, children }: BeforeAfterItemProps) {
  const isBefore = type === "before";

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className={cn(
          "flex items-center justify-between border-b px-4 py-3",
          isBefore
            ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900"
            : "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900"
        )}
      >
        <div className="flex items-center gap-2">
          {isBefore ? (
            <X className="h-4 w-4 text-red-600 dark:text-red-400" />
          ) : (
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
          )}
          <span className="font-semibold text-sm">{title ?? (isBefore ? "Before" : "After")}</span>
        </div>

        {label && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 font-medium text-xs",
              isBefore
                ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100"
                : "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
            )}
          >
            {label}
          </span>
        )}
      </div>

      <div className="flex-1 bg-gray-50 p-4 dark:bg-black">{children}</div>
    </div>
  );
}
