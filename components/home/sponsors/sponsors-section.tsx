"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SiGithub, SiJetbrains, SiJira, SiSentry } from "react-icons/si";

interface Sponsor {
  name: string;
  icon: ReactNode;
  url: string;
}

export default function Sponsors() {
  const sponsors: Sponsor[] = [
    {
      name: "JetBrains",
      icon: <SiJetbrains className="h-12 w-12" />,
      url: "https://jetbrains.com",
    },
    {
      name: "Sentry",
      icon: <SiSentry className="h-10 w-10" />,
      url: "https://sentry.io",
    },
    {
      name: "Jira Software",
      icon: <SiJira className="h-10 w-10" />,
      url: "https://www.atlassian.com/software/jira",
    },
    {
      name: "GitHub",
      icon: <SiGithub className="h-10 w-10" />,
      url: "https://github.com",
    },
  ];

  const repeatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="relative w-full overflow-hidden py-8" id="sponsors">
      <div className="relative z-20 mb-6 text-center">
        <p className="font-semibold text-gray-500 text-sm uppercase tracking-widest dark:text-gray-400">
          Powered by industry leaders
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        <motion.div
          animate={{
            x: "-100%",
          }}
          className="flex min-w-full shrink-0 items-center justify-around gap-12 px-4 md:gap-32 md:px-16"
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
          }}
        >
          {repeatedSponsors.map((sponsor, index) => (
            <a
              className="group relative flex items-center justify-center gap-4 transition-all hover:scale-110"
              href={sponsor.url}
              key={`${sponsor.name}-${index}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="text-gray-400 opacity-70 grayscale filter transition-colors duration-300 group-hover:text-gray-900 group-hover:opacity-100 group-hover:grayscale-0 dark:group-hover:text-white">
                {sponsor.icon}
              </div>
              <span className="hidden font-bold text-gray-400 text-xl transition-colors duration-300 group-hover:text-gray-900 lg:block dark:text-gray-500 dark:group-hover:text-white">
                {sponsor.name}
              </span>
            </a>
          ))}
        </motion.div>

        <motion.div
          animate={{
            x: "-100%",
          }}
          aria-hidden="true"
          className="flex min-w-full shrink-0 items-center justify-around gap-12 px-4 md:gap-32 md:px-16"
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
          }}
        >
          {repeatedSponsors.map((sponsor, index) => (
            <a
              className="group relative flex items-center justify-center gap-4 transition-all hover:scale-110"
              href={sponsor.url}
              key={`${sponsor.name}-duplicate-${index}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="text-gray-400 opacity-70 grayscale filter transition-colors duration-300 group-hover:text-gray-900 group-hover:opacity-100 group-hover:grayscale-0 dark:group-hover:text-white">
                {sponsor.icon}
              </div>
              <span className="hidden font-bold text-gray-400 text-xl transition-colors duration-300 group-hover:text-gray-900 lg:block dark:text-gray-500 dark:group-hover:text-white">
                {sponsor.name}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
