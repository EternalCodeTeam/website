import type * as React from "react";
import { cn } from "@/lib/utils";

const Card = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-hidden rounded-2xl bg-white text-gray-950 shadow-sm ring-1 ring-gray-200 transition-all dark:bg-gray-900/40 dark:text-gray-50 dark:ring-gray-800",
      className
    )}
    {...props}
  />
);
Card.displayName = "Card";

const CardHeader = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);
CardHeader.displayName = "CardHeader";

const CardTitle = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { ref?: React.Ref<HTMLParagraphElement> }) => (
  <h3
    ref={ref}
    className={cn("font-bold text-2xl leading-none tracking-tight", className)}
    {...props}
  />
);
CardTitle.displayName = "CardTitle";

const CardDescription = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.Ref<HTMLParagraphElement> }) => (
  <p ref={ref} className={cn("text-muted-foreground text-sm", className)} {...props} />
);
CardDescription.displayName = "CardDescription";

const CardContent = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
);
CardContent.displayName = "CardContent";

const CardFooter = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
