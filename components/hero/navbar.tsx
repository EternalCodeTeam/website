"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "@/public/logo.svg";
import ThemeSwitchButton from "./theme-switch-button";

const links = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/team", label: "Team" },
  { href: "/contribute", label: "Contribute" },
  { href: "/builds", label: "Builds" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
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
                className={`nav-link ${active ? "nav-link-active" : ""}`}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
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
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--ec-line)] text-[var(--ec-text)] md:hidden"
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
            className="site-nav mx-auto mt-2 max-w-[92rem] p-3 md:hidden"
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: -8 }}
          >
            {links.map((link) => (
              <Link
                className="block rounded-xl px-4 py-3 font-medium text-[var(--ec-muted)] hover:bg-[var(--ec-soft)] hover:text-[var(--ec-text)]"
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
