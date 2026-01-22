"use client";

import { MotionSection, SlideIn } from "@/components/ui/motion/motion-components";

export default function TeamHero() {
  return (
    <section className="relative pt-32 pb-8 lg:pt-48 lg:pb-12">
      <MotionSection className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <SlideIn delay={0.2} direction="up">
            <h1 className="mb-6 font-extrabold text-4xl text-gray-900 leading-tight tracking-tight sm:text-5xl md:text-6xl dark:text-white">
              The Architects of{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                Innovation
              </span>
            </h1>
          </SlideIn>

          <SlideIn delay={0.3} direction="up">
            <p className="mb-8 max-w-3xl text-gray-600 text-lg sm:text-xl dark:text-gray-300">
              Meet the developers, designers, and creators who build powerful open-source tools.
              Driven by curiosity and united by code.
            </p>
          </SlideIn>
        </div>
      </MotionSection>
    </section>
  );
}
