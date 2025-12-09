"use client";
import { motion } from "framer-motion";

import { fadeIn } from "@/lib/animations/variants";
import Hero from "@/components/hero/Hero";
import About from "@/components/home/about/About";
import Faq from "@/components/home/faq/Faq";
import Features from "@/components/home/features/Features";

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
    >
      {/* Home page sections in sequence */}
      <Hero />
      <About />
      <Features />
      <Faq />
    </motion.div>
  );
}
