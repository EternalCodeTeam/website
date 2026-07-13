"use client";

import { MotionSection, SlideIn } from "@/components/ui/motion/motion-components";

export function ContributeHero() {
  return (
    <section className="relative pt-32 pb-12 lg:pt-44 lg:pb-16">
      <MotionSection className="relative z-10 mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SlideIn delay={0.1} direction="up">
            <div className="section-kicker mb-7 justify-center">
              <span>Contribute</span> Build in public
            </div>
            <h1 className="mb-6 font-semibold text-5xl text-[var(--ec-text)] leading-[.95] tracking-[-.065em] sm:text-7xl">
              Make open source <span className="text-[var(--ec-accent-text)]">better with us.</span>
            </h1>
          </SlideIn>

          <SlideIn delay={0.2} direction="up">
            <p className="mx-auto mb-12 max-w-2xl text-gray-600 text-lg leading-8 dark:text-gray-400">
              Whether you write code, design, write documentation, or support others, there's a
              place for you here.
            </p>
          </SlideIn>
        </div>
      </MotionSection>
    </section>
  );
}
