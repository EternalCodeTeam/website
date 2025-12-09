"use client";

import { motion } from "framer-motion";
import { CheckCircle, Github, Rocket, Users, Zap } from "lucide-react";
import Link from "next/link";

import { FadeIn, SlideIn, StaggerContainer } from "@/components/ui/motion/MotionComponents";
import Terminal from "@/components/hero/terminal/Terminal";
import ArrowForwardHeroIcon from "@/components/icons/arrow-forward-hero";
import PeopleGroupIcon from "@/components/icons/people-group";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Blob - Kept custom as it is specific */}
      <motion.div
        className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-linear-to-br from-blue-400/20 to-blue-600/15 blur-3xl sm:h-64 sm:w-64"
        animate={{
          x: [0, 15, -10, 20, 0],
          y: [0, -12, 18, -8, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <StaggerContainer className="relative mx-auto max-w-(--breakpoint-xl) px-5 pb-24 pt-72 sm:px-8 sm:pb-28 sm:pt-52 md:pt-60 lg:flex lg:items-center lg:justify-between lg:gap-12">
        {/* Text Content */}
        <div className="flex flex-col items-center text-center lg:flex-1 lg:items-start lg:text-left">
          {/* Badges */}
          <SlideIn
            direction="down"
            className="mb-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/80 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-950 dark:text-blue-300 dark:ring-blue-400/30">
              <CheckCircle className="h-3.5 w-3.5" />
              Open Source
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-200/70 px-3 py-1 text-xs font-semibold text-blue-800 ring-1 ring-inset ring-blue-700/20 dark:bg-blue-950 dark:text-blue-300 dark:ring-blue-400/30">
              <Users className="h-3.5 w-3.5" />
              40+ Contributors
            </span>
          </SlideIn>

          {/* Title */}
          <SlideIn direction="down" delay={0.1}>
            <h1
              id="hero-heading"
              className="max-w-2xl wrap-break-word text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="bg-linear-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-transparent dark:from-blue-300 dark:via-blue-200 dark:to-blue-400">
                EternalCode.pl
              </span>
            </h1>
          </SlideIn>

          {/* Subtitle */}
          <SlideIn
            className="mt-5 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl"
            delay={0.2}
          >
            <p>
              Building the future with{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">open source</span>.
              <br className="hidden sm:block" />
              Join our community of passionate developers.
            </p>
          </SlideIn>

          {/* Buttons */}
          <FadeIn
            className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
            delay={0.3}
          >
            <Link href="/team">
              <Button
                variant="primary"
                className="flex w-full items-center justify-center gap-2 sm:w-auto"
                leftIcon={<PeopleGroupIcon className="h-5 w-5" />}
              >
                See our team!
              </Button>
            </Link>

            <Link href="/#about">
              <Button
                variant="outline"
                className="group flex w-full items-center justify-center gap-2 sm:w-auto"
                rightIcon={
                  <ArrowForwardHeroIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                }
              >
                About us
              </Button>
            </Link>

            <Link
              href="https://github.com/EternalCodeTeam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="flex w-full items-center justify-center gap-2 sm:w-auto"
                leftIcon={<Github className="h-4 w-4" />}
              >
                GitHub
              </Button>
            </Link>
          </FadeIn>

          {/* Stats / Info */}
          <SlideIn
            className="mt-10 flex flex-wrap items-center justify-center gap-5 text-sm lg:justify-start"
            delay={0.4}
          >
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 animate-pulse text-blue-500" />
              <span className="text-gray-600 dark:text-gray-400">Active Development</span>
            </div>
            <div className="flex items-center gap-2">
              <Rocket className="h-4 w-4 text-blue-500" />
              <span className="text-gray-600 dark:text-gray-400">Community Driven</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span className="text-gray-600 dark:text-gray-400">Production Ready</span>
            </div>
          </SlideIn>
        </div>

        {/* Terminal - Right Side */}
        <SlideIn
          className="mt-20 w-full lg:mt-0 lg:w-[52%]"
          delay={0.5}
          // direction="up" // Explicitly up looks best
        >
          <div className="relative mx-auto max-w-md sm:max-w-lg md:max-w-xl">
            <Terminal />
          </div>
        </SlideIn>
      </StaggerContainer>
    </div>
  );
}
