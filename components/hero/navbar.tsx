"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import AnnouncementBanner from "@/components/hero/announcement-banner";
import { Button } from "@/components/ui/button";
import { slideDown, smoothEase } from "@/lib/animations/variants";
import logo from "@/public/logo.svg";
import ArrowDown from "../icons/arrow-down";
import Hamburger from "../icons/hamburger";
import NewWindow from "../icons/new-window";
import { PROJECT_OPTIONS, ProjectsDropdown } from "./projects-dropdown";
import ThemeSwitchButton from "./theme-switch-button";
import { TOOLS_OPTIONS, ToolsDropdown } from "./tools-dropdown";

type NavLink = {
  href: string;
  label: string;
  text: string;
  isExternal?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home", text: "Home" },
  { href: "/team", label: "Team", text: "Team" },
  { href: "/docs", label: "Documentation", text: "Documentation" },
  { href: "/blog", label: "Blog", text: "Blog" },
  { href: "/contribute", label: "Contribute", text: "Contribute" },
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
      className="flex w-full items-center rounded-lg px-4 py-2.5 font-medium text-base text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-white/10"
      href={href}
      onClick={onClick}
      {...(isExternal ? { rel: "noopener noreferrer", target: "_blank" } : {})}
    >
      {children}
      {!!isExternal && <NewWindow aria-hidden="true" className="ml-2 h-4 w-4 opacity-50" />}
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
        className="flex w-full items-center justify-between px-4 py-2.5 font-medium text-base text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-white/10"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {!!isOpen && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <ul className="flex flex-col space-y-1 bg-gray-50/50 pb-2 pl-4 dark:bg-white/5">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    className="block rounded-lg px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-200/50 dark:text-gray-300 dark:hover:bg-white/5"
                    href={item.href}
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
  const mainNavLinks = NAV_LINKS.slice(0, 3);
  const externalNavLinks = NAV_LINKS.slice(3);

  return (
    <motion.nav
      animate="visible"
      aria-label="Main navigation"
      className={`fixed inset-x-0 top-0 z-50 border-transparent border-b transition-all duration-300 ${
        scrolled || isMenuOpen
          ? "border-gray-200/50 bg-white/80 backdrop-blur-xl dark:border-white/5 dark:bg-[#0a0a0a]/80"
          : "bg-white/0 dark:bg-black/0"
      }`}
      initial="hidden"
      ref={navRef}
      variants={slideDown}
    >
      <AnnouncementBanner />

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-3 md:py-4">
        <Link aria-label="Go to homepage" className="flex items-center gap-3" href="/">
          <Image
            alt="EternalCode Logo"
            className="h-9 w-auto dark:invert"
            height={36}
            priority
            src={logo}
            width={36}
          />
          <span className="hidden self-center whitespace-nowrap font-bold text-gray-900 text-xl tracking-tight md:block dark:text-white">
            EternalCode
          </span>
        </Link>

        <div className="flex items-center justify-center gap-2 md:order-2">
          <ThemeSwitchButton />

          <Button
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 text-sm hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:focus:ring-gray-600 dark:hover:bg-gray-700"
            onClick={toggleMenu}
            ref={menuButtonRef}
            size="sm"
            type="button"
            variant="ghost"
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              initial={false}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <ArrowDown aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Hamburger aria-hidden="true" className="h-5 w-5" />
              )}
            </motion.div>
          </Button>
        </div>

        <AnimatePresence>
          {!!isMenuOpen && (
            <motion.div
              animate={{ opacity: 1, height: "auto" }}
              className="w-full overflow-hidden border-gray-100 border-t bg-white/50 backdrop-blur-xl md:hidden dark:border-gray-800 dark:bg-black/50"
              exit={{ opacity: 0, height: 0 }}
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              role="menu"
              transition={{ ...smoothEase, duration: 0.3 }}
            >
              <ul className="flex max-h-[85vh] flex-col space-y-1 overflow-y-auto p-4">
                {mainNavLinks.map((link) => (
                  <motion.li
                    animate={{ x: 0, opacity: 1 }}
                    initial={{ x: -20, opacity: 0 }}
                    key={link.href}
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
                  animate={{ x: 0, opacity: 1 }}
                  initial={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  <MobileMenuAccordion
                    items={PROJECTS_LINKS}
                    onSelect={() => setIsMenuOpen(false)}
                    title="Projects"
                  />
                </motion.li>

                <motion.li
                  animate={{ x: 0, opacity: 1 }}
                  initial={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <MobileMenuAccordion
                    items={TOOLS_LINKS}
                    onSelect={() => setIsMenuOpen(false)}
                    title="Tools"
                  />
                </motion.li>

                {externalNavLinks.map((link, index) => (
                  <motion.li
                    animate={{ x: 0, opacity: 1 }}
                    initial={{ x: -20, opacity: 0 }}
                    key={link.href}
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
                  className="flex items-center justify-center rounded-full px-4 py-2 text-gray-600 text-sm transition-all hover:bg-black/5 hover:text-black dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
                  href={link.href}
                  {...(link.isExternal ? { rel: "noopener noreferrer", target: "_blank" } : {})}
                >
                  {link.text}
                  {!!link.isExternal && (
                    <NewWindow aria-hidden="true" className="ml-1.5 h-3.5 w-3.5 opacity-70" />
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
                  className="flex items-center justify-center rounded-full px-4 py-2 text-gray-600 text-sm transition-all hover:bg-black/5 hover:text-black dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
                  href={link.href}
                  {...(link.isExternal ? { rel: "noopener noreferrer", target: "_blank" } : {})}
                >
                  {link.text}
                  {!!link.isExternal && (
                    <NewWindow aria-hidden="true" className="ml-1.5 h-3.5 w-3.5 opacity-70" />
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
