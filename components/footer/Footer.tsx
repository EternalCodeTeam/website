"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import DiscordIcon from "@/components/icons/discord";
import GitHubIcon from "@/components/icons/github";
import TikTokIcon from "@/components/icons/round-tiktok";
import YouTubeIcon from "@/components/icons/youtube";
import logo from "@/public/logo.svg";

interface FooterLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { href: "/builds", label: "Build Explorer" },
      { href: "https://docs.eternalcode.pl/", label: "Documentation", isExternal: true },
      { href: "https://repo.eternalcode.pl/#/", label: "Repository", isExternal: true },
      { href: "https://status.eternalcode.pl/", label: "Status", isExternal: true },
    ],
  },
  {
    title: "Projects",
    links: [
      { href: "/projects/eternalcore", label: "EternalCore" },
      { href: "/projects/eternalcombat", label: "EternalCombat" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "https://discord.com/invite/FQ7jmGBd6c", label: "Discord", isExternal: true },
      { href: "https://github.com/EternalCodeTeam", label: "GitHub", isExternal: true },
      {
        href: "https://www.youtube.com/channel/UC2BEaMJWxxUscN50AD0oY_Q",
        label: "YouTube",
        isExternal: true,
      },
      { href: "https://www.tiktok.com/@eternalcode.pl", label: "TikTok", isExternal: true },
    ],
  },
  {
    title: "Resource",
    links: [
      {
        href: "https://spigotmc.org/resources/authors/eternalcodeteam.1570200/",
        label: "SpigotMC",
        isExternal: true,
      },
      {
        href: "https://modrinth.com/organization/eternalcodeteam",
        label: "Modrinth",
        isExternal: true,
      },
      { href: "https://bstats.org/author/vLucky", label: "bStats", isExternal: true },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#about", label: "About" },
      { href: "/team", label: "Team" },
      { href: "/blog", label: "Blog" },
      { href: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
];

const socialLinks = [
  {
    href: "https://github.com/EternalCodeTeam",
    label: "GitHub",
    icon: <GitHubIcon />,
  },
  {
    href: "https://discord.com/invite/FQ7jmGBd6c",
    label: "Discord",
    icon: <DiscordIcon />,
  },
  {
    href: "https://www.youtube.com/channel/UC2BEaMJWxxUscN50AD0oY_Q",
    label: "YouTube",
    icon: <YouTubeIcon />,
  },
  {
    href: "https://www.tiktok.com/@eternalcode.pl",
    label: "TikTok",
    icon: <TikTokIcon />,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50/50 py-12 lg:pt-16 lg:pb-8 dark:border-white/5 dark:bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-8 lg:gap-12 xl:grid-cols-4 xl:gap-8">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
              <Image
                src={logo}
                alt="EternalCode Logo"
                width={36}
                height={36}
                className="h-9 w-auto dark:invert"
              />
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                EternalCode
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-gray-600 dark:text-gray-400">
              Building high-quality, open-source Minecraft solutions. Empowering communities with
              reliable software since 2021.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={item.label}
                >
                  <span className="h-5 w-5">{item.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-5 xl:col-span-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm leading-6 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm leading-6 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-white/5 lg:mt-16">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs leading-5 text-gray-500 dark:text-gray-500">
              &copy; {currentYear} EternalCodeTeam. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-500 dark:text-gray-500">
                Designed with <span className="text-red-500">❤</span> by the EternalCodeTeam.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
