"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink, Menu, Wrench, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import AnnouncementBanner from "@/components/hero/announcement-banner";
import { slideDown } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";
import logo from "@/public/logo.svg";
import ThemeSwitchButton from "./theme-switch-button";
import { TOOLS_OPTIONS } from "./tools-dropdown";

interface NavLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/docs", label: "Docs" },
  { href: "/contribute", label: "Contribute" },
];

const EXTERNAL_LINKS: NavLink[] = [
  {
    href: "https://repo.eternalcode.pl/#/",
    label: "Repository",
    isExternal: true,
  },
  {
    href: "https://status.eternalcode.pl/",
    label: "Status",
    isExternal: true,
  },
];

const TOOLS_LINKS = TOOLS_OPTIONS.map((opt) => ({
  label: opt.label,
  href: opt.value,
}));

function NavItem({ href, label, isActive, isExternal }: NavLink & { isActive: boolean }) {
  return (
    <Link
      className={cn(
        "relative rounded-lg px-3 py-1.5 font-medium text-sm transition-colors",
        isActive
          ? "text-gray-900 dark:text-white"
          : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      )}
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="flex items-center gap-1.5">
        {label}
        {!!isExternal && <ExternalLink className="h-3 w-3 opacity-50" />}
      </span>
      {!!isActive && (
        <motion.span
          className="absolute inset-x-1 -bottom-2.5 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400"
          layoutId="navbar-active"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

function ToolsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className={cn(
          "flex items-center gap-1 rounded-lg px-3 py-1.5 font-medium text-sm transition-colors",
          isOpen
            ? "text-gray-900 dark:text-white"
            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        )}
        onClick={() => setIsOpen((v) => !v)}
        type="button"
      >
        <Wrench className="h-3.5 w-3.5" />
        Tools
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {!!isOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute top-full right-0 z-50 mt-2 w-52 origin-top-right overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-xl dark:border-gray-800 dark:bg-gray-900"
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {TOOLS_LINKS.map((tool) => (
              <Link
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 text-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                href={tool.href}
                key={tool.href}
                onClick={() => setIsOpen(false)}
              >
                {tool.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNav({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {!!isOpen && (
        <>
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            animate={{ x: 0 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl dark:bg-gray-950"
            exit={{ x: "100%" }}
            initial={{ x: "100%" }}
            ref={menuRef}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-gray-100 border-b px-5 py-4 dark:border-gray-800">
              <Link className="flex items-center gap-2.5" href="/" onClick={onClose}>
                <Image
                  alt="EternalCode"
                  className="h-8 w-auto dark:invert"
                  height={32}
                  src={logo}
                  width={32}
                />
                <span className="font-bold text-gray-900 text-lg dark:text-white">EternalCode</span>
              </Link>
              <button
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                onClick={onClose}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-5">
              <ul className="space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.li
                      animate={{ opacity: 1, x: 0 }}
                      initial={{ opacity: 0, x: 16 }}
                      key={link.href}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <Link
                        className={cn(
                          "flex items-center rounded-xl px-4 py-3 font-medium text-[15px] transition-colors",
                          active
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/60"
                        )}
                        href={link.href}
                        onClick={onClose}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Tools accordion */}
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="mt-3"
                initial={{ opacity: 0, x: 16 }}
                transition={{ delay: NAV_LINKS.length * 0.04, duration: 0.2 }}
              >
                <button
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-medium text-[15px] text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/60"
                  onClick={() => setToolsOpen((v) => !v)}
                  type="button"
                >
                  <span className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 opacity-60" />
                    Tools
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      toolsOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {!!toolsOpen && (
                    <motion.ul
                      animate={{ height: "auto", opacity: 1 }}
                      className="overflow-hidden"
                      exit={{ height: 0, opacity: 0 }}
                      initial={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {TOOLS_LINKS.map((tool) => (
                        <li key={tool.href}>
                          <Link
                            className="flex items-center rounded-lg px-4 py-2.5 pl-11 text-gray-600 text-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/60 dark:hover:text-white"
                            href={tool.href}
                            onClick={onClose}
                          >
                            {tool.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* External links */}
              <div className="mt-5 border-gray-100 border-t pt-5 dark:border-gray-800">
                <p className="mb-2 px-4 font-semibold text-gray-400 text-xs uppercase tracking-wider dark:text-gray-500">
                  External
                </p>
                <ul className="space-y-1">
                  {EXTERNAL_LINKS.map((link, i) => (
                    <motion.li
                      animate={{ opacity: 1, x: 0 }}
                      initial={{ opacity: 0, x: 16 }}
                      key={link.href}
                      transition={{
                        delay: (NAV_LINKS.length + 1 + i) * 0.04,
                        duration: 0.2,
                      }}
                    >
                      <a
                        className="flex items-center justify-between rounded-xl px-4 py-3 font-medium text-[15px] text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/60"
                        href={link.href}
                        onClick={onClose}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {link.label}
                        <ExternalLink className="h-4 w-4 opacity-40" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Footer */}
            <div className="border-gray-100 border-t px-5 py-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-xs">
                  &copy; {new Date().getFullYear()} EternalCode
                </p>
                <ThemeSwitchButton />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally close menu on pathname change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        animate="visible"
        aria-label="Main navigation"
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
          scrolled
            ? "border-gray-200/60 border-b bg-white/80 shadow-sm backdrop-blur-xl dark:border-gray-800/60 dark:bg-gray-950/80"
            : "border-transparent border-b bg-light-gray-100 dark:bg-gray-900"
        )}
        initial="hidden"
        variants={slideDown}
      >
        <AnnouncementBanner />

        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <Link aria-label="Go to homepage" className="flex shrink-0 items-center gap-2.5" href="/">
            <Image
              alt="EternalCode Logo"
              className="h-8 w-auto dark:invert"
              height={32}
              priority
              src={logo}
              width={32}
            />
            <span className="hidden font-bold text-gray-900 text-lg tracking-tight sm:block dark:text-white">
              EternalCode
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <NavItem
                isActive={link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)}
                key={link.href}
                {...link}
              />
            ))}
            <ToolsMenu />
            <div className="mx-2 h-5 w-px bg-gray-200 dark:bg-gray-700" />
            {EXTERNAL_LINKS.map((link) => (
              <NavItem isActive={false} key={link.href} {...link} />
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeSwitchButton />
            </div>

            {/* Mobile hamburger */}
            <button
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 md:hidden dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen((v) => !v)}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      {isMounted &&
        createPortal(
          <MobileNav isOpen={isMenuOpen} onClose={closeMenu} pathname={pathname} />,
          document.body
        )}
    </>
  );
}
