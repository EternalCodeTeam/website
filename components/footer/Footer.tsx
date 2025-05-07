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

export default function Footer() {
  return (
    <footer className="isolate p-4 text-center sm:p-6 lg:text-left">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 flex flex-col items-center md:mb-0 md:items-start">
            <Link href="/" className="flex items-center">
              <Image
                className="mr-3 h-8 text-white dark:invert"
                alt="Eternalcode Logo"
                aria-label="Eternalcode Logo"
                src={logo}
                width="32"
                height="32"
                priority
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                EternalCode.pl
              </span>
            </Link>
            <p className="mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">
              Providing high-quality Minecraft plugins and development solutions since 2021.
            </p>
          </div>

          <div className="grid grid-cols-2 justify-center gap-8 sm:grid-cols-3 sm:gap-6 md:justify-end">
            <div className="mb-6 sm:mb-0">
              <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                TEAM
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">
                  <Link
                    className="hover:underline"
                    aria-label="About EternalCode"
                    href="/#about"
                  >
                    About us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="hover:underline"
                    aria-label="Our team"
                    href="/team"
                  >
                    Team
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="hover:underline"
                    aria-label="Projects"
                    href="/projects"
                  >
                    Projects
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                FOLLOW US
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">
                  <a
                    href="https://github.com/EternalCodeTeam"
                    className="hover:underline"
                    aria-label="EternalCode GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://discord.com/invite/FQ7jmGBd6c"
                    className="hover:underline"
                    aria-label="EternalCode Discord"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://www.youtube.com/channel/UC2BEaMJWxxUscN50AD0oY_Q"
                    className="hover:underline"
                    aria-label="EternalCode YouTube"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://www.tiktok.com/@eternalcode.pl"
                    className="hover:underline"
                    aria-label="EternalCode TikTok"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TikTok
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://www.spigotmc.org/resources/authors/eternalcodeteam.1570200/"
                    className="hover:underline"
                    aria-label="EternalCode SpigotMC"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SpigotMC
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://modrinth.com/organization/eternalcodeteam"
                    className="hover:underline"
                    aria-label="EternalCode Modrinth"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Modrinth
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-6 sm:mb-0">
              <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                SEE MORE
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">
                  <a
                    href="https://repo.eternalcode.pl/#/"
                    className="hover:underline"
                    aria-label="EternalCode Repository"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repository
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://docs.eternalcode.pl/"
                    className="hover:underline"
                    aria-label="EternalCode Documentations"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Documentations
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://status.eternalcode.pl/"
                    className="hover:underline"
                    aria-label="EternalCode Status"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Status
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://bstats.org/author/vLucky"
                    className="hover:underline"
                    aria-label="EternalCode BStats"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BStats
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="mb-4 block text-sm text-gray-500 dark:text-gray-400 sm:mb-0 sm:text-center">
            © 2021-present EternalCodeTeam. All rights reserved.
          </span>
          <div className="flex justify-center space-x-6">
            <a
              aria-label="EternalCode TikTok link"
              className="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
              href="https://www.tiktok.com/@eternalcode.pl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TikTokIcon />
            </a>
            <a
              aria-label="EternalCode Youtube link"
              className="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
              href="https://www.youtube.com/channel/UC2BEaMJWxxUscN50AD0oY_Q"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeIcon />
            </a>
            <a
              aria-label="EternalCode Github link"
              className="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
              href="https://github.com/EternalCodeTeam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </a>
            <a
              aria-label="EternalCode Discord link"
              className="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
              href="https://discord.com/invite/FQ7jmGBd6c"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiscordIcon />
            </a>
            <a
              aria-label="EternalCode SpigotMC link"
              className="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
              href="https://www.spigotmc.org/resources/authors/eternalcodeteam.1570200/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SpigotMcLikeIcon />
            </a>
            <a
              aria-label="EternalCode Modrinth link"
              className="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
              href="https://modrinth.com/organization/eternalcodeteam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ModrinthIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
