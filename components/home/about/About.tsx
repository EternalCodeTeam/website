"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SlideIn } from "@/components/ui/motion/MotionComponents";
import AboutImage from "@/public/hero image.png";
import { Button } from "@/components/ui/button";
import GitHubIcon from "@/components/icons/github";
import { Heart } from "lucide-react";
import PolandMap from "@/components/home/about/PolandMap";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-12 lg:py-24 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          {/* Text Content */}
          <div className="lg:order-1">
            <SlideIn direction="left">
              <div className="flex items-center gap-x-3 mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  <Heart className="h-6 w-6" fill="currentColor" />
                </span>
                <h2 className="text-sm font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
                  Made with Passion
                </h2>
              </div>

              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl mb-8">
                From{" "}
                <span className="relative inline-block">
                  <span
                    className="text-transparent bg-clip-text bg-gradient-to-b from-white from-50% to-[#DC143C] to-50%"
                    style={{ WebkitTextStroke: "0.5px rgba(0,0,0,0.5)" }}
                  >
                    Poland
                  </span>
                  <motion.div
                    initial={{ opacity: 0, rotate: -15, scale: 0 }}
                    animate={{ opacity: 1, rotate: 12, scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="absolute -top-6 -right-8 flex flex-col items-center will-change-transform"
                  >
                    {/* Flag content */}
                    <div className="relative w-8 h-5 shadow-sm rounded-sm overflow-hidden ring-1 ring-inset ring-black/10">
                      <svg
                        viewBox="0 0 32 20"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full block"
                      >
                        <title>Poland Flag</title>
                        <rect width="32" height="10" fill="#ffffff" />
                        <rect y="10" width="32" height="10" fill="#DC143C" />
                      </svg>
                    </div>
                    {/* Flagpole */}
                    <div className="w-0.5 h-10 bg-gray-400 -mt-1 rounded-full self-start ml-0.5" />
                  </motion.div>
                </span>{" "}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  to the World
                </span>
              </h1>

              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
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
                <Button size="lg" className="gap-2 group">
                  <GitHubIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Visit our GitHub
                </Button>
              </div>
            </SlideIn>
          </div>

          {/* Image & Map Content */}
          <div className="lg:order-2 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[600px] flex items-center justify-center">
              {/* Animated Map Background */}
              <PolandMap />

              <SlideIn direction="right" delay={0.3} className="relative z-10 w-full">
                <motion.div
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={AboutImage}
                    alt="EternalCode Team"
                    className="w-full h-auto object-cover"
                    priority
                  />
                  {/* Subtle clean overlay instead of glass blur */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-2xl pointer-events-none" />
                </motion.div>
              </SlideIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
