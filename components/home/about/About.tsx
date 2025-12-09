"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { SlideIn, StaggerContainer } from "@/components/ui/motion/MotionComponents";
import AboutImage from "@/public/hero image.png";
import TerminalIcon from "../../icons/terminal-fill";

// Reusable container component for consistent spacing
const Container = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-8">{children}</div>
);

export default function About() {
  return (
    <section id="about" className="py-16" aria-labelledby="about-heading">
      <Container>
        {/* Two-column layout with image and text */}
        <div className="mx-auto items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
          {/* About image with animation - Slide In from Right */}
          <SlideIn className="mx-auto flex-1 sm:hidden lg:block" direction="right" delay={0.1}>
            <Image
              src={AboutImage}
              className="mx-auto rounded-xl shadow-lg"
              height={500}
              width={1000}
              priority={true}
              decoding="async"
              alt="Software development team collaborating"
            />
          </SlideIn>

          {/* About text content with staggered animations */}
          <StaggerContainer className="mx-auto mt-6 max-w-xl space-y-3 px-4 sm:px-0 md:mt-0 lg:max-w-2xl">
            <SlideIn
              direction="up" // Used to be fadeUp
            >
              <p className="mx-auto mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-center lg:mb-0 lg:mr-8 lg:text-left">
                <span className="flex items-center justify-center md:justify-center lg:justify-start">
                  About us
                  <TerminalIcon className="ml-2" />
                </span>
              </p>
            </SlideIn>

            <SlideIn direction="up">
              <p className="mx-auto text-center text-gray-500 dark:text-gray-400 lg:text-left">
                We are a team of programmers specializing in open-source projects. This allows us to
                gain new experiences and share knowledge with each other. We are open to any
                technology!
              </p>
            </SlideIn>

            <SlideIn direction="up">
              <p className="mx-auto text-center text-gray-500 dark:text-gray-400 lg:text-left">
                Special thanks to JetBrains, Sentry.io and Jira Software for providing open-source
                licenses to our team members. We would also like to express our gratitude to GitHub
                for providing high-quality software for managing Git repositories.
              </p>
            </SlideIn>
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
