"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { m } from "framer-motion";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { interactionSpring } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex cursor-pointer select-none items-center justify-center overflow-visible font-semibold transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--ec-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border border-transparent bg-[var(--ec-accent)] text-[var(--ec-accent-ink)] shadow-sm hover:shadow-md hover:brightness-105",
        secondary:
          "border border-[var(--ec-line)] bg-[var(--ec-soft)] text-[var(--ec-text)] hover:brightness-95 dark:hover:brightness-125",
        outline:
          "border border-[var(--ec-line)] bg-transparent text-[var(--ec-muted)] hover:bg-[var(--ec-soft)] hover:text-[var(--ec-text)]",
        ghost:
          "border border-transparent bg-transparent text-[var(--ec-muted)] hover:bg-[var(--ec-soft)] hover:text-[var(--ec-text)]",
        link: "h-auto border-transparent bg-transparent p-0 text-[var(--ec-accent)] underline-offset-4 hover:underline",
        danger:
          "border border-transparent bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-red-500/20 dark:bg-red-700 dark:hover:bg-red-800",
        contrast:
          "border border-transparent bg-[var(--ec-text)] text-[var(--ec-bg)] shadow-sm hover:bg-[var(--ec-accent)] hover:text-[var(--ec-accent-ink)] hover:shadow-lg",
      },
      size: {
        xs: "h-7 rounded-md px-3 text-xs",
        sm: "h-9 rounded-lg px-4 text-sm",
        md: "h-11 rounded-full px-6 py-2 text-sm",
        lg: "h-12 rounded-full px-8 py-3 text-sm",
        xl: "h-14 rounded-full px-10 py-4 text-base",
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
    // biome-ignore lint/suspicious/noExplicitAny: Intentional for Framer Motion props
    [key: string]: any;
  };

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
  ref?: Ref<HTMLButtonElement | HTMLAnchorElement>;
}) => {
  const isLink = Boolean(href);
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate =
    animate && variant !== "ghost" && variant !== "link" && !prefersReducedMotion;

  const baseStyles = cn(
    buttonVariants({ variant, size, fullWidth }),
    "transform-gpu will-change-transform",
    className
  );

  const animationProps = shouldAnimate
    ? {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.97 },
        transition: interactionSpring,
      }
    : {};

  const content = (
    <>
      {!!shine && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <div className="absolute inset-0 -translate-x-full transform-gpu bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out will-change-transform group-hover:translate-x-full" />
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
      <m.div
        className={cn("inline-flex transform-gpu will-change-transform", fullWidth ? "w-full" : "")}
        {...animationProps}
      >
        <Link
          className={baseStyles}
          href={href}
          // biome-ignore lint/suspicious/noExplicitAny: Ref compatibility
          ref={ref as any}
          // biome-ignore lint/suspicious/noExplicitAny: Props compatibility
          {...(props as any)}
        >
          {content}
        </Link>
      </m.div>
    );
  }

  return (
    <m.button
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
    </m.button>
  );
};
Button.displayName = "Button";

export { Button, buttonVariants };
