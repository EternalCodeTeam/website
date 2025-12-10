"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Play, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

import { MinecraftPreview } from "@/components/notification-generator/preview/MinecraftPreview";
import type { NotificationConfig } from "@/components/notification-generator/types";
import { Button } from "@/components/ui/button";
import { slideUp } from "@/lib/animations/variants";

interface FloatingPreviewProps {
  notification: NotificationConfig;
}

export function FloatingPreview({ notification }: FloatingPreviewProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [previewKey, setPreviewKey] = useState(0);
  const [height, setHeight] = useState(400); // Default expanded height
  const [isResizing, setIsResizing] = useState(false);

  const handlePlay = useCallback(() => {
    setPreviewKey((prev) => prev + 1);
  }, []);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        const newHeight = window.innerHeight - e.clientY;
        // Clamp height between min and max values
        if (newHeight > 100 && newHeight < window.innerHeight - 100) {
          setHeight(newHeight);
          // If dragged significantly, ensure it's open
          if (!isOpen) setIsOpen(true);
        }
      }
    },
    [isResizing, isOpen]
  );

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    } else {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  return (
    <>
      <div
        className="transition-all duration-300 pointer-events-none"
        style={{ marginBottom: isOpen ? height : 48 }}
      />

      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-white/80 shadow-2xl backdrop-blur-xl dark:bg-gray-900/90"
        initial="hidden"
        animate="visible"
        variants={slideUp}
        style={{ height: isOpen ? height : "auto" }}
      >
        {/* Resize Handle */}
        {/* biome-ignore lint/a11y/noStaticElementInteractions: Resize handle needs custom logic */}
        <div
          className="absolute left-0 right-0 -top-1.5 z-50 flex h-3 cursor-ns-resize items-center justify-center hover:bg-blue-500/20 active:bg-blue-500/40"
          onMouseDown={startResizing}
        >
          <div className="h-1 w-16 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>

        {/* Header / Toggle Bar */}
        <button
          type="button"
          className="flex w-full h-12 cursor-pointer items-center justify-between px-4 sm:px-8 bg-gray-100/50 dark:bg-white/5 border-b border-gray-200 dark:border-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Live Preview</h3>
          </div>

          <div className="flex items-center gap-2">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </div>
        </button>

        {/* Content Area */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[calc(100%-3rem)] overflow-hidden"
            >
              <div className="container mx-auto h-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex h-full flex-col gap-4 lg:flex-row lg:items-center">
                  {/* Controls - Compact Layout */}
                  <div className="flex shrink-0 flex-row items-center justify-between gap-4 lg:w-48 lg:flex-col lg:justify-center">
                    <p className="hidden text-sm text-gray-500 dark:text-gray-400 lg:block">
                      Preview your notification.
                    </p>
                    <Button
                      variant="primary"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handlePlay();
                      }}
                      leftIcon={<Play className="h-4 w-4" />}
                      className="w-full justify-center whitespace-nowrap"
                      size="sm"
                    >
                      Replay
                    </Button>
                  </div>

                  {/* Preview Box - Responsive Height */}
                  <div className="relative flex-1 overflow-hidden rounded-xl border border-gray-200 bg-black shadow-lg dark:border-gray-800 h-full max-h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MinecraftPreview key={previewKey} notification={notification} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
