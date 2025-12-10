"use client";
import { motion } from "framer-motion";
import Hero from "@/components/hero/hero";
import About from "@/components/home/about/about-section";
import Cta from "@/components/home/cta/cta-section";
import Faq from "@/components/home/faq/faq-section";
import Features from "@/components/home/features/features";
import Sponsors from "@/components/home/sponsors/sponsors-section";
import { FacadePattern } from "@/components/ui/facade-pattern";
import { fadeIn } from "@/lib/animations/variants";

export default function AnimatedHome() {
  return (
    // Main container with page transition animations
    <motion.div
      animate="visible"
      className="relative overflow-hidden bg-gray-50 dark:bg-gray-950"
      exit="hidden"
      id="main-content"
      initial="hidden"
      tabIndex={-1}
      variants={fadeIn}
    >
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        {/* Hero Area - Supplemental Glow (Left) */}
        <div className="-left-[10%] absolute top-0 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-3xl filter md:h-[600px] md:w-[600px] dark:bg-blue-500/5" />

        {/* About Section - Purple Influence (Center-Left) */}
        <div className="absolute top-[30%] left-[-10%] h-[250px] w-[250px] rounded-full bg-purple-500/10 mix-blend-multiply blur-3xl filter md:h-[500px] md:w-[500px] dark:bg-purple-500/5 dark:mix-blend-screen" />

        {/* Features Section - Indigo/Blue Influence (Center-Right) */}
        <div className="absolute top-[55%] right-[-10%] h-[300px] w-[300px] rounded-full bg-indigo-500/10 mix-blend-multiply blur-3xl filter md:h-[600px] md:w-[600px] dark:bg-indigo-500/5 dark:mix-blend-screen" />

        {/* FAQ Section - Bottom Anchor (Center) */}
        <div className="-translate-x-1/2 absolute bottom-[-10%] left-1/2 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-3xl filter md:h-[600px] md:w-[600px] dark:bg-blue-500/5" />

        <FacadePattern className="absolute inset-0 h-full opacity-30 dark:opacity-10" />
      </div>

      <div className="relative z-10">
        {/* Home page sections in sequence */}
        <Hero />
        <Sponsors />
        <About />
        <Features />
        <Faq />
        <Cta />
      </div>
    </motion.div>
  );
}
