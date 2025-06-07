"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

export const Tooltip = ({
  children,
  content,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        aria-describedby="tooltip"
      >
        {children}
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            id="tooltip"
            role="tooltip"
            className={cn(
              "absolute z-20 px-3 py-1 text-sm font-medium text-white rounded-md shadow-sm pointer-events-none",
              "bg-gray-900 dark:bg-gray-700",
              "bottom-full left-1/2 -translate-x-1/2 mb-2"
            )}
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          >
            {content}
            {/* <div className="tooltip-arrow" data-popper-arrow></div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 