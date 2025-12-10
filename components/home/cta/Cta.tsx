"use client";

import { SiDiscord } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { SlideIn } from "@/components/ui/motion/MotionComponents";

export default function Cta() {
  return (
    <section className="relative py-12 lg:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SlideIn direction="up">
          <div className="text-center">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Join our Community
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">
              Connect with other developers, showcase your projects, and get help with EternalCode
              libraries. The best discussions happen on our Discord.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                href="https://discord.com/invite/FQ7jmGBd6c"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="gap-2 bg-indigo-500 hover:bg-indigo-400 border-indigo-500/50"
                leftIcon={<SiDiscord className="h-5 w-5" />}
                shine
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
