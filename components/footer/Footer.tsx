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
    <footer className="isolate p-4 text-center sm:p-6 lg:text-right">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 flex items-center justify-center md:mb-0 md:justify-start">
            <Link href="/" legacyBehavior>
              <a className="flex items-center">
                <Image
                  className="mr-3 h-8 text-white dark:invert"
                  alt="Eternalcode Logo"
                  aria-label="Eternalcode Logo"
                  src={logo}
                  width="32"
                  height="32"
                />
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                  EternalCode.pl
                </span>
              </a>
            </Link>
          </div>

          <div className="grid grid-cols-2 justify-center gap-8 sm:grid-cols-3 sm:gap-6 md:justify-end">
            <div className="mb-6 sm:mb-0">
              <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Lorem Ipsum
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">
                  <Link
                    className="hover:underline"
                    aria-label="About EternalCode"
                    href="/"
                  >
                    Lorem Ipsum
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-6 sm:mb-0">
              <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Lorem Ipsum
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">
                  <a
                    href="/link"
                    className="hover:underline"
                    aria-label="EternalCode Github"
                  >
                    Lorem Ipsum
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Lorem Ipsum
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">
                  <a
                    href="/link"
                    className="hover:underline"
                    aria-label="EternalCode Repository"
                  >
                    Lorem Ipsum
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
            >
              <TikTokIcon />
            </a>
            <a
              aria-label="EternalCode Youtube link"
              className="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
              href="https://www.youtube.com/channel/UC2BEaMJWxxUscN50AD0oY_Q"
            >
              <YouTubeIcon />
            </a>
            <a
              aria-label="EternalCode Github link"
              className="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
              href="https://github.com/EternalCodeTeam"
            >
              <GitHubIcon />
            </a>
            <a
              aria-label="EternalCode Discord link"
              className="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
              href="https://discord.com/invite/FQ7jmGBd6c"
            >
              <DiscordIcon />
            </a>
            <a
              aria-label="EternalCode SpigotMC link"
              className="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
              href="https://www.spigotmc.org/resources/authors/eternalcodeteam.1570200/"
            >
              <SpigotMcLikeIcon />
            </a>
            <a
              aria-label="EternalCode Modrinht link"
              className="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
              href="https://modrinth.com/user/EternalCodeTeam"
            >
              <ModrinthIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
