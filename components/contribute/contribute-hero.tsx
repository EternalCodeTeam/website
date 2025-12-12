"use client";

import { motion } from "framer-motion";

export function ContributeHero() {
  return (
    <section className="relative pt-32 pb-8 lg:pt-48 lg:pb-12">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 font-bold text-4xl text-gray-900 tracking-tight sm:text-6xl dark:text-white"
          >
            Become an Open Source{" "}
            <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
              Contributor
            </span>{" "}
            with EternalCode
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12 text-gray-600 text-lg leading-8 dark:text-gray-400"
          >
            EternalCode is built by a passionate community. Whether you write code, design, write
            documentation, or support others, there's a place for you here.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
