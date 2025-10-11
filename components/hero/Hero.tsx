"use client";

import { motion, useAnimation } from "framer-motion";
import { Github, Users, Rocket, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";

import { AnimatedSection, AnimatedElement, AnimatedContainer } from "@/components/animations";
import Terminal from "@/components/hero/terminal/Terminal";
import ArrowForwardHeroIcon from "@/components/icons/arrow-forward-hero";
import PeopleGroupIcon from "@/components/icons/people-group";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const { ref: bgRef, inView: bgInView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const bgControls = useAnimation();

  const handleBgAnimation = useCallback(() => {
    if (bgInView) bgControls.start({ opacity: 1, y: 0 });
    else bgControls.start({ opacity: 0, y: 20 });
  }, [bgInView, bgControls]);

  useEffect(() => {
    handleBgAnimation();
  }, [handleBgAnimation]);

  const { ref: transRef, inView: transInView } = useInView({ triggerOnce: false, threshold: 0.1 });

  return (
    <div className="relative overflow-hidden">
      {/* Animated Blue Blob - Top Right */}
      <motion.div
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/15 blur-3xl"
        animate={{
          x: [0, 15, -10, 20, 0],
          y: [0, -12, 18, -8, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Blue Blob - Top Left */}
      <motion.div
        className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/15 to-blue-700/10 blur-3xl"
        animate={{
          x: [0, -20, 10, -30, 0],
          y: [0, 15, -10, 22, 0],
          scale: [1, 0.95, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Animated Blue Blob - Bottom Left */}
      <motion.div
        className="from-blue-300/18 to-blue-500/12 absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gradient-to-br blur-3xl"
        animate={{
          x: [0, 25, -15, 35, 0],
          y: [0, -20, 12, -30, 0],
          scale: [1, 1.15, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      />

      {/* Animated Blue Blob - Bottom Right */}
      <motion.div
        className="from-blue-400/18 to-blue-600/12 absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-gradient-to-br blur-3xl"
        animate={{
          x: [0, -18, 12, -25, 0],
          y: [0, 22, -15, 30, 0],
          scale: [1, 0.9, 1.2, 0.95, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 15,
        }}
      />

      {/* Animated Blue Blob - Center */}
      <motion.div
        className="absolute left-1/4 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-300/15 to-blue-500/10 blur-2xl"
        animate={{
          x: [0, 30, -20, 40, 0],
          y: [0, -15, 25, -10, 0],
          scale: [1, 1.1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 20,
        }}
      />

      <AnimatedSection
        className="relative mx-auto max-w-screen-xl px-6 pb-24 pt-60 lg:flex lg:items-center lg:justify-between lg:gap-12"
        animationType="fade"
        aria-labelledby="hero-heading"
      >
        <div className="flex flex-col items-center text-center lg:flex-1 lg:items-start lg:text-left">
          <AnimatedElement
            as="div"
            className="mb-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            animationType="fadeDown"
            delay={0.05}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/80 px-4 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-950 dark:text-blue-300 dark:ring-blue-400/30">
              <CheckCircle className="h-3.5 w-3.5" />
              Open Source
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-200/70 px-4 py-1.5 text-xs font-semibold text-blue-800 ring-1 ring-inset ring-blue-700/20 dark:bg-blue-950 dark:text-blue-300 dark:ring-blue-400/30">
              <Users className="h-3.5 w-3.5" />
              40+ Contributors
            </span>
          </AnimatedElement>

          <AnimatedElement
            as="h1"
            id="hero-heading"
            className="max-w-2xl whitespace-nowrap text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
            animationType="fadeDown"
            delay={0.1}
          >
            <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-transparent dark:from-blue-300 dark:via-blue-200 dark:to-blue-400">
              EternalCode.pl
            </span>
          </AnimatedElement>

          <AnimatedElement
            as="p"
            className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl lg:text-2xl"
            animationType="fadeUp"
            delay={0.2}
          >
            Building the future with{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">open source</span>.
            <br />
            Join our community of passionate developers.
          </AnimatedElement>

          <AnimatedContainer
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-4"
            staggerDelay={0.1}
            delay={0.3}
          >
            <AnimatedElement as="div" animationType="fadeLeft" interactive>
              <Link href="/team">
                <motion.div ref={bgRef} animate={bgControls} initial={{ opacity: 0, y: 20 }}>
                  <Button
                    variant="primary"
                    className="flex items-center gap-2"
                    leftIcon={<PeopleGroupIcon className="h-5 w-5" />}
                  >
                    See our team!
                  </Button>
                </motion.div>
              </Link>
            </AnimatedElement>

            <AnimatedElement as="div" animationType="fadeUp" interactive>
              <Link href="/#about">
                <motion.div
                  ref={transRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={transInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    variant="outline"
                    className="group flex items-center gap-2"
                    rightIcon={
                      <ArrowForwardHeroIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    }
                  >
                    About us
                  </Button>
                </motion.div>
              </Link>
            </AnimatedElement>

            <AnimatedElement as="div" animationType="fadeRight" interactive>
              <Link
                href="https://github.com/EternalCodeTeam"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  leftIcon={<Github className="h-4 w-4" />}
                >
                  GitHub
                </Button>
              </Link>
            </AnimatedElement>
          </AnimatedContainer>

          <AnimatedElement
            as="div"
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm lg:justify-start"
            animationType="fadeUp"
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
          </AnimatedElement>
        </div>

        <AnimatedElement
          as="div"
          className="mt-20 w-full lg:mt-0 lg:w-[52%] lg:flex-shrink-0"
          animationType="fadeLeft"
          delay={0.5}
        >
          <div className="relative">
            <Terminal />
          </div>
        </AnimatedElement>
      </AnimatedSection>
    </div>
  );
}
