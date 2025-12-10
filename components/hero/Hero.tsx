"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";

import { FadeIn, SlideIn, StaggerContainer } from "@/components/ui/motion/MotionComponents";
import Terminal from "@/components/hero/terminal/Terminal";
import ArrowForwardHeroIcon from "@/components/icons/arrow-forward-hero";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Blob */}
      <motion.div
        className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-linear-to-br from-blue-400/20 to-blue-600/15 blur-3xl sm:h-64 sm:w-64"
        animate={{
          x: [0, 15, -10, 20, 0],
          y: [0, -12, 18, -8, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <StaggerContainer className="relative mx-auto max-w-7xl px-5 pb-12 pt-48 sm:px-8 sm:pb-16 sm:pt-40 md:pt-48 lg:flex lg:items-center lg:justify-between lg:gap-16">
        {/* Text Content */}
        <div className="flex flex-col items-center text-center lg:flex-1 lg:items-start lg:text-left">
          {/* Title */}
          <SlideIn direction="down" delay={0.1}>
            <h1
              id="hero-heading"
              className="max-w-3xl wrap-break-word text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="bg-linear-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-transparent dark:from-white dark:via-blue-100 dark:to-blue-300">
                EternalCode.pl
              </span>
            </h1>
          </SlideIn>

          {/* Subtitle */}
          <SlideIn
            className="mt-6 max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl leading-relaxed"
            delay={0.2}
          >
            Building the future with{" "}
            <span className="font-medium text-blue-600 dark:text-blue-400">open source</span>. Join
            a community of passionate developers crafting the next generation of software tools.
          </SlideIn>

          {/* Buttons */}
          <FadeIn
            className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
            delay={0.3}
          >
            <Button
              href="/team"
              variant="primary"
              size="lg"
              className="group flex w-full items-center justify-center gap-2 sm:w-auto min-w-[160px]"
              rightIcon={
                <ArrowForwardHeroIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              }
              shine
            >
              Get Started
            </Button>

            <Button
              href="https://github.com/EternalCodeTeam"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
              className="flex w-full items-center justify-center gap-2 sm:w-auto min-w-[160px]"
              leftIcon={<Github className="h-5 w-5" />}
            >
              GitHub
            </Button>
          </FadeIn>
        </div>

        {/* Terminal - Right Side */}
        <SlideIn className="mt-16 w-full lg:mt-0 lg:w-[55%]" delay={0.4}>
          <div className="relative mx-auto perspective-1000">
            <Terminal />
          </div>
        </SlideIn>
      </StaggerContainer>
    </div>
  );
}
