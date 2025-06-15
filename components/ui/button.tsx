"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React, { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link" | "danger";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  animate?: boolean;
  animationProps?: {
    hover?: Record<string, any>;
    tap?: Record<string, any>;
    transition?: Record<string, any>;
  };
  "data-testid"?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      animate = true,
      animationProps,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none";

    const variants: Record<ButtonVariant, string> = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800",
      secondary:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
      outline:
        "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800",
      ghost: "bg-transparent dark:bg-transparent",
      link: "bg-transparent text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
      danger: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
    };

    const sizes: Record<ButtonSize, string> = {
      xs: "h-6 px-2 text-xs",
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-12 px-6 py-3 text-base",
      xl: "h-14 px-8 py-4 text-lg",
    };

    const widthClass = fullWidth ? "w-full" : "";

    const LoadingSpinner = () => (
      <svg
        className="mr-2 h-4 w-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );

    const buttonContent = (
      <>
        {isLoading && <LoadingSpinner />}
        {!isLoading && leftIcon && (
          <span className="mr-2" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="ml-2" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </>
    );

    const buttonClasses = cn(baseStyles, variants[variant], sizes[size], widthClass, className);

    const defaultAnimationProps = {
      hover: { scale: 1.05 },
      tap: { scale: 0.95 },
      transition: { type: "spring", stiffness: 400, damping: 17 },
    };

    const finalAnimationProps = animationProps || defaultAnimationProps;

    const shouldAnimate = animate && variant !== "ghost" && variant !== "link";

    if (shouldAnimate) {
      const motionProps = {
        ref,
        className: buttonClasses,
        whileHover: finalAnimationProps.hover,
        whileTap: finalAnimationProps.tap,
        transition: finalAnimationProps.transition,
        disabled: isLoading || props.disabled,
        type: props.type,
        name: props.name,
        value: props.value,
        form: props.form,
        formAction: props.formAction,
        formMethod: props.formMethod,
        formTarget: props.formTarget,
        formNoValidate: props.formNoValidate,
        formEncType: props.formEncType,
        id: props.id,
        title: props.title,
        tabIndex: props.tabIndex,
        role: props.role,
        "aria-label": props["aria-label"],
        "aria-labelledby": props["aria-labelledby"],
        "aria-describedby": props["aria-describedby"],
        "aria-expanded": props["aria-expanded"],
        "aria-haspopup": props["aria-haspopup"],
        "aria-controls": props["aria-controls"],
        "aria-pressed": props["aria-pressed"],
        "aria-selected": props["aria-selected"],
        "aria-checked": props["aria-checked"],
        "aria-disabled": props["aria-disabled"],
        "aria-hidden": props["aria-hidden"],
        "aria-atomic": props["aria-atomic"],
        "aria-busy": props["aria-busy"],
        "aria-current": props["aria-current"],
        "aria-details": props["aria-details"],
        "aria-errormessage": props["aria-errormessage"],
        "aria-flowto": props["aria-flowto"],
        "aria-invalid": props["aria-invalid"],
        "aria-keyshortcuts": props["aria-keyshortcuts"],
        "aria-owns": props["aria-owns"],
        "aria-roledescription": props["aria-roledescription"],
        "aria-setsize": props["aria-setsize"],
        "aria-sort": props["aria-sort"],
        "aria-valuemax": props["aria-valuemax"],
        "aria-valuemin": props["aria-valuemin"],
        "aria-valuenow": props["aria-valuenow"],
        "aria-valuetext": props["aria-valuetext"],
        onClick: props.onClick,
      } as HTMLMotionProps<"button">;

      if (props["data-testid"]) {
        (motionProps as any)["data-testid"] = props["data-testid"];
      }

      return <motion.button {...motionProps}>{buttonContent}</motion.button>;
    }

    return (
      <button ref={ref} className={buttonClasses} disabled={isLoading || props.disabled} {...props}>
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
