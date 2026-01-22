"use client";

import { m, motion, useScroll, useTransform } from "framer-motion";
import { Book, Check, ChevronRight, Download, Layers, Settings, Zap } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FacadePattern } from "@/components/ui/facade-pattern";
import {
  FadeIn,
  ScaleIn,
  SlideIn,
  StaggerContainer,
} from "@/components/ui/motion/motion-components";
import { slideUp } from "@/lib/animations/variants";

import { ConfigPreview } from "./config-preview";
import { EternalShowcase } from "./eternal-showcase";

export default function EternalCorePage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-900 selection:bg-[#9d6eef]/30 dark:bg-gray-950 dark:text-white">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-[#9d6eef]/20 blur-3xl filter dark:bg-[#9d6eef]/10" />
        <div className="absolute top-[40%] left-0 h-[600px] w-[600px] -translate-x-1/3 rounded-full bg-[#d946ef]/20 mix-blend-multiply blur-3xl filter dark:bg-[#d946ef]/10 dark:mix-blend-screen" />
        <div className="absolute right-0 bottom-20 h-[600px] w-[600px] translate-x-1/3 rounded-full bg-[#8b5cf6]/20 mix-blend-multiply blur-3xl filter dark:bg-[#8b5cf6]/10 dark:mix-blend-screen" />
        <FacadePattern className="absolute inset-0 h-full opacity-30 dark:opacity-10" />
      </div>

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8" ref={targetRef}>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32">
          <motion.div
            className="relative flex flex-col items-center gap-12 lg:flex-row lg:gap-16"
            style={{ opacity, scale }}
          >
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <StaggerContainer className="flex flex-col items-center lg:items-start">
                <m.div variants={slideUp}>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#9d6eef]/5 px-3 py-1 font-bold text-[#9d6eef] text-[10px] uppercase tracking-widest">
                    <Zap className="h-3 w-3" />
                    Next-Gen Essentials
                  </div>
                </m.div>

                <m.div variants={slideUp}>
                  <h1 className="mb-6 font-extrabold text-4xl text-gray-900 tracking-tight md:text-5xl lg:text-6xl dark:text-white">
                    Essential commands.
                    <br />
                    <span className="bg-gradient-to-r from-[#9d6eef] via-[#A1AAFF] to-[#9d6eef] bg-clip-text text-transparent">
                      Uncompromised performance.
                    </span>
                  </h1>
                </m.div>

                <m.div variants={slideUp}>
                  <p className="mx-auto mb-8 max-w-2xl text-gray-600 text-lg leading-relaxed lg:mx-0 dark:text-gray-400">
                    EternalCore is a modern, open-source replacement for EssentialsX. Built for
                    Paper & Folia to deliver maximum performance without the legacy bloat.
                  </p>
                </m.div>

                <m.div
                  className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
                  variants={slideUp}
                >
                  <Button
                    className="bg-[#9d6eef] text-white shadow-purple-500/25 hover:bg-[#854ce6] dark:bg-[#9d6eef] dark:hover:bg-[#854ce6]"
                    href="/builds?project=eternalcore"
                    leftIcon={<Download className="h-4 w-4" />}
                    shine
                    variant="primary"
                  >
                    Download
                  </Button>

                  <Button
                    href="https://eternalcode.pl/docs"
                    leftIcon={<Book className="h-4 w-4" />}
                    rel="noopener noreferrer"
                    target="_blank"
                    variant="outline"
                  >
                    Documentation
                  </Button>
                </m.div>
              </StaggerContainer>
            </div>

            {/* Project Banner Placeholder */}
            <div className="w-full max-w-xl flex-1 lg:max-w-none">
              <ScaleIn delay={0.2}>
                <div className="group relative aspect-video overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                  <Image
                    alt="EternalCore Project Banner"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    fill
                    priority
                    src="/eternalcore/readme-banner.png"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-blue-500/10 via-transparent to-purple-500/10 mix-blend-overlay" />
                </div>
              </ScaleIn>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="border-gray-100 border-t py-24 dark:border-gray-800/50">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <FadeIn>
              <h2 className="mb-4 font-bold text-3xl tracking-tight md:text-4xl">
                The core of your network.
              </h2>
              <p className="text-gray-600 text-lg dark:text-gray-400">
                Everything you need to run a professional server, available for free.
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "80+ Commands",
                description:
                  "From essential administration to fun mechanics, we have covered every use case you can imagine.",
                icon: Layers,
                iconColor: "text-purple-500",
                gradient: "from-purple-500/20 to-indigo-500/20",
              },
              {
                title: "Open Source & Free",
                description:
                  "EternalCore is and will always be free. Inspect the code, contribute, and build with confidence.",
                icon: Download,
                iconColor: "text-green-500",
                gradient: "from-green-500/20 to-emerald-500/20",
              },
              {
                title: "Paper & Folia",
                description:
                  "Built specifically for modern server software. 100% async and optimized for high-performance.",
                icon: Zap,
                iconColor: "text-yellow-500",
                gradient: "from-yellow-500/20 to-orange-500/20",
              },
              {
                title: "Rich Formatting",
                description:
                  "Full support for modern MiniMessage <gradients> and legacy &c&lcolor codes simultaneously.",
                icon: Check,
                iconColor: "text-blue-500",
                gradient: "from-blue-500/20 to-cyan-500/20",
              },
            ].map((feature) => (
              <m.div className="h-full" key={feature.title} variants={slideUp}>
                <Card className="group relative flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:bg-gray-50 hover:shadow-lg dark:hover:bg-gray-800/60">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${feature.gradient} pointer-events-none`}
                  />

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 shadow-inner ring-1 ring-gray-200 transition-colors group-hover:bg-white dark:bg-gray-800 dark:ring-gray-700 dark:group-hover:bg-gray-700">
                    <feature.icon
                      className={`h-6 w-6 transition-transform duration-300 group-hover:scale-110 ${feature.iconColor}`}
                    />
                  </div>
                  <h3 className="mb-2 font-bold text-gray-900 text-lg dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-400">
                    {feature.description}
                  </p>
                </Card>
              </m.div>
            ))}
          </StaggerContainer>
        </section>
      </div>

      <EternalShowcase />

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        {/* Configuration Section */}
        <section className="border-gray-100 border-t py-24 dark:border-gray-800/50">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <SlideIn direction="left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#9d6eef]/5 px-3 py-1 font-bold text-[#9d6eef] text-[10px] uppercase tracking-widest">
                <Settings className="h-3 w-3" />
                Configuration
              </div>
              <h2 className="mb-6 font-bold text-3xl tracking-tight md:text-4xl">
                Configuration <br />
                <span className="text-[#9d6eef]">Done Right.</span>
              </h2>
              <p className="mb-8 text-gray-600 text-lg leading-relaxed dark:text-gray-400">
                Forget about guessing property names. EternalCore uses a strongly-typed
                configuration system that ensures your settings are always valid and automatically
                up-to-date.
              </p>
              <ul className="mb-8 space-y-4">
                {[
                  "Automatic config updates",
                  "Detailed comments generated automatically",
                  "Reload-safe architecture",
                ].map((item) => (
                  <li className="flex items-center gap-3" key={item}>
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#9d6eef]/10 text-[#9d6eef]">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </SlideIn>

            <SlideIn delay={0.2} direction="right">
              <div className="group perspective-1000 relative">
                {/* The "Long Screenshot" Container */}
                <div className="relative h-[600px] w-full transform select-none overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-transform duration-700 hover:scale-[1.02] dark:border-gray-800 dark:bg-[#0d1117]">
                  {/* Window Controls */}
                  <div className="absolute top-0 right-0 left-0 z-20 flex items-center gap-2 border-gray-100 border-b bg-white/80 px-4 py-3 backdrop-blur-md dark:border-white/5 dark:bg-gray-900/80">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full border border-red-400/40 bg-red-400/20" />
                      <div className="h-3 w-3 rounded-full border border-yellow-400/40 bg-yellow-400/20" />
                      <div className="h-3 w-3 rounded-full border border-green-400/40 bg-green-400/20" />
                    </div>
                    <div className="ml-4 flex items-center gap-2 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                      <span>eternalcore</span>
                      <ChevronRight className="h-3 w-3 opacity-50" />
                      <span className="text-[#9d6eef]">config.yml</span>
                    </div>
                  </div>

                  {/* Tilted Content */}
                  {/* Content Container (Standard, non-tilted) */}
                  <div className="absolute inset-0 h-full w-full overflow-hidden pt-12">
                    {/* Inner blur container */}
                    <div className="h-full opacity-90 blur-[0.5px] filter transition-all duration-700 group-hover:opacity-100 group-hover:blur-0">
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
              Ready to upgrade your server?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-gray-600 text-lg dark:text-gray-400">
              Join hundreds of servers already using EternalCore for a more stable and efficient
              experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                className="min-w-[160px] bg-[#9d6eef] text-white hover:bg-[#854ce6] dark:bg-[#9d6eef] dark:hover:bg-[#854ce6]"
                href="/projects/eternalcore/downloads"
                shine
                size="lg"
                variant="primary"
              >
                Get Started
              </Button>
              <Button
                className="min-w-[160px]"
                href="https://github.com/EternalCodeTeam/EternalCore"
                rel="noopener noreferrer"
                size="lg"
                target="_blank"
                variant="outline"
              >
                View Source
              </Button>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
