"use client";
import { motion } from "framer-motion";

import { fadeIn } from "@/lib/animations/variants";
import { FacadePattern } from "@/components/ui/facade-pattern";
import Hero from "@/components/hero/Hero";
import About from "@/components/home/about/About";
import Faq from "@/components/home/faq/Faq";
import Features from "@/components/home/features/Features";
import Sponsors from "@/components/home/sponsors/Sponsors";
import Cta from "@/components/home/cta/Cta";

export default function AnimatedHome() {
  return (
    // Main container with page transition animations
    <motion.div
      id="main-content"
      tabIndex={-1}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeIn}
      className="relative overflow-hidden bg-gray-50 dark:bg-gray-950"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Hero Area - Supplemental Glow (Left) */}
        <div className="absolute -left-[10%] top-0 h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full bg-blue-500/10 blur-3xl filter dark:bg-blue-500/5" />

        {/* About Section - Purple Influence (Center-Left) */}
        <div className="absolute left-[-10%] top-[30%] h-[250px] w-[250px] md:h-[500px] md:w-[500px] rounded-full bg-purple-500/10 blur-3xl filter dark:bg-purple-500/5 mix-blend-multiply dark:mix-blend-screen" />

        {/* Features Section - Indigo/Blue Influence (Center-Right) */}
        <div className="absolute right-[-10%] top-[55%] h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full bg-indigo-500/10 blur-3xl filter dark:bg-indigo-500/5 mix-blend-multiply dark:mix-blend-screen" />

        {/* FAQ Section - Bottom Anchor (Center) */}
        <div className="absolute left-1/2 bottom-[-10%] h-[300px] w-[300px] md:h-[600px] md:w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl filter dark:bg-blue-500/5" />

        <FacadePattern className="absolute inset-0 opacity-30 dark:opacity-10 h-full" />
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
