"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import AnnouncementBanner from "@/components/hero/AnnouncementBanner";
import { Button } from "@/components/ui/button";
import logo from "@/public/logo.svg";

import ArrowDown from "../icons/arrow-down";
import Hamburger from "../icons/hamburger";
import NewWindow from "../icons/new-window";

import ThemeSwitchButton from "./ThemeSwitchButton";
import { PROJECT_OPTIONS, ProjectsDropdown } from "./ProjectsDropdown";
import { TOOLS_OPTIONS, ToolsDropdown } from "./ToolsDropdown";

import { slideDown, smoothEase } from "@/lib/animations/variants";

interface NavLink {
  href: string;
  label: string;
  text: string;
  isExternal?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home", text: "Home" },
  { href: "/team", label: "Team", text: "Team" },
  { href: "/docs", label: "Documentation", text: "Documentation" },
  { href: "/blog", label: "Blog", text: "Blog" },
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

const PROJECTS_LINKS = PROJECT_OPTIONS.map((opt) => ({
  label: opt.label,
  href: opt.value,
}));

const TOOLS_LINKS = TOOLS_OPTIONS.map((opt) => ({
  label: opt.label,
  href: opt.value,
}));

function MobileMenuLink({
  href,
  children,
  onClick,
  isExternal,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  isExternal?: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex w-full items-center rounded-lg px-4 py-2.5 text-base font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-white/10"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={onClick}
    >
      {children}
      {isExternal && <NewWindow className="ml-2 h-4 w-4 opacity-50" aria-hidden="true" />}
    </Link>
  );
}

function MobileMenuAccordion({
  title,
  items,
  onSelect,
}: {
  title: string;
  items: { label: string; href: string }[];
  onSelect: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-2.5 text-base font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-white/10"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="flex flex-col space-y-1 bg-gray-50/50 pb-2 pl-4 dark:bg-white/5">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200/50 dark:text-gray-300 dark:hover:bg-white/5"
                    onClick={onSelect}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Main navigation items split
  const mainNavLinks = NAV_LINKS.slice(0, 4);
  const externalNavLinks = NAV_LINKS.slice(4);

  return (
    <motion.nav
      ref={navRef}
      initial="hidden"
      animate="visible"
      variants={slideDown}
      className={`fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300 ${scrolled || isMenuOpen
          ? "border-gray-200/50 bg-white/80 backdrop-blur-xl dark:border-white/5 dark:bg-[#0a0a0a]/80"
          : "bg-white/0 dark:bg-black/0"
        }`}
      aria-label="Main navigation"
    >
      <AnnouncementBanner />

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Go to homepage">
          <Image
            className="h-9 w-auto dark:invert"
            alt="EternalCode Logo"
            src={logo}
            width={36}
            height={36}
            priority
          />
          <span className="hidden self-center whitespace-nowrap text-xl font-bold tracking-tight text-gray-900 dark:text-white md:block">
            EternalCode
          </span>
        </Link>

        <div className="flex items-center justify-center gap-2 md:order-2">
          <ThemeSwitchButton />

          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="sm"
            className="inline-flex items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
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
          </Button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ ...smoothEase, duration: 0.3 }}
              className="w-full overflow-hidden border-t border-gray-100 bg-white/50 backdrop-blur-xl dark:border-gray-800 dark:bg-black/50 md:hidden"
              role="menu"
            >
              <ul className="flex flex-col space-y-1 p-4 max-h-[85vh] overflow-y-auto">
                {mainNavLinks.map((link) => (
                  <motion.li
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MobileMenuLink
                      href={link.href}
                      isExternal={link.isExternal}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.text}
                    </MobileMenuLink>
                  </motion.li>
                ))}

                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  <MobileMenuAccordion
                    title="Projects"
                    items={PROJECTS_LINKS}
                    onSelect={() => setIsMenuOpen(false)}
                  />
                </motion.li>

                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <MobileMenuAccordion
                    title="Tools"
                    items={TOOLS_LINKS}
                    onSelect={() => setIsMenuOpen(false)}
                  />
                </motion.li>

                {externalNavLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.15 + index * 0.05 }}
                  >
                    <MobileMenuLink
                      href={link.href}
                      isExternal={link.isExternal}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.text}
                    </MobileMenuLink>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
          <ul className="mt-4 flex flex-col space-y-2 font-medium md:mt-0 md:flex-row md:items-center md:space-x-1 md:space-y-0 md:p-0">
            {mainNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-center rounded-full px-4 py-2 text-sm text-gray-600 transition-all hover:bg-black/5 hover:text-black dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                >
                  {link.text}
                  {link.isExternal && (
                    <NewWindow className="ml-1.5 h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                  )}
                </Link>
              </li>
            ))}

            <li>
              <ProjectsDropdown />
            </li>
            <li>
              <ToolsDropdown />
            </li>

            {externalNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-center rounded-full px-4 py-2 text-sm text-gray-600 transition-all hover:bg-black/5 hover:text-black dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                >
                  {link.text}
                  {link.isExternal && (
                    <NewWindow className="ml-1.5 h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}
