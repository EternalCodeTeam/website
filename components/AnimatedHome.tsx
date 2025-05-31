"use client";
import { motion } from "framer-motion";
import { pageTransition } from "@/components/animations";
import Hero from "@/components/header/hero/Hero";
import About from "@/components/about/About";
import Features from "@/components/features/Features";
import Faq from "@/components/faq/Faq";

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