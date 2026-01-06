"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Hero from "@/components/hero/hero";
import { FacadePattern } from "@/components/ui/facade-pattern";

const About = dynamic(() => import("@/components/home/about/about-section"));
const Cta = dynamic(() => import("@/components/home/cta/cta-section"));
const Faq = dynamic(() => import("@/components/home/faq/faq-section"));
const Features = dynamic(() => import("@/components/home/features/features"));
const Sponsors = dynamic(() => import("@/components/home/sponsors/sponsors-section"));

export default function AnimatedHome() {
  return (
    <motion.div className="relative bg-gray-50 dark:bg-gray-950" id="main-content" tabIndex={-1}>
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        <div className="absolute top-0 -left-[10%] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-3xl filter will-change-transform md:h-[600px] md:w-[600px] dark:bg-blue-500/5" />

        <div className="absolute top-[30%] left-[-10%] h-[250px] w-[250px] rounded-full bg-purple-500/10 mix-blend-multiply blur-3xl filter will-change-transform md:h-[500px] md:w-[500px] dark:bg-purple-500/5 dark:mix-blend-screen" />

        <div className="absolute top-[55%] right-[-10%] h-[300px] w-[300px] rounded-full bg-indigo-500/10 mix-blend-multiply blur-3xl filter will-change-transform md:h-[600px] md:w-[600px] dark:bg-indigo-500/5 dark:mix-blend-screen" />

        <div className="absolute top-[75%] left-[-10%] h-[250px] w-[250px] rounded-full bg-cyan-500/10 mix-blend-multiply blur-3xl filter will-change-transform md:h-[500px] md:w-[500px] dark:bg-cyan-500/5 dark:mix-blend-screen" />

        <div className="absolute bottom-[-10%] left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl filter will-change-transform md:h-[600px] md:w-[600px] dark:bg-blue-500/5" />

        <FacadePattern className="absolute inset-0 h-full opacity-30 dark:opacity-10" />
      </div>

      <div className="relative z-10">
        <Hero />
        <div className="optimize-visibility">
          <Sponsors />
        </div>
        <div className="optimize-visibility">
          <About />
        </div>
        <div className="optimize-visibility">
          <Features />
        </div>
        <div className="optimize-visibility">
          <Faq />
        </div>
        <div className="optimize-visibility">
          <Cta />
        </div>
      </div>
    </motion.div>
  );
}
