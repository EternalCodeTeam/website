"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import ArrowDown from "../icons/arrow-down";
import { softSpring } from "@/lib/animations/variants";

export function ToolsDropdown() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="relative flex justify-center">
      <button
        ref={buttonRef}
        className={`cursor-pointer flex items-center gap-1 rounded-full px-4 py-1.5 text-gray-900 transition-colors duration-200 hover:bg-gray-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-white dark:hover:bg-gray-800`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="tools-dropdown-menu"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            setOpen(true);
            setTimeout(() => dropdownRef.current?.querySelector("a")?.focus(), 0);
          }
        }}
        tabIndex={0}
        type="button"
      >
        Tools
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={softSpring}>
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id="tools-dropdown-menu"
            ref={dropdownRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={softSpring}
            className="right-50 absolute z-30 mt-10 min-w-[210px] rounded-lg bg-white py-2 shadow-xl ring-1 ring-black/10 dark:bg-gray-900 dark:ring-white/10 md:left-0"
            role="menu"
            aria-label="Tools menu"
          >
            <li>
              <Link
                href="/notification-generator"
                className="block w-full rounded-md px-4 py-2 text-left text-gray-900 outline-hidden transition-colors duration-150 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-700 dark:text-white dark:hover:bg-gray-800 dark:hover:text-blue-400 dark:focus:bg-gray-800 dark:focus:text-blue-400"
                tabIndex={0}
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                Notification Generator
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
