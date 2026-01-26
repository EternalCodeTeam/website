"use client";

import { m } from "framer-motion";
import dynamic from "next/dynamic";
import Hero from "@/components/hero/hero";
import { FacadePattern } from "@/components/ui/facade-pattern";

const About = dynamic(() => import("@/components/home/about/about-section"), {
  loading: () => <div className="min-h-[500px]" />,
});
const Cta = dynamic(() => import("@/components/shared/cta-section"), {
  loading: () => <div className="min-h-[300px]" />,
});
const Faq = dynamic(() => import("@/components/home/faq/faq-section"), {
  loading: () => <div className="min-h-[600px]" />,
});
const Features = dynamic(() => import("@/components/home/features/features"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Sponsors = dynamic(() => import("@/components/home/sponsors/sponsors-section"), {
  loading: () => <div className="min-h-[120px]" />,
});

export default function AnimatedHome() {
  return (
    <m.div className="relative bg-gray-50 dark:bg-gray-950" id="main-content" tabIndex={-1}>
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        <div className="absolute top-0 -left-[10%] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-2xl filter md:h-[600px] md:w-[600px] dark:bg-blue-500/5 dark:blur-3xl" />

        <div className="absolute top-[30%] left-[-10%] h-[250px] w-[250px] rounded-full bg-purple-500/10 blur-2xl filter md:h-[500px] md:w-[500px] dark:bg-purple-500/5 dark:blur-3xl" />

        <div className="absolute top-[55%] right-[-10%] h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-2xl filter md:h-[600px] md:w-[600px] dark:bg-indigo-500/5 dark:blur-3xl" />

        <div className="absolute top-[75%] left-[-10%] h-[250px] w-[250px] rounded-full bg-cyan-500/10 blur-2xl filter md:h-[500px] md:w-[500px] dark:bg-cyan-500/5 dark:blur-3xl" />

        <div className="absolute bottom-[-10%] left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-2xl filter md:h-[600px] md:w-[600px] dark:bg-blue-500/5 dark:blur-3xl" />

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
    </m.div>
  );
}
