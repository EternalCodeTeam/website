"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { AiChatPanel } from "./ai-chat-panel";

export function AiChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            aria-modal="false"
            className={cn(
              "will-change-transform",
              "rounded-2xl",
              "shadow-2xl shadow-black/15 dark:shadow-black/40",
              "ring-1 ring-black/10 dark:ring-white/10",
              "bg-white dark:bg-neutral-950"
            )}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            key="panel"
            role="dialog"
            style={{ transformOrigin: "bottom right" }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <AiChatPanel onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        className={cn(
          "relative grid h-14 w-14 place-items-center rounded-full",
          "shadow-black/10 shadow-lg",
          "ring-1 ring-black/5 dark:ring-white/10",
          "transition-[transform,background-color,box-shadow] duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950",
          isOpen
            ? "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            : "bg-blue-600 text-white hover:bg-blue-500"
        )}
        onClick={() => setIsOpen((v) => !v)}
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <AnimatePresence initial={false} mode="wait">
          {isOpen ? (
            <motion.span
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              className="relative z-10"
              exit={{ opacity: 0, rotate: 90, scale: 0.75 }}
              initial={{ opacity: 0, rotate: -90, scale: 0.75 }}
              key="close"
              transition={{ duration: 0.14 }}
            >
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              className="relative z-10"
              exit={{ opacity: 0, rotate: -90, scale: 0.75 }}
              initial={{ opacity: 0, rotate: 90, scale: 0.75 }}
              key="open"
              transition={{ duration: 0.14 }}
            >
              <Sparkles className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>

        {!isOpen && (
          <>
            <span className="pointer-events-none absolute inset-0 -z-0 rounded-full bg-blue-500/25 blur-md" />
            <span className="pointer-events-none absolute inset-0 -z-0 animate-ping rounded-full bg-blue-500/25" />
            <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/25" />
          </>
        )}
      </motion.button>
    </div>,
    document.body
  );
}
