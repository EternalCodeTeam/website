"use client";

import type { ReactNode } from "react";
import { SiGithub, SiJetbrains, SiJira, SiNetlify, SiSentry } from "react-icons/si";
import { FadeIn } from "@/components/ui/motion/motion-components";

interface Sponsor {
  name: string;
  icon: ReactNode;
  url: string;
}

// Hoisted outside component to prevent recreation on each render
const sponsors: Sponsor[] = [
  {
    name: "Netlify",
    icon: <SiNetlify className="h-10 w-10" />,
    url: "https://www.netlify.com/",
  },
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

// Pre-computed repeated array (3x for seamless loop)
const repeatedSponsors = [...sponsors, ...sponsors, ...sponsors];

function SponsorItem({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a
      className="group relative flex items-center justify-center gap-4"
      href={sponsor.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="text-gray-400 opacity-70 grayscale filter transition-[opacity,filter] duration-500 ease-out group-hover:opacity-100 group-hover:grayscale-0">
        {sponsor.icon}
      </div>
      <span className="hidden font-bold text-gray-400 text-xl transition-colors duration-500 ease-out group-hover:text-gray-900 lg:block dark:text-gray-500 dark:group-hover:text-gray-300">
        {sponsor.name}
      </span>
    </a>
  );
}

export default function Sponsors() {
  return (
    <section className="relative w-full overflow-hidden py-8" id="sponsors">
      <FadeIn delay={0.1}>
        <div className="relative z-20 mb-6 text-center">
          <p className="font-semibold text-gray-500 text-sm uppercase tracking-widest dark:text-gray-400">
            Powered by industry leaders
          </p>
        </div>
      </FadeIn>

      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        {/* Using CSS animation instead of Framer Motion for better performance */}
        <div className="flex min-w-full shrink-0 animate-[scroll_40s_linear_infinite] items-center justify-around gap-12 px-4 motion-reduce:animate-none md:gap-32 md:px-16">
          {repeatedSponsors.map((sponsor, index) => (
            <SponsorItem key={`${sponsor.name}-${index}`} sponsor={sponsor} />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="flex min-w-full shrink-0 animate-[scroll_40s_linear_infinite] items-center justify-around gap-12 px-4 motion-reduce:animate-none md:gap-32 md:px-16"
        >
          {repeatedSponsors.map((sponsor, index) => (
            <SponsorItem key={`${sponsor.name}-dup-${index}`} sponsor={sponsor} />
          ))}
        </div>
      </div>
    </section>
  );
}
