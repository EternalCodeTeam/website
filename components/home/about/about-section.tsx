"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import PolandMap from "@/components/home/about/poland-map";
import PeopleGroupIcon from "@/components/icons/people-group";
import { Button } from "@/components/ui/button";
import { SlideIn } from "@/components/ui/motion/motion-components";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { hoverTilt, rotateIn, type MotionCustom } from "@/lib/animations/variants";
import AboutImage from "@/public/hero image.png";

export default function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="about-heading"
      className="relative overflow-hidden py-12 lg:py-24"
      id="about"
    >
      <div className="relative z-10 mx-auto max-w-[90rem] px-4">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          {/* Text Content */}
          <div className="lg:order-1">
            <SlideIn direction="left">
              <div className="mb-6 flex items-center gap-x-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  <Heart className="h-6 w-6" fill="currentColor" />
                </span>
                <h2 className="font-bold text-red-600 text-sm uppercase tracking-widest dark:text-red-400">
                  Made with Passion
                </h2>
              </div>

              <h3 className="mt-2 mb-8 font-extrabold text-4xl text-gray-900 tracking-tight sm:text-5xl lg:text-6xl dark:text-white">
                From{" "}
                <span className="relative inline-block">
                  <span
                    className="bg-gradient-to-b from-50% from-white to-50% to-[#DC143C] bg-clip-text text-transparent"
                    style={{ WebkitTextStroke: "0.5px rgba(0,0,0,0.5)" }}
                  >
                    Poland
                  </span>
                  <motion.div
                    className="absolute -top-6 -right-8 flex flex-col items-center will-change-transform"
                    custom={{ reduced: prefersReducedMotion, delay: 1 } satisfies MotionCustom}
                    initial="hidden"
                    variants={rotateIn}
                    animate="visible"
                  >
                    <div className="relative h-5 w-8 overflow-hidden rounded-sm drop-shadow-[0_0_1px_rgba(0,0,0,0.5)]">
                      <svg
                        className="block h-full w-full"
                        viewBox="0 0 32 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Poland Flag</title>
                        <rect fill="#ffffff" height="10" width="32" />
                        <rect fill="#DC143C" height="10" width="32" y="10" />
                      </svg>
                    </div>

                    <div className="-mt-1 ml-0.5 h-10 w-0.5 self-start rounded-full bg-gray-400 shadow-sm" />
                  </motion.div>
                </span>{" "}
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                  to the World
                </span>
              </h3>

              <div className="space-y-6 text-gray-600 text-lg dark:text-gray-300">
                <p>
                  EternalCode was born in Poland from a simple idea: software development is more
                  than just code—it&apos;s a form of art.
                </p>
                <p>
                  We are a collective of friends and passionate developers who believe in the power
                  of open source. Every project we ship is crafted with attention to detail and a
                  genuine love for technology.
                </p>
              </div>

              <div className="mt-10 flex gap-4">
                <Button className="group gap-2" href="/team" size="lg">
                  <PeopleGroupIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Meet the Team
                </Button>
              </div>
            </SlideIn>
          </div>

          {/* Image & Map Content */}
          <div className="relative flex items-center justify-center lg:order-2">
            <div className="relative flex aspect-square w-full max-w-[600px] items-center justify-center">
              {/* Animated Map Background */}
              <PolandMap />

              <SlideIn className="relative z-10 w-full" delay={0.3} direction="right">
                <motion.div
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                  custom={{ reduced: prefersReducedMotion, scale: 1.02, distance: 1 } satisfies MotionCustom}
                  initial="initial"
                  variants={hoverTilt}
                  whileHover="hover"
                >
                  <Image
                    alt="EternalCode Team"
                    className="h-auto w-full object-cover"
                    placeholder="blur"
                    priority
                    sizes="(max-width: 1024px) 100vw, 600px"
                    src={AboutImage}
                  />
                  {/* Subtle clean overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
                </motion.div>
              </SlideIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
