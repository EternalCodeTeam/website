"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
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
import type { CSSProperties } from "react";
import Hero from "@/components/hero/hero";
import Cta from "@/components/shared/cta/cta";
import { CursorGlow } from "@/components/ui/cursor-glow";
import type { CommunityStats } from "@/lib/stats/community-stats";
import { formatStatValue } from "@/lib/stats/format";

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

const supporters = [
  {
    name: "JetBrains",
    description: "Development tools",
    href: "https://www.jetbrains.com/",
    icon: "cib:jetbrains",
    primaryColor: "#ff0080",
    secondaryColor: "#ff8a00",
  },
  {
    name: "Netlify",
    description: "Hosting infrastructure",
    href: "https://www.netlify.com/",
    icon: "simple-icons:netlify",
    primaryColor: "#00c7b7",
    secondaryColor: "#32e6e2",
  },
  {
    name: "Sentry",
    description: "Application monitoring",
    href: "https://sentry.io/",
    icon: "simple-icons:sentry",
    primaryColor: "#6c5fc7",
    secondaryColor: "#a391f2",
  },
  {
    name: "GitHub",
    description: "Open-source platform",
    href: "https://github.com/",
    icon: "simple-icons:github",
    primaryColor: "#8250df",
    secondaryColor: "#2f81f7",
  },
];

interface AnimatedHomeProps {
  stats: CommunityStats;
}

interface StatTile {
  value: number;
  label: string;
}

function buildStatTiles(stats: CommunityStats): StatTile[] {
  const tiles: StatTile[] = [];

  if (stats.downloads !== null) {
    tiles.push({ value: stats.downloads, label: "downloads on Modrinth" });
  }

  if (stats.servers !== null) {
    tiles.push({ value: stats.servers, label: "servers running our plugins" });
  }

  if (stats.players !== null) {
    tiles.push({ value: stats.players, label: "players online right now" });
  }

  return tiles;
}

export default function AnimatedHome({ stats }: AnimatedHomeProps) {
  const statTiles = buildStatTiles(stats);

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

      {statTiles.length > 0 && (
        <section className="stats-band" id="community">
          <div className="section-shell py-14 md:py-20">
            <div className="stats-head">
              <div className="section-kicker">
                <span>03</span> Community in numbers
              </div>
              <span className="stats-note">
                <span className="status-dot" />
                Live data from Modrinth and bStats · refreshed hourly
              </span>
            </div>
            <div className="stats-grid">
              {statTiles.map((tile, index) => (
                <motion.div
                  className="stats-tile"
                  initial={{ opacity: 0, y: 20 }}
                  key={tile.label}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true, margin: "-60px" }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <strong className="stats-value">{formatStatValue(tile.value)}</strong>
                  <span className="stats-label">{tile.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
              <span>04</span> Developer experience
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

      <section className="section-shell pb-24 sm:pb-32" id="sponsors">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <div className="section-kicker">
              {/* Keep the ampersand literal rather than `&amp;` here: next/swc drops the leading
                  whitespace of an entity-bearing JSX text node, which broke hydration
                  (vercel/next.js#95881). */}
              <span>05</span> Sponsors & partners
            </div>
            <h2 className="display-title mt-8">Backed by teams who believe in open source.</h2>
            <p className="mt-6 max-w-xl text-[var(--ec-muted)] leading-7">
              Their tools, infrastructure and support help us build, test and ship EternalCode for
              the Minecraft community.
            </p>
          </div>

          <CursorGlow className="grid gap-px overflow-hidden rounded-[1.75rem] border border-[var(--ec-line)] bg-[var(--ec-line)] sm:grid-cols-2">
            {supporters.map((supporter, index) => (
              <motion.a
                className={`supporter-card group flex min-h-40 items-center gap-5 p-7 sm:p-8 ${
                  supporters.length % 2 === 1 && index === supporters.length - 1
                    ? "sm:col-span-2"
                    : ""
                }`}
                data-glow-card
                href={supporter.href}
                initial={{ opacity: 0, y: 16 }}
                key={supporter.name}
                rel="noopener noreferrer"
                style={
                  {
                    "--supporter-primary": supporter.primaryColor,
                    "--supporter-secondary": supporter.secondaryColor,
                  } as CSSProperties
                }
                target="_blank"
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true, margin: "-60px" }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <span className="supporter-icon grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[var(--ec-line)] bg-[var(--ec-soft)] text-[var(--ec-text)]">
                  <Icon aria-hidden="true" className="h-7 w-7" icon={supporter.icon} />
                </span>
                <span className="min-w-0">
                  <strong className="block font-semibold text-[var(--ec-text)] text-lg tracking-[-0.02em]">
                    {supporter.name}
                  </strong>
                  <span className="mt-1 block text-[var(--ec-faint)] text-sm">
                    {supporter.description}
                  </span>
                </span>
                <ArrowUpRight className="supporter-arrow ml-auto h-4 w-4 shrink-0 text-[var(--ec-faint)]" />
              </motion.a>
            ))}
          </CursorGlow>
        </div>
      </section>

      <Cta />
    </div>
  );
}
