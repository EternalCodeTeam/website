"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import AnnouncementBanner from "@/components/hero/announcement-banner";
import { Button } from "@/components/ui/button";
import { slideDown } from "@/lib/animations/variants";
import logo from "@/public/logo.svg";
import NewWindow from "../icons/new-window";
import AnimatedHamburger from "./hamburger";
import ThemeSwitchButton from "./theme-switch-button";
import { TOOLS_OPTIONS, ToolsDropdown } from "./tools-dropdown";

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
          className={`h-4 w-4 transform-gpu transition-transform duration-200 will-change-transform ${isOpen ? "rotate-180" : ""}`}
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
  const [isMounted, setIsMounted] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
      const target = event.target as Node;
      const clickedInsideNav = navRef.current?.contains(target);
      const clickedInsideMobileMenu = mobileMenuRef.current?.contains(target);

      if (isMenuOpen && !clickedInsideNav && !clickedInsideMobileMenu) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Main navigation items split
  const mainNavLinks = NAV_LINKS.slice(0, 3);
  const externalNavLinks = NAV_LINKS.slice(3);

  return (
    <>
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

        <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between px-4 py-3 md:py-4">
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
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 text-sm hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:focus:ring-gray-600 dark:hover:bg-gray-700"
              onClick={toggleMenu}
              ref={menuButtonRef}
              size="sm"
              type="button"
              variant="ghost"
            >
              <AnimatedHamburger className="h-5 w-5" isOpen={isMenuOpen} />
            </Button>
          </div>

          <div className="hidden w-full items-center justify-between gap-4 md:order-1 md:flex md:w-auto">
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

      {isMounted &&
        createPortal(
          <AnimatePresence>
            {!!isMenuOpen && (
              <>
                <motion.div
                  animate={{ opacity: 1 }}
                  aria-hidden="true"
                  className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  onClick={closeMenu}
                  role="presentation"
                />
                <motion.aside
                  animate={{ x: 0 }}
                  className="fixed inset-y-0 left-0 z-50 flex w-full flex-col bg-white shadow-2xl md:hidden dark:bg-[#050505]"
                  exit={{ x: "-100%" }}
                  id="mobile-menu"
                  initial={{ x: "-100%" }}
                  ref={mobileMenuRef}
                  role="menu"
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                >
                  <div className="flex items-center justify-between border-gray-100 border-b px-6 py-5 dark:border-white/5">
                    <Link
                      aria-label="Go to homepage"
                      className="flex items-center gap-3"
                      href="/"
                      onClick={closeMenu}
                    >
                      <Image
                        alt="EternalCode Logo"
                        className="h-9 w-auto dark:invert"
                        height={36}
                        src={logo}
                        width={36}
                      />
                      <span className="font-semibold text-gray-900 text-lg dark:text-white">
                        EternalCode
                      </span>
                    </Link>
                    <Button
                      aria-label="Close menu"
                      className="h-10 w-10 rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                      onClick={closeMenu}
                      size="sm"
                      type="button"
                      variant="ghost"
                    >
                      <AnimatedHamburger ariaHidden={false} className="h-5 w-5" isOpen />
                    </Button>
                  </div>

                  <div className="flex-1 overflow-y-auto px-6 py-6">
                    <ul className="space-y-2">
                      {mainNavLinks.map((link, index) => (
                        <motion.li
                          animate={{ opacity: 1, x: 0 }}
                          initial={{ opacity: 0, x: -20 }}
                          key={link.href}
                          transition={{ duration: 0.25, delay: index * 0.05 }}
                        >
                          <MobileMenuLink
                            href={link.href}
                            isExternal={link.isExternal}
                            onClick={closeMenu}
                          >
                            {link.text}
                          </MobileMenuLink>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-6 space-y-3">
                      <motion.div
                        animate={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: -20 }}
                        transition={{ delay: 0.05 }}
                      >
                        <MobileMenuAccordion
                          items={TOOLS_LINKS}
                          onSelect={closeMenu}
                          title="Tools"
                        />
                      </motion.div>
                    </div>

                    <div className="mt-6 border-gray-100 border-t pt-6 dark:border-white/10">
                      <ul className="space-y-2">
                        {externalNavLinks.map((link, index) => (
                          <motion.li
                            animate={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -20 }}
                            key={link.href}
                            transition={{ duration: 0.25, delay: 0.1 + index * 0.04 }}
                          >
                            <MobileMenuLink
                              href={link.href}
                              isExternal={link.isExternal}
                              onClick={closeMenu}
                            >
                              {link.text}
                            </MobileMenuLink>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
