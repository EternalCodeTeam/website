"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { SiGithub, SiJetbrains, SiJira, SiNetlify, SiSentry } from "react-icons/si";
import { FadeIn } from "@/components/ui/motion/motion-components";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { containerStagger, marquee, popIn, type MotionCustom } from "@/lib/animations/variants";

interface Sponsor {
  name: string;
  icon: ReactNode;
  url: string;
}

export default function Sponsors() {
  const prefersReducedMotion = useReducedMotion();
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

  const repeatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="relative w-full overflow-hidden py-8" id="sponsors">
      <FadeIn delay={0.1}>
        <div className="relative z-20 mb-6 text-center">
          <p className="font-semibold text-gray-500 text-sm uppercase tracking-widest dark:text-gray-400">
            Powered by industry leaders
          </p>
        </div>
      </FadeIn>

      <m.div
        className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
        custom={{
          reduced: prefersReducedMotion,
          stagger: 0.05,
          delayChildren: 0.1,
        } satisfies MotionCustom}
        initial="hidden"
        variants={containerStagger}
        viewport={{ once: true, margin: "-50px" }}
        whileInView="visible"
      >
        <m.div
          className="flex min-w-full shrink-0 items-center justify-around gap-12 px-4 md:gap-32 md:px-16"
          custom={{ reduced: prefersReducedMotion, duration: 40 } satisfies MotionCustom}
          initial="initial"
          variants={marquee}
          animate="animate"
        >
          {repeatedSponsors.map((sponsor, index) => (
            <m.a
              className="group relative flex items-center justify-center gap-4"
              href={sponsor.url}
              key={`${sponsor.name}-${index}`}
              rel="noopener noreferrer"
              target="_blank"
              custom={{ reduced: prefersReducedMotion, distance: 20, scale: 0.95 } satisfies MotionCustom}
              variants={popIn}
            >
              <m.div className="text-gray-400 opacity-70 grayscale filter transition-all duration-500 ease-out group-hover:opacity-100 group-hover:grayscale-0">
                {sponsor.icon}
              </m.div>
              <m.span className="hidden font-bold text-gray-400 text-xl transition-colors duration-500 ease-out group-hover:text-gray-900 lg:block dark:text-gray-500 dark:group-hover:text-gray-300">
                {sponsor.name}
              </m.span>
            </m.a>
          ))}
        </m.div>

        <m.div
          aria-hidden="true"
          className="flex min-w-full shrink-0 items-center justify-around gap-12 px-4 md:gap-32 md:px-16"
          custom={{ reduced: prefersReducedMotion, duration: 40 } satisfies MotionCustom}
          initial="initial"
          variants={marquee}
          animate="animate"
        >
          {repeatedSponsors.map((sponsor, index) => (
            <m.a
              className="group relative flex items-center justify-center gap-4"
              href={sponsor.url}
              key={`${sponsor.name}-duplicate-${index}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <m.div className="text-gray-400 opacity-70 grayscale filter transition-all duration-500 ease-out group-hover:opacity-100 group-hover:grayscale-0">
                {sponsor.icon}
              </m.div>
              <m.span className="hidden font-bold text-gray-400 text-xl transition-colors duration-500 ease-out group-hover:text-gray-900 lg:block dark:text-gray-500 dark:group-hover:text-gray-300">
                {sponsor.name}
              </m.span>
            </m.a>
          ))}
        </m.div>
      </m.div>
    </section>
  );
}
