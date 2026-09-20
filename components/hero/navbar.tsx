"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import logo from "@/public/logo.svg";
import ThemeSwitchButton from "./theme-switch-button";

const links = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/team", label: "Team" },
  { href: "/contribute", label: "Contribute" },
  { href: "/builds", label: "Builds" },
];

const externalLinks = [
  { href: "https://repo.eternalcode.pl", label: "Repository" },
  { href: "https://status.eternalcode.pl", label: "Status" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const renderedPath = useRef(pathname);

  useScrollLock(open);

  // Routes in the same layout do not remount the navbar, so close the sheet
  // whenever the URL changes instead of leaving it open over the new page.
  useEffect(() => {
    if (renderedPath.current !== pathname) {
      renderedPath.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <nav className="site-nav-shell fixed inset-x-0 top-0 z-50">
      <div className="site-nav mx-auto flex h-16 max-w-[92rem] items-center justify-between px-4 sm:px-5">
        <Link aria-label="EternalCode home" className="group flex items-center gap-3" href="/">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--ec-accent)] shadow-[0_0_24px_rgb(59_130_246_/_0.2)]">
            <Image alt="" className="h-6 w-6" height={24} priority src={logo} width={24} />
          </span>
          <span className="font-semibold text-[15px] text-[var(--ec-text)] tracking-[-0.02em]">
            EternalCode<span className="text-[var(--ec-accent-text)]">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`nav-link ${active ? "nav-link-active" : ""}`}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
          <span aria-hidden className="mx-1 h-5 w-px bg-[var(--ec-line)]" />
          {externalLinks.map((link) => (
            <a
              className="nav-link inline-flex items-center gap-1.5"
              href={link.href}
              key={link.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitchButton />
          <a
            className="hidden items-center gap-2 rounded-full bg-[var(--ec-text)] px-4 py-2 font-semibold text-[var(--ec-bg)] text-sm transition hover:bg-[var(--ec-accent)] hover:text-[var(--ec-accent-ink)] sm:inline-flex"
            href="https://github.com/EternalCodeTeam"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            aria-controls="site-mobile-menu"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--ec-line)] text-[var(--ec-text)] md:hidden"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="site-nav site-mobile-menu mx-auto max-w-[92rem] md:hidden"
            data-lenis-prevent
            exit={{ opacity: 0, y: -8 }}
            id="site-mobile-menu"
            initial={{ opacity: 0, y: -8 }}
          >
            {links.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className="site-mobile-link"
                  href={link.href}
                  key={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                  {active ? <span aria-hidden className="status-dot" /> : null}
                </Link>
              );
            })}
            <span aria-hidden className="my-2 block h-px bg-[var(--ec-line)]" />
            {externalLinks.map((link) => (
              <a
                className="site-mobile-link"
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            ))}
            <a
              className="site-mobile-cta"
              href="https://github.com/EternalCodeTeam"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github aria-hidden="true" className="h-4 w-4" /> GitHub
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
