"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import ThemeSwitchButton from "./ThemeSwitchButton";
import ArrowDown from "../icons/arrow-down";
import Hamburger from "../icons/hamburger";
import NewWindow from "../icons/new-window";
import { AnimatePresence, motion } from "framer-motion";

interface NavLink {
  href: string;
  label: string;
  text: string;
  isExternal?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home", text: "Home" },
  { href: "/team", label: "Team", text: "Team" },
  { href: "/projects", label: "Projects", text: "Projects" },
  { href: "/docs", label: "Documentation", text: "Documentation" },
  {
    href: "https://repo.eternalcode.pl/#/",
    label: "Repository",
    text: "Repository",
    isExternal: true,
  },
  {
    href: "https://status.eternalcode.pl/",
    label: "Status",
    text: "Status",
    isExternal: true,
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-[#eff1f5]/90 backdrop-blur-md dark:border-gray-800 dark:bg-[#0d1117]/90"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-4 md:py-6">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Go to homepage"
        >
          <Image
            className="mr-3 h-8 w-auto dark:invert"
            alt="EternalCode Logo"
            src={logo}
            width={32}
            height={32}
            priority
          />
          <span className="hidden self-center whitespace-nowrap text-2xl font-semibold text-black dark:text-white md:block">
            EternalCode.pl
          </span>
        </Link>

        <div className="flex items-center justify-center md:order-2">
          <ThemeSwitchButton />

          <button
            ref={menuButtonRef}
            className="ml-1 inline-flex items-center p-2 text-sm dark:text-white md:hidden"
            type="button"
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <motion.div
              initial={false}
              animate={isMenuOpen ? "open" : "closed"}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <ArrowDown className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Hamburger className="h-5 w-5" aria-hidden="true" />
              )}
            </motion.div>
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full md:hidden"
              role="menu"
            >
              <ul className="mt-4 flex flex-col space-y-1 p-4">
                {NAV_LINKS.map((link) => (
                  <motion.li
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-center rounded-full py-1.5 px-4 text-gray-900 transition-colors duration-200 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                      aria-label={link.label}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.text}
                      {link.isExternal && (
                        <NewWindow className="ml-1" aria-hidden="true" />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
          <ul className="mt-4 flex flex-col space-y-2 md:mt-0 md:flex-row md:space-x-2 md:space-y-0 md:p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-center rounded-full py-1.5 px-4 text-gray-900 transition-colors duration-200 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                  aria-label={link.label}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                >
                  {link.text}
                  {link.isExternal && (
                    <NewWindow className="ml-1" aria-hidden="true" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
