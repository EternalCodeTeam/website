"use client";

import { Icon } from "@iconify/react";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SlideIn } from "@/components/ui/motion/motion-components";

export default function Cta() {
  return (
    <section className="relative overflow-hidden py-12 lg:py-20">
      <div className="mx-auto max-w-[90rem] px-6 lg:px-8">
        <SlideIn direction="up">
          <div className="text-center">
            <span className="relative inline-block">
              <h2 className="mx-auto max-w-2xl font-bold text-3xl text-gray-900 tracking-tight sm:text-4xl dark:text-white">
                Join our Community
              </h2>
              <m.div
                animate={{ opacity: 1, rotate: 14, scale: 1 }}
                className="absolute -top-10 -right-5 flex flex-col items-center will-change-transform"
                initial={{ opacity: 0, rotate: -15, scale: 0 }}
                transition={{ delay: 1, type: "spring" }}
              >
                <div className="relative h-5 w-8 overflow-hidden rounded-sm drop-shadow-[0_0_1px_rgba(0,0,0,0.5)]">
                  <svg
                    className="block h-full w-full"
                    viewBox="0 0 38 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Pride Flag</title>
                    <rect fill="#EB3535" height="10" width="38" y="0" />
                    <rect fill="#FF9E33" height="10" width="38" y="4" />
                    <rect fill="#FFEF33" height="10" width="38" y="8" />
                    <rect fill="#33A653" height="10" width="38" y="12" />
                    <rect fill="#4560AD" height="10" width="38" y="16" />
                    <rect fill="#8C479B" height="10" width="38" y="20" />
                  </svg>
                </div>
                <div className="-mt-1 ml-0.5 h-10 w-0.5 self-start rounded-full bg-gray-400 shadow-sm" />
              </m.div>
            </span>

            <p className="mx-auto mt-6 max-w-xl text-gray-600 text-lg leading-8 dark:text-gray-400">
              Connect with other developers, showcase your projects, and get help with EternalCode
              libraries. The best discussions happen on our Discord.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                className="gap-2 border-[#5865F2]/50 bg-[#5865F2] hover:bg-[#5865F2]/90"
                href="https://discord.com/invite/FQ7jmGBd6c"
                leftIcon={<Icon className="h-5 w-5" icon="simple-icons:discord" />}
                rel="noopener noreferrer"
                shine
                size="lg"
                target="_blank"
                variant="primary"
              >
                Join Discord
              </Button>
            </div>
          </div>
        </SlideIn>
      </div>
    </section>
  );
}
