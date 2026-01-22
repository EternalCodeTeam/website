"use client";

import { MotionSection, SlideIn } from "@/components/ui/motion/motion-components";

export function ContributeHero() {
  return (
    <section className="relative pt-32 pb-8 lg:pt-48 lg:pb-12">
      <MotionSection className="relative z-10 mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SlideIn delay={0.1} direction="up">
            <h1 className="mb-6 font-bold text-4xl text-gray-900 leading-[1.1] tracking-tight sm:text-6xl dark:text-white">
              Become an Open Source{" "}
              <span className="relative inline-block">
                <span className="bg-linear-to-r from-green-400 via-green-500 to-green-600 bg-clip-text pb-2 font-extrabold text-5xl text-transparent sm:text-7xl">
                  Volunteer
                </span>
              </span>{" "}
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
