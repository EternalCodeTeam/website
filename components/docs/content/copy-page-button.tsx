"use client";

import {
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Copy, ExternalLink } from "lucide-react";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";

interface CopyPageButtonProps {
  content: string;
  title: string;
  pageUrl: string;
}

interface DropdownItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  action: () => void | Promise<void>;
}

export function CopyPageButton({ content, title, pageUrl }: CopyPageButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-end",
    middleware: [offset(6), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silently
    }
  }, [content]);

  const chatGptUrl = `https://chatgpt.com/?q=${encodeURIComponent(`Read this page and answer my questions: ${pageUrl}\n\nTitle: ${title}`)}`;
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(`Read this page and answer my questions: ${pageUrl}\n\nTitle: ${title}`)}`;

  const dropdownItems: DropdownItem[] = [
    {
      id: "copy",
      icon: <Copy className="h-4 w-4" />,
      label: "Copy page",
      description: "Copy page as Markdown for LLMs",
      action: handleCopy,
    },
    {
      id: "chatgpt",
      icon: (
        <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.679 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
        </svg>
      ),
      label: "Open in ChatGPT",
      description: "Ask questions about this page",
      action: () => {
        window.open(chatGptUrl, "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "claude",
      icon: (
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 256 257"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m50.228 170.321l50.357-28.257l.843-2.463l-.843-1.361h-2.462l-8.426-.518l-28.775-.778l-24.952-1.037l-24.175-1.296l-6.092-1.297L0 125.796l.583-3.759l5.12-3.434l7.324.648l16.202 1.101l24.304 1.685l17.629 1.037l26.118 2.722h4.148l.583-1.685l-1.426-1.037l-1.101-1.037l-25.147-17.045l-27.22-18.017l-14.258-10.37l-7.713-5.25l-3.888-4.925l-1.685-10.758l7-7.713l9.397.649l2.398.648l9.527 7.323l20.35 15.75L94.817 91.9l3.889 3.24l1.555-1.102l.195-.777l-1.75-2.917l-14.453-26.118l-15.425-26.572l-6.87-11.018l-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0l10.63 1.426l4.472 3.888l6.61 15.101l10.694 23.786l16.591 32.34l4.861 9.592l2.592 8.879l.973 2.722h1.685v-1.556l1.36-18.211l2.528-22.36l2.463-28.776l.843-8.1l4.018-9.722l7.971-5.25l6.222 2.981l5.12 7.324l-.713 4.73l-3.046 19.768l-5.962 30.98l-3.889 20.739h2.268l2.593-2.593l10.499-13.934l17.628-22.036l7.778-8.749l9.073-9.657l5.833-4.601h11.018l8.1 12.055l-3.628 12.443l-11.342 14.388l-9.398 12.184l-13.48 18.147l-8.426 14.518l.778 1.166l2.01-.194l30.46-6.481l16.462-2.982l19.637-3.37l8.88 4.148l.971 4.213l-3.5 8.62l-20.998 5.184l-24.628 4.926l-36.682 8.685l-.454.324l.519.648l16.526 1.555l7.065.389h17.304l32.21 2.398l8.426 5.574l5.055 6.805l-.843 5.184l-12.962 6.611l-17.498-4.148l-40.83-9.721l-14-3.5h-1.944v1.167l11.666 11.406l21.387 19.314l26.767 24.887l1.36 6.157l-3.434 4.86l-3.63-.518l-23.526-17.693l-9.073-7.972l-20.545-17.304h-1.36v1.814l4.73 6.935l25.017 37.59l1.296 11.536l-1.814 3.76l-6.481 2.268l-7.13-1.297l-14.647-20.544l-15.1-23.138l-12.185-20.739l-1.49.843l-7.194 77.448l-3.37 3.953l-7.778 2.981l-6.48-4.925l-3.436-7.972l3.435-15.749l4.148-20.544l3.37-16.333l3.046-20.285l1.815-6.74l-.13-.454l-1.49.194l-15.295 20.999l-23.267 31.433l-18.406 19.702l-4.407 1.75l-7.648-3.954l.713-7.064l4.277-6.286l25.47-32.405l15.36-20.092l9.917-11.6l-.065-1.686h-.583L44.07 198.125l-12.055 1.555l-5.185-4.86l.648-7.972l2.463-2.593l20.35-13.999z"
            fill="#d97757"
          />
        </svg>
      ),
      label: "Open in Claude",
      description: "Ask questions about this page",
      action: () => {
        window.open(claudeUrl, "_blank", "noopener,noreferrer");
      },
    },
  ];

  return (
    <div className="relative flex items-center">
      {/* Primary "Copy page" button */}
      <button
        aria-label="Copy page as Markdown"
        className={cn(
          "inline-flex h-9 cursor-pointer items-center gap-2 rounded-l-lg border border-r-0 px-3 font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900",
          "dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        )}
        onClick={handleCopy}
        type="button"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
        <span>{copied ? "Copied!" : "Copy page"}</span>
      </button>

      {/* Dropdown toggle */}
      <button
        ref={refs.setReference}
        type="button"
        {...getReferenceProps()}
        aria-expanded={isOpen}
        aria-label="More options"
        className={cn(
          "inline-flex h-9 cursor-pointer items-center justify-center rounded-r-lg border px-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900",
          "dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
          isOpen && "bg-gray-50 text-gray-900 dark:bg-gray-800 dark:text-white"
        )}
      >
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="flex items-center"
          transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      {/* Dropdown panel */}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <FloatingFocusManager context={context} modal={false}>
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className="z-50"
              >
                <motion.div
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className={cn(
                    "min-w-[220px] overflow-hidden rounded-xl border shadow-xl backdrop-blur-sm",
                    "border-gray-200 bg-white/95",
                    "dark:border-gray-700/80 dark:bg-gray-900/95"
                  )}
                  exit={{ opacity: 0, scale: 0.96, y: -4 }}
                  initial={{ opacity: 0, scale: 0.96, y: -4 }}
                  transition={{ duration: 0.14, ease: [0.4, 0, 0.2, 1] }}
                >
                  {dropdownItems.map((item) => (
                    <button
                      className={cn(
                        "flex w-full cursor-pointer items-start gap-3 px-4 py-3 text-left transition-colors",
                        "hover:bg-gray-50 dark:hover:bg-gray-800/60",
                        "focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-800/60"
                      )}
                      key={item.id}
                      onClick={async () => {
                        await item.action();
                        if (item.id !== "copy") {
                          setIsOpen(false);
                        }
                      }}
                      role="menuitem"
                      type="button"
                    >
                      <span
                        className={cn(
                          "mt-0.5 shrink-0",
                          item.id === "copy" && copied
                            ? "text-green-500"
                            : "text-gray-500 dark:text-gray-400"
                        )}
                      >
                        {item.id === "copy" && copied ? <Check className="h-4 w-4" /> : item.icon}
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-1.5 font-medium text-gray-900 text-sm dark:text-gray-100">
                          {item.label}
                          {item.id !== "copy" && (
                            <ExternalLink className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                          )}
                        </span>
                        <span className="text-gray-500 text-xs dark:text-gray-400">
                          {item.description}
                        </span>
                      </span>
                    </button>
                  ))}
                </motion.div>
              </div>
            </FloatingFocusManager>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  );
}
