"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Book, Check, ChevronRight, Database, Download, Layers, Settings, Zap } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FacadePattern } from "@/components/ui/facade-pattern";
import { FadeIn, SlideIn } from "@/components/ui/motion/motion-components";

import { ConfigPreview } from "./config-preview";
import { EternalFoundation } from "./eternal-foundation";

export default function EternalCorePage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="relative min-h-screen bg-white text-gray-900 selection:bg-[#9d6eef]/30 dark:bg-gray-950 dark:text-white">
      {/* Background Decor */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <FacadePattern className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#9d6eef]/5 p-20 mix-blend-multiply blur-[100px] dark:mix-blend-screen" />
        <div className="absolute top-20 left-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 p-20 mix-blend-multiply blur-[100px] dark:mix-blend-screen" />
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
              <FadeIn>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#9d6eef]/5 px-3 py-1 font-bold text-[#9d6eef] text-[10px] uppercase tracking-widest">
                  <Zap className="h-3 w-3" />
                  Next-Gen Essentials
                </div>
                <h1 className="mb-6 font-extrabold text-4xl text-gray-900 tracking-tight md:text-5xl lg:text-6xl dark:text-white">
                  Essential commands.
                  <br />
                  <span className="bg-gradient-to-r from-[#9d6eef] via-[#A1AAFF] to-[#9d6eef] bg-clip-text text-transparent">
                    Uncompromised performance.
                  </span>
                </h1>

                <p className="mx-auto mb-8 max-w-2xl text-gray-600 text-lg leading-relaxed lg:mx-0 dark:text-gray-400">
                  EternalCore is a modern, open-source replacement for EssentialsX. Built for Paper
                  & Folia to deliver maximum performance without the legacy bloat.
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
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
                </div>
              </FadeIn>
            </div>

            {/* Project Banner Placeholder */}
            <div className="w-full max-w-xl flex-1 lg:max-w-none">
              <FadeIn delay={0.2}>
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
              </FadeIn>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="border-gray-100 border-t py-24 dark:border-gray-800/50">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <FadeIn>
              <h2 className="mb-4 font-bold text-3xl tracking-tight md:text-4xl">
                Built for modern servers.
              </h2>
              <p className="text-gray-600 text-lg dark:text-gray-400">
                EternalCore takes advantage of the latest Minecraft server technology to provide a
                lag-free experience.
              </p>
            </FadeIn>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Async Architecture",
                description:
                  "Heavy operations like database queries and teleportation handling are processed asynchronously to keep your TPS high.",
                icon: Zap,
                color: "text-purple-500",
                bg: "bg-purple-500/10",
              },
              {
                title: "Database Agnostic",
                description:
                  "Whether you use SQLite, MySQL, or PostgreSQL, EternalCore supports it out of the box with connection pooling.",
                icon: Database,
                color: "text-blue-500",
                bg: "bg-blue-500/10",
              },
              {
                title: "Modular Design",
                description:
                  "Enable only what you need. EternalCore's modular system ensures you aren't running unnecessary code.",
                icon: Layers,
                color: "text-[#9d6eef]",
                bg: "bg-[#9d6eef]/10",
              },
            ].map((feature, i) => (
              <SlideIn className="h-full" delay={i * 0.1} direction="up" key={feature.title}>
                <div className="group h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9d6eef]/30 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50">
                  <div
                    className={`h-12 w-12 rounded-xl ${feature.bg} ${feature.color} mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 text-xl transition-colors group-hover:text-[#9d6eef] dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </SlideIn>
            ))}
          </div>
        </section>

        <EternalFoundation />

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
              <div className="group relative">
                {/* Subtle Glow behind the window */}
                <div className="absolute -inset-4 -z-10 bg-[#9d6eef]/5 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100 dark:bg-[#9d6eef]/10" />

                {/* The "Long Screenshot" Container */}
                <div className="relative h-[600px] w-full select-none overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl transition-all duration-700 hover:scale-[1.01] hover:border-[#9d6eef]/20 dark:border-gray-800 dark:bg-gray-900/50">
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

                  {/* Content Container */}
                  <div className="h-full pt-12">
                    {/* Auto-scrolling animation container */}
                    <div className="animate-scroll-y">
                      <ConfigPreview />
                      {/* Duplicate content for seamless loop */}
                      <ConfigPreview />
                    </div>
                  </div>

                  {/* Gradient overlay to fade bottom */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-white to-transparent dark:from-gray-950" />

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
