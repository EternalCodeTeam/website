"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Book, Check, Download, Zap, Database, Layers, Settings } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

import { FacadePattern } from "@/components/ui/facade-pattern";
import { FadeIn, SlideIn } from "@/components/ui/motion/MotionComponents";
import { Button } from "@/components/ui/button";

import { ConfigPreview } from "./ConfigPreview";

export default function EternalCorePage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white selection:bg-[#9d6eef]/30">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <FacadePattern className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute top-0 right-0 p-20 w-[500px] h-[500px] bg-[#9d6eef]/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-20 left-0 p-20 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={targetRef}>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32">
          <motion.div
            style={{ opacity, scale }}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
          >
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/20 text-[#9d6eef] text-xs font-semibold uppercase tracking-wider mb-6">
                  <Zap className="w-3 h-3" />
                  Next-Gen Essentials
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white">
                  Essential commands.
                  <br />
                  <span className="bg-gradient-to-r from-[#9d6eef] via-[#A1AAFF] to-[#9d6eef] bg-clip-text text-transparent">
                    Uncompromised performance.
                  </span>
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  EternalCore is a modern, open-source replacement for EssentialsX. Built for Paper
                  & Folia to deliver maximum performance without the legacy bloat.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    href="/builds?project=eternalcore"
                    variant="primary"
                    shine
                    className="bg-[#9d6eef] hover:bg-[#854ce6] dark:bg-[#9d6eef] dark:hover:bg-[#854ce6] text-white shadow-purple-500/25"
                    leftIcon={<Download className="w-4 h-4" />}
                  >
                    Download
                  </Button>

                  <Button
                    href="https://eternalcode.pl/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    leftIcon={<Book className="w-4 h-4" />}
                  >
                    Documentation
                  </Button>
                </div>
              </FadeIn>
            </div>

            {/* Project Banner Placeholder */}
            <div className="flex-1 w-full max-w-xl lg:max-w-none">
              <FadeIn delay={0.2}>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 shadow-2xl group">
                  <Image
                    src="/eternalcore/readme-banner.png"
                    alt="EternalCore Project Banner"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-tr from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none mix-blend-overlay" />
                </div>
              </FadeIn>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24 border-t border-gray-100 dark:border-gray-800/50">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4">Built for modern servers.</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                EternalCore takes advantage of the latest Minecraft server technology to provide a
                lag-free experience.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Async Architecture",
                description:
                  "Heavy operations like database queries and teleportation handling are processed asynchronously to keep your TPS high.",
                icon: Zap,
                color: "text-[#9d6eef]",
                bg: "bg-[#9d6eef]/10",
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
                color: "text-pink-500",
                bg: "bg-pink-500/10",
              },
            ].map((feature, i) => (
              <SlideIn key={feature.title} direction="up" delay={i * 0.1} className="h-full">
                <div className="h-full p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-[#9d6eef]/30 transition-colors group">
                  <div
                    className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </SlideIn>
            ))}
          </div>
        </section>

        {/* Configuration Section */}
        <section className="py-24 border-t border-gray-100 dark:border-gray-800/50">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideIn direction="left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-semibold uppercase tracking-wider mb-6">
                <Settings className="w-3 h-3" />
                Configuration
              </div>
              <h2 className="text-3xl font-bold mb-6 tracking-tight">
                Configuration <br />
                <span className="text-[#9d6eef]">Done Right.</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Forget about guessing property names. EternalCore uses a strongly-typed
                configuration system that ensures your settings are always valid and automatically
                up-to-date.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Automatic config updates",
                  "Detailed comments generated automatically",
                  "Reload-safe architecture",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#9d6eef]/10 flex items-center justify-center text-[#9d6eef]">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </SlideIn>

            <SlideIn direction="right" delay={0.2}>
              <div className="relative group perspective-1000">
                {/* The "Long Screenshot" Container */}
                <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] shadow-2xl select-none transform transition-transform duration-700 hover:scale-[1.02]">
                  {/* Tilted Content */}
                  <div className="absolute -top-10 -left-[15%] w-[150%] transform rotate-2 hover:rotate-0 transition-all duration-700 hover:scale-100 origin-top-left h-[200%]">
                    {/* Inner blur container */}
                    <div className="filter blur-[0.5px] transition-all duration-700 group-hover:blur-0 opacity-90 group-hover:opacity-100 h-full pl-24">
                      {/* Auto-scrolling animation container */}
                      <div className="animate-scroll-y">
                        <ConfigPreview />
                        {/* Duplicate content for seamless loop */}
                        <ConfigPreview />
                      </div>
                    </div>
                  </div>

                  {/* Gradient overlay to fade bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white dark:from-[#0d1117] to-transparent pointer-events-none z-10" />

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
        <section className="py-32 text-center border-t border-gray-100 dark:border-gray-800/50">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Ready to upgrade your server?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Join hundreds of servers already using EternalCore for a more stable and efficient
              experience.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <Button
                href="/projects/eternalcore/downloads"
                variant="primary"
                size="lg"
                shine
                className="bg-[#9d6eef] hover:bg-[#854ce6] dark:bg-[#9d6eef] dark:hover:bg-[#854ce6] text-white min-w-[160px]"
              >
                Get Started
              </Button>
              <Button
                href="https://github.com/EternalCodeTeam/EternalCore"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="min-w-[160px]"
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
