"use client";

import { motion } from "framer-motion";
import { SiJetbrains, SiSentry, SiJira, SiGithub } from "react-icons/si";

interface Sponsor {
  name: string;
  icon: React.ReactNode;
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

  // Repeat the list to ensure it's long enough to cover large screens without frequent repetition
  const repeatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section id="sponsors" className="relative w-full overflow-hidden py-8">
      <div className="mb-6 text-center relative z-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Powered by industry leaders
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        <motion.div
          animate={{
            x: "-100%",
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
          }}
          className="flex min-w-full shrink-0 gap-12 px-4 items-center justify-around md:gap-32 md:px-16"
        >
          {repeatedSponsors.map((sponsor, index) => (
            <a
              href={sponsor.url}
              key={`${sponsor.name}-${index}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-4 transition-all hover:scale-110"
            >
              <div className="text-gray-400 transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-white filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100">
                {sponsor.icon}
              </div>
              <span className="hidden text-xl font-bold text-gray-400 transition-colors duration-300 group-hover:text-gray-900 lg:block dark:text-gray-500 dark:group-hover:text-white">
                {sponsor.name}
              </span>
            </a>
          ))}
        </motion.div>

        <motion.div
          animate={{
            x: "-100%",
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
          }}
          className="flex min-w-full shrink-0 gap-12 px-4 items-center justify-around md:gap-32 md:px-16"
          aria-hidden="true"
        >
          {repeatedSponsors.map((sponsor, index) => (
            <a
              href={sponsor.url}
              key={`${sponsor.name}-duplicate-${index}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-4 transition-all hover:scale-110"
            >
              <div className="text-gray-400 transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-white filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100">
                {sponsor.icon}
              </div>
              <span className="hidden text-xl font-bold text-gray-400 transition-colors duration-300 group-hover:text-gray-900 lg:block dark:text-gray-500 dark:group-hover:text-white">
                {sponsor.name}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
