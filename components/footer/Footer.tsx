"use client";

import Link from "next/link";
import Image from "next/image";
import TikTokIcon from "@/components/icons/round-tiktok";
import YouTubeIcon from "@/components/icons/youtube";
import GitHubIcon from "@/components/icons/github";
import DiscordIcon from "@/components/icons/discord";
import SpigotMcLikeIcon from "@/components/icons/spigotmc";
import ModrinthIcon from "@/components/icons/modrinth";
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

export default function Footer() {
  const footerSections: FooterSection[] = [
    {
      title: "COMPANY",
      links: [
        { href: "/#about", label: "About us" },
        { href: "/team", label: "Team" },
        { href: "/projects", label: "Projects" },
      ],
    },
    {
      title: "RESOURCES",
      links: [
        { href: "https://github.com/EternalCodeTeam", label: "GitHub", isExternal: true },
        { href: "https://discord.com/invite/FQ7jmGBd6c", label: "Discord", isExternal: true },
        { href: "https://www.youtube.com/channel/UC2BEaMJWxxUscN50AD0oY_Q", label: "YouTube", isExternal: true },
        { href: "https://www.tiktok.com/@eternalcode.pl", label: "TikTok", isExternal: true },
        { href: "https://www.spigotmc.org/resources/authors/eternalcodeteam.1570200/", label: "SpigotMC", isExternal: true },
        { href: "https://modrinth.com/organization/eternalcodeteam", label: "Modrinth", isExternal: true },
      ],
    },
    {
      title: "SEE MORE",
      links: [
        { href: "https://repo.eternalcode.pl/#/", label: "Repository", isExternal: true },
        { href: "https://docs.eternalcode.pl/", label: "Documentation", isExternal: true },
        { href: "https://status.eternalcode.pl/", label: "Status", isExternal: true },
        { href: "https://bstats.org/author/vLucky", label: "BStats", isExternal: true },
        { href: "/privacy-policy", label: "Privacy Policy" },
      ],
    },
  ];

  const socialLinks = [
    { href: "https://www.tiktok.com/@eternalcode.pl", label: "EternalCode TikTok link", icon: <TikTokIcon /> },
    { href: "https://www.youtube.com/channel/UC2BEaMJWxxUscN50AD0oY_Q", label: "EternalCode Youtube link", icon: <YouTubeIcon /> },
    { href: "https://github.com/EternalCodeTeam", label: "EternalCode Github link", icon: <GitHubIcon /> },
    { href: "https://discord.com/invite/FQ7jmGBd6c", label: "EternalCode Discord link", icon: <DiscordIcon /> },
  ];

  return (
    <footer className="isolate p-4 text-center sm:p-6 lg:text-left" role="contentinfo">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 flex flex-col items-center md:mb-0 md:items-start">
            <Link href="/" className="flex items-center" aria-label="Go to homepage">
              <Image
                className="mr-3 h-8 w-auto text-white dark:invert"
                alt="EternalCode Logo"
                aria-label="EternalCode Logo"
                src={logo}
                width={32}
                height={32}
                priority
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                EternalCode.pl
              </span>
            </Link>
            <p className="mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">
              Providing high-quality Minecraft plugins and development solutions
              since 2021.
            </p>
          </div>

          <div className="grid grid-cols-2 justify-center gap-8 sm:grid-cols-3 sm:gap-6 md:justify-end">
            {footerSections.map((section, index) => (
              <div key={index} className={index === 1 ? "" : "mb-6 sm:mb-0"}>
                <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                  {section.title}
                </h2>
                <ul className="text-gray-600 dark:text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mb-2">
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          className="hover:underline"
                          aria-label={link.label}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="hover:underline"
                          aria-label={link.label}
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

        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="mb-4 block text-sm text-gray-500 dark:text-gray-400 sm:mb-0 sm:text-center">
            © {new Date().getFullYear()} EternalCodeTeam. All rights reserved.
          </span>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                aria-label={link.label}
                className="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
