"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import ThemeSwitchButton from "./ThemeSwitchButton";
import MobileMenuBar from "../icons/mobile-menu-bar";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-gray-200 bg-[#eff1f5] backdrop-filter dark:bg-[#0d1117]">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-8">
        <Link href="/" className="flex items-center">
          <Image
            className="mr-3 h-8 dark:invert"
            alt="Eternalcode Logo"
            aria-label="Eternalcode Logo"
            src={logo}
            width="32"
            height="32"
          />
          <span className="hidden self-center whitespace-nowrap text-2xl font-semibold text-black dark:text-white md:block">
            EternalCode.pl
          </span>
        </Link>
        <div className="flex items-center md:order-2">
          <ThemeSwitchButton />
          <button
            className="ml-1 inline-flex items-center rounded-lg p-2 text-sm dark:text-white md:hidden"
            type="button"
            aria-label="Menu"
            aria-controls="mobile-menu-language-select"
            aria-expanded={isMenuOpen}
            data-collapse-toggle="mobile-menu-language-select"
            onClick={toggleMenu}
          >
            <MobileMenuBar />
          </button>
        </div>
        <div
          id="mobile-menu-language-select"
          className={`${
            isMenuOpen ? "" : "hidden"
          } w-full items-center justify-between md:order-1 md:flex md:w-auto`}
        >
          <ul className="mt-4 flex flex-col p-4 md:mt-0 md:flex-row md:space-x-8 md:p-0">
            <li>
              <Link
                href="/"
                className="light:text-gray-900 block rounded-full py-2 pl-3 pr-4 dark:text-white md:p-0"
                aria-label="Home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className="block rounded-full py-2 pl-3 pr-4 text-gray-900 dark:text-white md:p-0"
                aria-label="Team"
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="block rounded-full py-2 pl-3 pr-4 text-gray-900 dark:text-white md:p-0"
                aria-label="Projects"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="https://repo.eternalcode.pl/#/"
                target="_blank"
                className="block rounded-full py-2 pl-3 pr-4 text-gray-900 dark:text-white md:p-0"
                aria-label="Repository"
              >
                Repository
              </Link>
            </li>
            <li>
              <Link
                href="https://docs.eternalcode.pl/"
                target="_blank"
                className="block rounded-full py-2 pl-3 pr-4 text-gray-900 dark:text-white md:p-0"
                aria-label="Documentation"
              >
                Documentation
              </Link>
            </li>
            <li>
              <Link
                href="https://status.eternalcode.pl/"
                target="_blank"
                className="block rounded-full py-2 pl-3 pr-4 text-gray-900 dark:text-white md:p-0"
                aria-label="Status"
              >
                Status
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
