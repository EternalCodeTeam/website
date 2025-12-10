"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "danger"
  | "contrast";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  animate?: boolean;
  shine?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  // Relaxed type to allow Framer Motion props without explicit interface bloat
  // biome-ignore lint/suspicious/noExplicitAny: Intentional for Framer Motion props
  [key: string]: any;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md border border-transparent",
  secondary:
    "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 border border-transparent",
  outline:
    "border border-gray-200 bg-transparent hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
  ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent",
  link: "bg-transparent text-blue-600 underline-offset-4 hover:underline dark:text-blue-400 p-0 h-auto border-transparent",
  danger:
    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 shadow-sm border border-transparent hover:shadow-red-500/20",
  contrast:
    "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 shadow-sm hover:shadow-lg dark:hover:shadow-blue-500/20 border border-transparent",
};

const sizes: Record<ButtonSize, string> = {
  xs: "h-7 px-3 text-xs rounded-md",
  sm: "h-9 px-4 text-sm rounded-lg",
  md: "h-11 px-6 py-2 text-sm rounded-lg",
  lg: "h-12 px-8 py-3 text-base rounded-xl",
  xl: "h-14 px-10 py-4 text-lg rounded-xl",
};

const MotionLink = motion.create(Link);

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      leftIcon,
      rightIcon,
      fullWidth = false,
      animate = true,
      shine = false,
      href,
      children,
      ...props
    },
    ref
  ) => {
    const isLink = Boolean(href);
    const shouldAnimate = animate && variant !== "ghost" && variant !== "link";

    const baseStyles = cn(
      "group relative inline-flex cursor-pointer select-none items-center justify-center overflow-visible font-medium transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      fullWidth ? "w-full" : "",
      variants[variant as ButtonVariant],
      sizes[size as ButtonSize],
      className
    );

    const animationProps = shouldAnimate
      ? {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.97 },
          transition: { type: "spring" as const, stiffness: 400, damping: 25 },
        }
      : {};

    const content = (
      <>
        {shine && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <div className="-translate-x-[100%] absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%]" />
          </div>
        )}
        <div className="relative z-10 flex items-center justify-center gap-2">
          {leftIcon && <span className="flex shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex shrink-0">{rightIcon}</span>}
        </div>
      </>
    );

    if (isLink && href) {
      return (
        <MotionLink
          className={baseStyles}
          href={href}
          // biome-ignore lint/suspicious/noExplicitAny: Ref compatibility
          ref={ref as any}
          {...animationProps}
          {...props}
        >
          {content}
        </MotionLink>
      );
    }

    return (
      <motion.button
        // biome-ignore lint/suspicious/noExplicitAny: Ref compatibility
        className={baseStyles}
        disabled={props.disabled}
        ref={ref as any}
        type={props.type === "submit" ? "submit" : "button"}
        {...animationProps}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
