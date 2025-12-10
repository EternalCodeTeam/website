"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Book, Shield, Download, Swords, Ban, Settings, Zap } from "lucide-react";
import { useRef } from "react";

import { FacadePattern } from "@/components/ui/facade-pattern";
import { FadeIn, SlideIn } from "@/components/ui/motion/MotionComponents";
import { Button } from "@/components/ui/button";

import { ConfigPreview } from "./ConfigPreview";

export default function EternalCombatPage() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    return (
        <div className="relative min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white selection:bg-red-500/30">
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <FacadePattern className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" />
                <div className="absolute top-0 right-0 p-20 w-[500px] h-[500px] bg-red-500/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute top-20 left-0 p-20 w-[400px] h-[400px] bg-orange-500/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={targetRef}>
                {/* Hero Section */}
                <section className="pt-32 pb-20 md:pt-48 md:pb-32">
                    <motion.div
                        style={{ opacity, scale }}
                        className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
                    >
                        {/* Text Content */}
                        <div className="flex-1 text-center lg:text-left z-20">
                            <FadeIn>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold uppercase tracking-wider mb-6">
                                    <Swords className="w-3 h-3" />
                                    PvP Evolved
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white leading-[1.1]">
                                    Combat Logging, <br />
                                    <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                                        Solved Forever.
                                    </span>
                                </h1>

                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                    EternalCombat is the ultimate solution for fair PvP. Prevent combat logging,
                                    secure your spawn, and customize every aspect of the battle.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                                    <Button
                                        href="/builds?project=eternalcombat"
                                        variant="primary"
                                        shine
                                        className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white shadow-red-500/25"
                                        leftIcon={<Download className="w-4 h-4" />}
                                    >
                                        Download Now
                                    </Button>

                                    <Button
                                        href="https://eternalcode.pl/docs/eternalcombat"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="outline"
                                        leftIcon={<Book className="w-4 h-4" />}
                                    >
                                        Documentation
                                    </Button>
                                </div>

                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500">
                                            <motion.div
                                                animate={{ rotate: [-6, 6, -6] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            >
                                                <Swords className="w-5 h-5" />
                                            </motion.div>
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <span className="text-lg font-bold text-gray-900 dark:text-white leading-none">
                                                200+
                                            </span>
                                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Servers
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-px h-8 bg-gray-200 dark:bg-gray-800 hidden sm:block" />

                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-500">
                                            <motion.div
                                                animate={{ opacity: [1, 0.6, 1], scale: [1, 1.05, 1] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                            >
                                                <Zap className="w-5 h-5 fill-current" />
                                            </motion.div>
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <span className="text-lg font-bold text-gray-900 dark:text-white leading-none">
                                                1000+
                                            </span>
                                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Daily Players
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Visual/Image Placeholder */}
                        <div className="flex-1 w-full max-w-xl lg:max-w-none relative">
                            <FadeIn delay={0.2}>
                                {/* Code Preview Overlay */}
                                <div className="flex items-center justify-center pt-8 lg:pt-0">
                                    <div className="w-full max-w-lg bg-gray-900/90 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 shadow-2xl transition-transform hover:scale-[1.02] duration-500">
                                        <div className="flex items-center gap-2 mb-4 border-b border-gray-700/50 pb-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                            <div className="text-xs text-gray-400 ml-2 font-mono">latest.txt</div>
                                        </div>
                                        <div className="text-gray-400 font-mono text-sm leading-relaxed">
                                            <div>
                                                <span className="text-gray-500">[19:23:01]</span>{" "}
                                                <span className="bg-gradient-to-r from-[#ff6666] to-[#ff0000] bg-clip-text text-transparent font-bold">
                                                    ⚔ vLucky is in combat!
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">[19:23:01]</span>{" "}
                                                <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent font-bold">
                                                    ⚠ You are in combat!
                                                </span>{" "}
                                                <span className="underline decoration-white/30 decoration-1 underline-offset-2 text-white">
                                                    Do not leave the server!
                                                </span>
                                            </div>
                                            <div className="text-gray-500 my-2">...</div>
                                            <div className="text-yellow-400">
                                                <span className="text-gray-500">[19:23:45]</span> vLucky tried to
                                                disconnect.
                                            </div>
                                            <div className="text-red-500">
                                                <span className="text-gray-500">[19:23:45]</span>{" "}
                                                <span className="bg-gradient-to-r from-red-600 to-red-900 bg-clip-text text-transparent font-bold">
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
                <section className="py-24 border-t border-gray-100 dark:border-gray-800/50">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <FadeIn>
                            <h2 className="text-3xl font-bold mb-4">Everything you need for fair fights.</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                EternalCombat is packed with features designed to keep your players engaged and your
                                server balanced.
                            </p>
                        </FadeIn>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
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
                            <SlideIn key={feature.title} direction="up" delay={i * 0.1} className="h-full">
                                <div className="h-full p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-red-500/30 transition-colors group">
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
                            <h2 className="text-3xl font-bold mb-6 tracking-tight">Control every mechanic.</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
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
                                    <div key={item} className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
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
                            Hundreds of servers trust EternalCombat.
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                            Don't let loggers ruin your server's economy and fun.
                        </p>
                        <div className="flex justify-center flex-wrap gap-4">
                            <Button
                                href="/builds?project=eternalcombat"
                                variant="primary"
                                size="lg"
                                shine
                                className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white min-w-[160px]"
                            >
                                Get Plugin
                            </Button>
                            <Button
                                href="https://github.com/EternalCodeTeam/EternalCombat"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outline"
                                size="lg"
                                className="min-w-[160px]"
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
