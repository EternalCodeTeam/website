"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, Github } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-minimal">
      <div className="hero-grid" />
      <div className="section-shell hero-minimal-inner">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="eyebrow justify-center"
          initial={{ opacity: 0, y: 10 }}
        >
          <span className="status-dot" /> Open source, built by friends
        </motion.div>

        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="hero-minimal-title"
          initial={{ opacity: 0, y: 24 }}
          transition={{ delay: 0.08 }}
        >
          Minecraft plugins
          <br />
          <span>made for real servers.</span>
        </motion.h1>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="hero-minimal-lead"
          initial={{ opacity: 0, y: 18 }}
          transition={{ delay: 0.16 }}
        >
          We are a group of friends building open-source tools we enjoy using ourselves. Useful
          defaults, readable docs and no corporate nonsense.
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="hero-minimal-actions"
          initial={{ opacity: 0, y: 14 }}
          transition={{ delay: 0.22 }}
        >
          <Link className="primary-action" href="/docs">
            Explore plugins <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            className="secondary-action"
            href="https://github.com/EternalCodeTeam"
            rel="noreferrer"
            target="_blank"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </motion.div>
      </div>

      <a className="hero-minimal-scroll" href="#about">
        More about us <ArrowDownRight className="h-4 w-4" />
      </a>
    </section>
  );
}
