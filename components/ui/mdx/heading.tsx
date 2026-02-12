"use client";

import { Check, Link as LinkIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { createElement, type ElementType, type HTMLAttributes, useEffect, useState } from "react";
import { CopyToClipboard } from "@/components/ui/copy-to-clipboard";
import { cn } from "@/lib/utils";

interface HeadingProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  tag: ElementType;
}

export const Heading = ({ children, id, tag, className, ...props }: HeadingProps) => {
  const pathname = usePathname();
  const [link, setLink] = useState("");

  useEffect(() => {
    if (id && typeof window !== "undefined") {
      setLink(`${window.location.origin}${pathname}#${id}`);
    }
  }, [id, pathname]);

  return createElement(
    tag,
    {
      id,
      className: cn("group relative scroll-mt-24", className),
      ...props,
    },
    <span className="inline-flex w-full items-center">
      {children}
      {!!id && (
        <CopyToClipboard
          className="ml-2 inline-flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
          showIcon={false}
          text={link}
        >
          {({ copied }) => (
            <div className="inline-flex items-center justify-center rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300">
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <LinkIcon className="h-4 w-4" />
              )}
            </div>
          )}
        </CopyToClipboard>
      )}
    </span>
  );
};
