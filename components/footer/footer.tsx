"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SiNetlify } from "react-icons/si";

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
      { href: "/contribute", label: "Contribute" },
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
    <footer className="border-gray-200 border-t bg-gray-50/50 py-12 lg:pt-16 lg:pb-8 dark:border-white/5 dark:bg-[#0a0a0a]">
      <div className="mx-auto max-w-[90rem] px-4 md:px-6">
        <div className="grid gap-8 lg:gap-12 xl:grid-cols-4 xl:gap-8">
          <div className="space-y-6">
            <Link aria-label="Go to homepage" className="flex items-center gap-2" href="/">
              <Image
                alt="EternalCode Logo"
                className="h-9 w-auto dark:invert"
                height={36}
                src={logo}
                width={36}
              />
              <span className="font-bold text-gray-900 text-xl tracking-tight dark:text-white">
                EternalCode
              </span>
            </Link>
            <p className="max-w-xs text-gray-600 text-sm leading-6 dark:text-gray-400">
              Building high-quality, open-source Minecraft solutions. Empowering communities with
              reliable software since 2021.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((item) => (
                <motion.a
                  aria-label={item.label}
                  className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  href={item.href}
                  key={item.label}
                  rel="noopener noreferrer"
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="h-5 w-5">{item.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-5 xl:col-span-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-gray-900 text-sm leading-6 dark:text-white">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.isExternal ? (
                        <a
                          className="text-gray-600 text-sm leading-6 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          href={link.href}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          className="text-gray-600 text-sm leading-6 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          href={link.href}
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

        <div className="mt-12 border-gray-200 border-t pt-8 lg:mt-16 dark:border-white/5">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-gray-500 text-xs leading-5 dark:text-gray-500">
              &copy; {currentYear} EternalCodeTeam. All rights reserved.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
              <motion.a
                className="group inline-flex items-center gap-2 rounded-lg border border-gray-200/80 bg-gradient-to-br from-white to-gray-50/50 px-3.5 py-1.5 font-medium text-gray-700 text-xs shadow-sm transition-all hover:border-emerald-200 hover:shadow-md dark:border-white/[0.08] dark:from-neutral-900 dark:to-neutral-900/50 dark:text-gray-300 dark:hover:border-emerald-500/30"
                href="https://www.netlify.com/"
                rel="noopener noreferrer"
                target="_blank"
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 group-hover:opacity-100" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                </span>
                <SiNetlify
                  aria-hidden
                  className="h-4 w-4 text-emerald-500 transition-colors group-hover:text-emerald-600 dark:text-emerald-400 dark:group-hover:text-emerald-300"
                />
                <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-gray-300 dark:to-gray-100">
                  Powered by Netlify
                </span>
              </motion.a>
              <span className="text-gray-500 text-xs dark:text-gray-500">
                Designed with <span className="text-red-500">❤</span> by the EternalCodeTeam.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
