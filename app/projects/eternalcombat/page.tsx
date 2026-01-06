"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Ban, Book, Download, Settings, Shield, Swords, Zap } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FacadePattern } from "@/components/ui/facade-pattern";
import { FadeIn, SlideIn } from "@/components/ui/motion/motion-components";

import { ConfigPreview } from "./config-preview";

export default function EternalCombatPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="relative min-h-screen bg-white text-gray-900 selection:bg-red-500/30 dark:bg-gray-950 dark:text-white">
      {/* Background Decor */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <FacadePattern className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-red-500/5 p-20 mix-blend-multiply blur-[100px] dark:mix-blend-screen" />
        <div className="absolute top-20 left-0 h-[400px] w-[400px] rounded-full bg-orange-500/5 p-20 mix-blend-multiply blur-[100px] dark:mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={targetRef}>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32">
          <motion.div
            className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16"
            style={{ opacity, scale }}
          >
            {/* Text Content */}
            <div className="z-20 flex-1 text-center lg:text-left">
              <FadeIn>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 font-semibold text-red-600 text-xs uppercase tracking-wider dark:bg-red-900/20 dark:text-red-400">
                  <Swords className="h-3 w-3" />
                  PvP Evolved
                </div>
                <h1 className="mb-6 font-extrabold text-4xl text-gray-900 leading-[1.1] tracking-tight md:text-5xl lg:text-6xl dark:text-white">
                  Combat Logging, <br />
                  <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    Solved Forever.
                  </span>
                </h1>

                <p className="mx-auto mb-8 max-w-2xl text-gray-600 text-lg leading-relaxed lg:mx-0 dark:text-gray-400">
                  EternalCombat is the ultimate solution for fair PvP. Prevent combat logging,
                  secure your spawn, and customize every aspect of the battle.
                </p>

                <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                  <Button
                    className="bg-red-600 text-white shadow-red-500/25 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                    href="/builds?project=eternalcombat"
                    leftIcon={<Download className="h-4 w-4" />}
                    shine
                    variant="primary"
                  >
                    Download Now
                  </Button>

                  <Button
                    href="https://eternalcode.pl/docs/eternalcombat"
                    leftIcon={<Book className="h-4 w-4" />}
                    rel="noopener noreferrer"
                    target="_blank"
                    variant="outline"
                  >
                    Documentation
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8 pt-4 lg:justify-start">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-500">
                      <motion.div
                        animate={{ rotate: [-6, 6, -6] }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <Swords className="h-5 w-5" />
                      </motion.div>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-gray-900 text-lg leading-none dark:text-white">
                        200+
                      </span>
                      <span className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
                        Servers
                      </span>
                    </div>
                  </div>

                  <div className="hidden h-8 w-px bg-gray-200 sm:block dark:bg-gray-800" />

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-500">
                      <motion.div
                        animate={{ opacity: [1, 0.6, 1], scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Zap className="h-5 w-5 fill-current" />
                      </motion.div>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-gray-900 text-lg leading-none dark:text-white">
                        1000+
                      </span>
                      <span className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
                        Daily Players
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Visual/Image Placeholder */}
            <div className="relative w-full max-w-xl flex-1 lg:max-w-none">
              <FadeIn delay={0.2}>
                {/* Code Preview Overlay */}
                <div className="flex items-center justify-center pt-8 lg:pt-0">
                  <div className="w-full max-w-lg rounded-xl border border-gray-700/50 bg-gray-900/90 p-6 shadow-2xl backdrop-blur-sm transition-transform duration-500 hover:scale-[1.02]">
                    <div className="mb-4 flex items-center gap-2 border-gray-700/50 border-b pb-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <div className="ml-2 font-mono text-gray-400 text-xs">latest.txt</div>
                    </div>
                    <div className="font-mono text-gray-400 text-sm leading-relaxed">
                      <div>
                        <span className="text-gray-500">[19:23:01]</span>{" "}
                        <span className="bg-gradient-to-r from-[#ff6666] to-[#ff0000] bg-clip-text font-bold text-transparent">
                          ⚔ vLucky is in combat!
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">[19:23:01]</span>{" "}
                        <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text font-bold text-transparent">
                          ⚠ You are in combat!
                        </span>{" "}
                        <span className="text-white underline decoration-1 decoration-white/30 underline-offset-2">
                          Do not leave the server!
                        </span>
                      </div>
                      <div className="my-2 text-gray-500">...</div>
                      <div className="text-yellow-400">
                        <span className="text-gray-500">[19:23:45]</span> vLucky tried to
                        disconnect.
                      </div>
                      <div className="text-red-500">
                        <span className="text-gray-500">[19:23:45]</span>{" "}
                        <span className="bg-gradient-to-r from-red-600 to-red-900 bg-clip-text font-bold text-transparent">
                          ⚠ vLucky logged off during combat!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="border-gray-100 border-t py-24 dark:border-gray-800/50">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <FadeIn>
              <h2 className="mb-4 font-bold text-3xl">Everything you need for fair fights.</h2>
              <p className="text-gray-600 text-lg dark:text-gray-400">
                EternalCombat is packed with features designed to keep your players engaged and your
                server balanced.
              </p>
            </FadeIn>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Spawn Protection",
                description:
                  "Automatically block access to safe zones and spawn areas while players are in combat.",
                icon: Shield,
                color: "text-blue-500",
                bg: "bg-blue-500/10",
              },
              {
                title: "Crystal PvP Ready",
                description:
                  "Native support for End Crystals ensures that high-stakes battles are never interrupted unfairly.",
                icon: Zap,
                color: "text-purple-500",
                bg: "bg-purple-500/10",
              },
              {
                title: "Anti-Camping",
                description:
                  "Prevent players from holding regions hostage or abusing safe zones to escape death.",
                icon: Ban,
                color: "text-red-500",
                bg: "bg-red-500/10",
              },
            ].map((feature, i) => (
              <SlideIn className="h-full" delay={i * 0.1} direction="up" key={feature.title}>
                <div className="group h-full rounded-2xl border border-gray-200 bg-gray-50 p-8 transition-colors hover:border-red-500/30 dark:border-gray-800 dark:bg-gray-900/50">
                  <div
                    className={`h-12 w-12 rounded-xl ${feature.bg} ${feature.color} mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 text-xl dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </SlideIn>
            ))}
          </div>
        </section>

        {/* Configuration Section */}
        <section className="border-gray-100 border-t py-24 dark:border-gray-800/50">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <SlideIn direction="left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-600 text-xs uppercase tracking-wider dark:bg-gray-800 dark:text-gray-300">
                <Settings className="h-3 w-3" />
                Configuration
              </div>
              <h2 className="mb-6 font-bold text-3xl tracking-tight">Control every mechanic.</h2>
              <p className="mb-8 text-gray-600 text-lg leading-relaxed dark:text-gray-400">
                From disabling elytras to setting custom pearl cooldowns, EternalCombat gives you
                granular control over the PvP experience.
              </p>

              <div className="space-y-6">
                {[
                  "Disable Elytra & Inventory access",
                  "Whitelist or Blacklist commands",
                  "Custom damage & projectile tags",
                  "Pearl cooldowns & Block placement control",
                ].map((item) => (
                  <div className="flex items-center gap-3" key={item}>
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </SlideIn>

            <SlideIn delay={0.2} direction="right">
              <div className="group perspective-1000 relative">
                {/* The "Long Screenshot" Container */}
                <div className="relative h-[600px] w-full transform select-none overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-transform duration-700 hover:scale-[1.02] dark:border-gray-800 dark:bg-[#0d1117]">
                  {/* Tilted Content */}
                  <div className="absolute -top-10 -left-[15%] h-[200%] w-[150%] origin-top-left rotate-2 transform transition-all duration-700 hover:rotate-0 hover:scale-100">
                    {/* Inner blur container */}
                    <div className="h-full pl-24 opacity-90 blur-[0.5px] filter transition-all duration-700 group-hover:opacity-100 group-hover:blur-0">
                      {/* Auto-scrolling animation container */}
                      <div className="animate-scroll-y">
                        <ConfigPreview />
                        {/* Duplicate content for seamless loop */}
                        <ConfigPreview />
                      </div>
                    </div>
                  </div>

                  {/* Gradient overlay to fade bottom */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-white to-transparent dark:from-[#0d1117]" />

                  {/* Animation Styles */}
                  <style jsx>{`
                                        @keyframes scroll-y {
                                            0% { transform: translateY(0); }
                                            100% { transform: translateY(-50%); }
                                        }
                                        .animate-scroll-y {
                                            animation: scroll-y 60s linear infinite;
                                        }
                                        .animate-scroll-y:hover {
                                            animation-play-state: paused;
                                        }
                                    `}</style>
                </div>
              </div>
            </SlideIn>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="border-gray-100 border-t py-32 text-center dark:border-gray-800/50">
          <FadeIn>
            <h2 className="mb-6 font-bold text-3xl tracking-tight md:text-4xl">
              Hundreds of servers trust EternalCombat.
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-gray-600 text-lg dark:text-gray-400">
              Don't let loggers ruin your server's economy and fun.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                className="min-w-[160px] bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                href="/builds?project=eternalcombat"
                shine
                size="lg"
                variant="primary"
              >
                Get Plugin
              </Button>
              <Button
                className="min-w-[160px]"
                href="https://github.com/EternalCodeTeam/EternalCombat"
                rel="noopener noreferrer"
                size="lg"
                target="_blank"
                variant="outline"
              >
                GitHub
              </Button>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
