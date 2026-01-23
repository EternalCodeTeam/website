"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { skeletonPulse, skeletonShimmer, type MotionCustom } from "@/lib/animations/variants";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

export function Skeleton({
  className = "",
  variant = "rectangular",
  width,
  height,
  animation = "pulse",
}: SkeletonProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animation !== "none" && !prefersReducedMotion;

  const baseClasses = "bg-gray-200 dark:bg-gray-800";
  const variantClasses = {
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  const style: React.CSSProperties = {
    width: width || (variant === "text" ? "100%" : undefined),
    height: height || (variant === "circular" ? width : undefined),
  };

  if (shouldAnimate && animation === "pulse") {
    return (
      <motion.div
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        custom={{ reduced: prefersReducedMotion, duration: 1.5 } satisfies MotionCustom}
        style={style}
        initial="initial"
        variants={skeletonPulse}
        animate="animate"
      />
    );
  }

  if (shouldAnimate && animation === "wave") {
    return (
      <div
        className={`relative overflow-hidden ${baseClasses} ${variantClasses[variant]} ${className}`}
        style={style}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-gray-700/20"
          custom={{ reduced: prefersReducedMotion, duration: 1.5 } satisfies MotionCustom}
          initial="initial"
          variants={skeletonShimmer}
          animate="animate"
        />
      </div>
    );
  }

  return <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} style={style} />;
}

// Convenience components for common use cases
export function TextSkeleton({
  lines = 1,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={`text-skeleton-${
            // biome-ignore lint/suspicious/noArrayIndexKey: because
            i
          }`}
          variant="text"
          width={i === lines - 1 ? "80%" : "100%"}
        />
      ))}
    </div>
  );
}

export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-lg border border-gray-200 p-4 dark:border-gray-800 ${className}`}>
      <Skeleton className="mb-4" height={200} variant="rectangular" />
      <Skeleton className="mb-2" variant="text" width="60%" />
      <TextSkeleton lines={2} />
    </div>
  );
}

export function SearchResultSkeleton() {
  return (
    <div className="space-y-2 p-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          className="flex items-start gap-3 rounded-lg p-3"
          key={`search-result-skeleton-${
            // biome-ignore lint/suspicious/noArrayIndexKey: because
            i
          }`}
        >
          <Skeleton height={16} variant="circular" width={16} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="90%" />
          </div>
        </div>
      ))}
    </div>
  );
}
