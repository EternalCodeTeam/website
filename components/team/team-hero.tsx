"use client";

import { MotionSection, SlideIn } from "@/components/ui/motion/motion-components";

export default function TeamHero() {
  return (
    <section className="relative pt-32 pb-12 lg:pt-44 lg:pb-16">
      <MotionSection className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <SlideIn delay={0.2} direction="up">
            <div className="section-kicker mb-7 justify-center">
              <span>People</span> EternalCode team
            </div>
            <h1 className="mb-6 max-w-5xl font-semibold text-5xl text-[var(--ec-text)] leading-[.95] tracking-[-.065em] sm:text-7xl">
              Friends who happen to build{" "}
              <span className="text-[var(--ec-accent-text)]">dependable software.</span>
            </h1>
          </SlideIn>

          <SlideIn delay={0.3} direction="up">
            <p className="mb-8 max-w-3xl text-gray-600 text-lg sm:text-xl dark:text-gray-300">
              No office, no matching hoodies, no quarterly targets. Just people who enjoy making
              useful open-source things together.
            </p>
          </SlideIn>
        </div>
      </MotionSection>
    </section>
  );
}
