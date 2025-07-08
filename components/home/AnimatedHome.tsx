"use client";
import { motion } from "framer-motion";

import { pageTransition } from "@/components/animations";
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
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {/* Home page sections in sequence */}
      <Hero />
      <About />
      <Features />
      <Faq />
    </motion.div>
  );
}
