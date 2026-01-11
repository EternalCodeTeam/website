"use client";

import { m } from "framer-motion";
import { Github } from "lucide-react";
import ArrowForwardHeroIcon from "@/components/icons/arrow-forward-hero";
import { Button } from "@/components/ui/button";
import { FadeIn, SlideIn, StaggerContainer } from "@/components/ui/motion/motion-components";
import Terminal from "./terminal/terminal-window";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Blob */}
      <m.div
        animate={{
          x: [0, 15, -10, 20, 0],
          y: [0, -12, 18, -8, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-linear-to-br from-blue-400/20 to-blue-600/15 blur-3xl will-change-transform sm:h-64 sm:w-64"
        style={{ willChange: "transform" }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <StaggerContainer className="relative mx-auto max-w-[90rem] px-4 pt-48 pb-12 sm:pt-40 sm:pb-16 md:pt-48 lg:flex lg:items-center lg:justify-between lg:gap-16">
        {/* Text Content */}
        <div className="flex flex-col items-center text-center lg:flex-1 lg:items-start lg:text-left">
          {/* Title */}
          {/* Title - CSS Animated for LCP */}
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h1
              className="wrap-break-word max-w-3xl font-extrabold text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              id="hero-heading"
            >
              <span className="bg-linear-to-r from-blue-700 via-blue-500 to-blue-800 bg-clip-text text-transparent dark:from-blue-200 dark:via-blue-400 dark:to-blue-500">
                EternalCode.pl
              </span>
            </h1>
          </div>

          {/* Subtitle - CSS Animated for LCP */}
          <div
            className="transform-gpu animate-slide-up will-change-transform"
            style={{ animationDelay: "0.2s", willChange: "transform, opacity" }}
          >
            <p className="mt-6 max-w-2xl text-base text-gray-600 leading-relaxed sm:text-lg md:text-xl dark:text-gray-400">
              Building the future with{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 font-medium text-blue-600 dark:text-blue-400">
                  open source
                </span>
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 -z-10 h-3 w-full text-blue-600/80 dark:text-blue-400/80"
                  fill="none"
                  preserveAspectRatio="none"
                  shapeRendering="geometricPrecision"
                  viewBox="0 0 300 25"
                >
                  <m.path
                    d="M10 18C44 24 99 9 143 14C179 18 211 25 244 21C266 18 288 12 290 10"
                    initial={{ pathLength: 0, opacity: 0 }}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                  />
                </svg>
              </span>
              . Join a community of passionate developers crafting the next generation of software
              tools.
            </p>
          </div>

          {/* Buttons */}
          <FadeIn
            className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
            delay={0.3}
          >
            <Button
              className="group flex w-full min-w-[160px] items-center justify-center gap-2 sm:w-auto"
              href="#about"
              rightIcon={
                <ArrowForwardHeroIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              }
              shine
              size="lg"
              variant="primary"
            >
              About us
            </Button>

            <Button
              className="flex w-full min-w-[160px] items-center justify-center gap-2 sm:w-auto"
              href="https://github.com/EternalCodeTeam"
              leftIcon={<Github className="h-5 w-5" />}
              rel="noopener noreferrer"
              size="lg"
              target="_blank"
              variant="outline"
            >
              GitHub
            </Button>
          </FadeIn>
        </div>

        {/* Terminal - Right Side */}
        <SlideIn className="mt-16 w-full lg:mt-0 lg:w-[55%]" delay={0.4}>
          <div className="perspective-1000 relative mx-auto">
            <Terminal />
          </div>
        </SlideIn>
      </StaggerContainer>
    </div>
  );
}
