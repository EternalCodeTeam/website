"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex cursor-pointer select-none items-center justify-center overflow-visible font-medium transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border border-transparent bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md dark:bg-blue-500 dark:hover:bg-blue-600",
        secondary:
          "border border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
        outline:
          "border border-gray-200 bg-transparent hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-white",
        ghost: "border border-transparent bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
        link: "h-auto border-transparent bg-transparent p-0 text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
        danger:
          "border border-transparent bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-red-500/20 dark:bg-red-700 dark:hover:bg-red-800",
        contrast:
          "border border-transparent bg-gray-900 text-white shadow-sm hover:bg-gray-800 hover:shadow-lg dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 dark:hover:shadow-blue-500/20",
      },
      size: {
        xs: "h-7 rounded-md px-3 text-xs",
        sm: "h-9 rounded-lg px-4 text-sm",
        md: "h-11 rounded-lg px-6 py-2 text-sm",
        lg: "h-12 rounded-xl px-8 py-3 text-base",
        xl: "h-14 rounded-xl px-10 py-4 text-lg",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "ref"> &
  VariantProps<typeof buttonVariants> & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    animate?: boolean;
    shine?: boolean;
    href?: string;
    target?: string;
    rel?: string;
    // Relaxed type to allow Framer Motion props without explicit interface bloat
    // biome-ignore lint/suspicious/noExplicitAny: Intentional for Framer Motion props
    [key: string]: any;
  };

const MotionLink = motion.create(Link);

const Button = ({
  className,
  variant,
  size,
  fullWidth,
  leftIcon,
  rightIcon,
  animate = true,
  shine = false,
  href,
  children,
  ref,
  ...props
}: ButtonProps & {
  ref?: React.Ref<HTMLButtonElement | HTMLAnchorElement>;
}) => {
  const isLink = Boolean(href);
  const shouldAnimate = animate && variant !== "ghost" && variant !== "link";

  const baseStyles = cn(buttonVariants({ variant, size, fullWidth }), className);

  const animationProps = shouldAnimate
    ? {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.97 },
        transition: { type: "spring" as const, stiffness: 400, damping: 25 },
      }
    : {};

  const content = (
    <>
      {!!shine && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <div className="-translate-x-[100%] absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%]" />
        </div>
      )}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {!!leftIcon && <span className="flex shrink-0">{leftIcon}</span>}
        {children}
        {!!rightIcon && <span className="flex shrink-0">{rightIcon}</span>}
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
        // biome-ignore lint/suspicious/noExplicitAny: Props compatibility
        {...(props as any)}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      className={baseStyles}
      disabled={props.disabled}
      // biome-ignore lint/suspicious/noExplicitAny: Ref compatibility
      ref={ref as any}
      type={props.type === "submit" ? "submit" : "button"}
      {...animationProps}
      // biome-ignore lint/suspicious/noExplicitAny: Props compatibility
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
};
Button.displayName = "Button";

export { Button, buttonVariants };
