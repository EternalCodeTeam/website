"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VisibleSectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export default function VisibleSection({
  children,
  fallback = null,
  className,
  rootMargin = "200px 0px",
  threshold = 0.1,
  once = true,
}: VisibleSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && once) {
      return;
    }

    const node = sectionRef.current;
    if (!node) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible, once, rootMargin, threshold]);

  return (
    <div className={cn("w-full", className)} ref={sectionRef}>
      {isVisible ? children : fallback}
    </div>
  );
}
