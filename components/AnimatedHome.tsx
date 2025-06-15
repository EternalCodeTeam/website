"use client";
import { motion } from "framer-motion";

import About from "@/components/about/About";
import { pageTransition } from "@/components/animations";
import Faq from "@/components/faq/Faq";
import Features from "@/components/features/Features";
import Hero from "@/components/header/hero/Hero";

export default function AnimatedHome() {
  return (
    <motion.div
      id="main-content"
      tabIndex={-1}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <Hero />
      <About />
      <Features />
      <Faq />
    </motion.div>
  );
}
