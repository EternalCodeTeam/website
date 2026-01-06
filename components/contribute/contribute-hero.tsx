"use client";

import { SlideIn, StaggerContainer } from "@/components/ui/motion/motion-components";

export function ContributeHero() {
  return (
    <section className="relative pt-32 pb-8 lg:pt-48 lg:pb-12">
      <StaggerContainer className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SlideIn delay={0.1} direction="up">
            <h1 className="mb-6 font-bold text-4xl text-gray-900 tracking-tight sm:text-6xl dark:text-white">
              Become an Open Source{" "}
              <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                Volunteer
              </span>{" "}
              with EternalCode
            </h1>
          </SlideIn>

          <SlideIn delay={0.2} direction="up">
            <p className="mb-12 text-gray-600 text-lg leading-8 dark:text-gray-400">
              EternalCode is built by a passionate community. Whether you write code, design, write
              documentation, or support others, there's a place for you here.
            </p>
          </SlideIn>
        </div>
      </StaggerContainer>
    </section>
  );
}
