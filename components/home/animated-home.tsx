"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  Box,
  Check,
  Code2,
  Github,
  PackageCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import Hero from "@/components/hero/hero";
import Cta from "@/components/shared/cta-section";
import { CursorGlow } from "@/components/ui/cursor-glow";

const projects = [
  {
    name: "EternalCore",
    description: "A complete, production-ready foundation for modern Minecraft servers.",
    href: "/projects/eternalcore",
    tag: "Server toolkit",
    icon: Box,
    tone: "blue",
  },
  {
    name: "EternalCombat",
    description: "Precise combat control designed for competitive communities.",
    href: "/projects/eternalcombat",
    tag: "Combat engine",
    icon: Sparkles,
    tone: "violet",
  },
  {
    name: "Multification",
    description: "A flexible text format that makes rich messages effortless.",
    href: "/docs/multification",
    tag: "Developer library",
    icon: Code2,
    tone: "cyan",
  },
];

const principles = [
  {
    icon: PackageCheck,
    title: "Production first",
    text: "Tools shaped by real servers, strict reviews and measurable performance.",
  },
  {
    icon: BookOpen,
    title: "Documented deeply",
    text: "Clear guides, practical examples and APIs that respect your time.",
  },
  {
    icon: Users,
    title: "Built in public",
    text: "Open roadmaps, transparent decisions and a community that can contribute.",
  },
  {
    icon: Blocks,
    title: "Designed to compose",
    text: "Focused projects that work brilliantly alone and even better together.",
  },
];

export default function AnimatedHome() {
  return (
    <div className="site-shell" id="main-content" tabIndex={-1}>
      <Hero />

      <section className="section-shell pt-8 sm:pt-16">
        <div className="section-kicker">
          <span>01</span> Selected projects
        </div>
        <p className="mt-4 max-w-xl text-[var(--ec-faint)] text-sm">
          Things we built because apparently playing Minecraft was not enough.
        </p>
        <CursorGlow className="mt-8 grid gap-4 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                key={project.name}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true, margin: "-80px" }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Link
                  className={`project-card project-${project.tone}`}
                  data-glow-card
                  href={project.href}
                >
                  <div className="flex items-start justify-between">
                    <span className="project-icon">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-[10px] text-[var(--ec-faint)] uppercase tracking-[0.18em]">
                      0{index + 1} / 03
                    </span>
                  </div>
                  <div className="mt-24">
                    <span className="font-mono text-[11px] text-[var(--ec-faint)] uppercase tracking-[0.16em]">
                      {project.tag}
                    </span>
                    <h2 className="mt-3 font-semibold text-3xl text-[var(--ec-text)] tracking-[-0.04em]">
                      {project.name}
                    </h2>
                    <p className="mt-3 max-w-sm text-[var(--ec-muted)] text-sm leading-6">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center justify-between border-[var(--ec-line)] border-t pt-5 text-[var(--ec-muted)] text-sm">
                    Explore project{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </CursorGlow>
      </section>

      <section className="section-shell py-24 sm:py-32" id="about">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
          <div>
            <div className="section-kicker">
              <span>02</span> Our standard
            </div>
            <h2 className="display-title mt-8">Software people trust at 3 AM.</h2>
            <p className="mt-6 max-w-xl text-[var(--ec-muted)] text-base leading-7 sm:text-lg">
              We are an open-source engineering team from Poland. We build dependable tools for
              server owners and developers who care about quality, clarity and control.
            </p>
            <Link className="mt-8 text-link" href="/team">
              Meet the team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <CursorGlow className="grid gap-px overflow-hidden rounded-[1.75rem] border border-[var(--ec-line)] bg-[var(--ec-line)] sm:grid-cols-2">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  className="glow-surface bg-[var(--ec-panel)] p-7 sm:p-9"
                  data-glow-card
                  key={item.title}
                >
                  <Icon className="h-6 w-6 text-[var(--ec-accent-text)]" />
                  <h3 className="mt-12 font-semibold text-[var(--ec-text)] text-xl tracking-[-0.025em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[var(--ec-muted)] text-sm leading-6">{item.text}</p>
                </div>
              );
            })}
          </CursorGlow>
        </div>
      </section>

      <section className="border-[var(--ec-line)] border-y bg-[var(--ec-accent)] text-[var(--ec-accent-ink)]">
        <div className="section-shell grid gap-10 py-16 md:grid-cols-3 md:py-20">
          {[
            ["10+", "open-source projects"],
            ["100k+", "monthly downloads"],
            ["24/7", "community-driven development"],
          ].map(([value, label]) => (
            <div
              className="border-black/15 first:border-0 first:pl-0 md:border-l md:pl-8"
              key={label}
            >
              <strong className="block font-mono text-5xl tracking-[-0.06em] sm:text-6xl">
                {value}
              </strong>
              <span className="mt-3 block text-black/60 text-sm">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-24 sm:py-32">
        <div className="grid items-center gap-12 rounded-[2rem] border border-[var(--ec-line)] bg-[var(--ec-panel)] p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
          <div className="code-panel">
            <div className="flex items-center gap-2 border-white/10 border-b px-5 py-4">
              <span className="status-dot" />
              <span className="font-mono text-[11px] text-white/40">eternalcode / main</span>
            </div>
            <div className="space-y-4 p-5 font-mono text-xs leading-6 sm:p-7 sm:text-sm">
              <p>
                <span className="text-[var(--ec-accent-text)]">$</span> ./gradlew build
              </p>
              <p className="text-white/45">Resolving production modules...</p>
              <p className="text-white/45">Running quality gates...</p>
              <p className="text-[var(--ec-accent-text)]">
                <Check className="mr-2 inline h-4 w-4" />
                Build successful in 2.4s
              </p>
              <p>
                <span className="text-[var(--ec-accent-text)]">$</span> deploy --with-confidence{" "}
                <span className="terminal-caret" />
              </p>
            </div>
          </div>
          <div className="lg:pl-8">
            <div className="section-kicker">
              <span>03</span> Developer experience
            </div>
            <h2 className="display-title mt-8">Complex under the hood. Calm on the surface.</h2>
            <p className="mt-6 text-[var(--ec-muted)] leading-7">
              Predictable configuration, useful defaults and documentation written for shipping—not
              guessing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="pill-link" href="/docs">
                <BookOpen className="h-4 w-4" /> Read docs
              </Link>
              <a
                className="pill-link"
                href="https://github.com/EternalCodeTeam"
                rel="noreferrer"
                target="_blank"
              >
                <Github className="h-4 w-4" /> View source
              </a>
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </div>
  );
}
