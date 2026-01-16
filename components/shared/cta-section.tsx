"use client";

import { SiDiscord } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { SlideIn } from "@/components/ui/motion/motion-components";

export default function Cta() {
  return (
    <section className="relative overflow-hidden py-12 lg:py-20">
      <div className="mx-auto max-w-[90rem] px-6 lg:px-8">
        <SlideIn direction="up">
          <div className="text-center">
            <h2 className="mx-auto max-w-2xl font-bold text-3xl text-gray-900 tracking-tight sm:text-4xl dark:text-white">
              Join our Community
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-gray-600 text-lg leading-8 dark:text-gray-400">
              Connect with other developers, showcase your projects, and get help with EternalCode
              libraries. The best discussions happen on our Discord.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                className="gap-2 border-[#5865F2]/50 bg-[#5865F2] hover:bg-[#5865F2]/90"
                href="https://discord.com/invite/FQ7jmGBd6c"
                leftIcon={<SiDiscord className="h-5 w-5" />}
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
