"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Box,
  Check,
  Download,
  Github,
  Layers3,
  MessagesSquare,
  Settings2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ConfigPreview } from "./config-preview";

const capabilities = [
  { icon: Box, value: "80+", label: "commands without legacy baggage" },
  { icon: Zap, value: "Paper", label: "built for the modern server stack" },
  { icon: Layers3, value: "Folia", label: "region-aware from the beginning" },
  { icon: ShieldCheck, value: "OSS", label: "inspect it, change it, ship it" },
];

const showcases = [
  {
    eyebrow: "Homes",
    title: "Teleportation that feels predictable.",
    description:
      "Named homes, permission-based limits and clear feedback for players. Useful defaults first; configuration when you need it.",
    image: "/docs/eternalcore/homes/sethome.gif",
    accent: "blue",
  },
  {
    eyebrow: "Communication",
    title: "Messages people can actually read.",
    description:
      "Private messages, broadcasts and admin channels with modern formatting—without assembling a small novel of nested builders.",
    image: "/docs/eternalcore/adminchat-channel.gif",
    accent: "sky",
  },
];

export default function EternalCorePage() {
  const heroRef = useRef<HTMLElement>(null);
  const configRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: configProgress } = useScroll({
    target: configRef,
    offset: ["start end", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroScale = useTransform(heroProgress, [0, 0.8], [1, 0.94]);
  const configY = useTransform(configProgress, [0, 1], [70, -70]);

  return (
    <div className="ec-project-page">
      <section className="ec-project-hero" ref={heroRef}>
        <div className="hero-grid" />
        <div className="section-shell ec-project-hero-layout">
          <motion.div className="ec-project-copy" style={{ y: heroY }}>
            <div className="eyebrow">EternalCore · Open source Minecraft plugin</div>
            <h1>
              Everything your server needs.
              <span> Nothing it does not.</span>
            </h1>
            <p>
              A modern essentials plugin for Paper and Folia. Commands, homes, moderation, chat and
              everyday server tools—designed as one coherent experience.
            </p>
            <div className="ec-project-actions">
              <Link className="primary-action" href="/builds?project=eternalcore">
                <Download className="h-4 w-4" /> Download EternalCore
              </Link>
              <Link className="secondary-action" href="/docs/eternalcore">
                <BookOpen className="h-4 w-4" /> Read documentation
              </Link>
            </div>
            <div className="ec-project-note">
              <Check className="h-4 w-4" /> Free, open source and not followed by an enterprise
              pricing call.
            </div>
          </motion.div>

          <motion.div className="ec-project-visual" style={{ scale: heroScale }}>
            <div className="ec-project-banner-frame">
              <Image
                alt="EternalCore project banner"
                className="object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                src="/eternalcore/readme-banner.png"
              />
              <div className="ec-project-banner-overlay" />
            </div>
          </motion.div>
        </div>
        <a className="ec-project-scroll" href="#capabilities">
          See it in action <ArrowDownRight className="h-4 w-4" />
        </a>
      </section>

      <section className="section-shell ec-capabilities" id="capabilities">
        <div className="ec-section-intro">
          <div className="section-kicker">
            <span>01</span> One plugin, one consistent system
          </div>
          <h2>Essentials rebuilt for how servers run today.</h2>
          <p>
            EternalCore replaces a patchwork of utilities with a focused foundation that is easier
            to operate, easier to configure and easier to extend.
          </p>
        </div>
        <div className="ec-capability-grid">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div className="ec-capability" key={item.value}>
                <Icon className="h-5 w-5" />
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="ec-showcase-section">
        <div className="section-shell">
          <div className="ec-section-intro ec-section-intro-wide">
            <div className="section-kicker">
              <span>02</span> Real features, not mockups
            </div>
            <h2>Watch the plugin work.</h2>
            <p>Two everyday workflows, shown exactly as players and administrators use them.</p>
          </div>

          <div className="ec-showcase-list">
            {showcases.map((showcase, index) => (
              <article
                className={`ec-showcase-row ${index % 2 ? "ec-showcase-reverse" : ""}`}
                key={showcase.title}
              >
                <div className="ec-showcase-copy">
                  <span>{showcase.eyebrow}</span>
                  <h3>{showcase.title}</h3>
                  <p>{showcase.description}</p>
                  <Link href="/docs/eternalcore">
                    Explore this feature <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <motion.div
                  className={`ec-gif-frame ec-gif-${showcase.accent}`}
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.55 }}
                  viewport={{ once: true, margin: "-80px" }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <Image
                    alt={`${showcase.eyebrow} feature demonstration`}
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    src={showcase.image}
                    unoptimized
                  />
                </motion.div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell ec-config-section" ref={configRef}>
        <div className="ec-config-copy">
          <div className="section-kicker">
            <span>03</span> Configuration without archaeology
          </div>
          <h2>Detailed when you need it. Sensible before you touch it.</h2>
          <p>
            Start with useful defaults, then tune homes, chat, databases, cooldowns and server
            behavior from one readable configuration.
          </p>
          <ul>
            <li>
              <Settings2 className="h-4 w-4" /> Human-readable YAML
            </li>
            <li>
              <MessagesSquare className="h-4 w-4" /> English and Polish messages
            </li>
            <li>
              <ShieldCheck className="h-4 w-4" /> SQLite, MySQL, MariaDB and PostgreSQL
            </li>
          </ul>
        </div>
        <motion.div className="ec-config-preview" style={{ y: configY }}>
          <div className="ec-config-window-bar">
            <span>config.yml</span>
            <span>EternalCore / main</span>
          </div>
          <div className="ec-config-code">
            <ConfigPreview />
          </div>
        </motion.div>
      </section>

      <section className="section-shell ec-project-cta">
        <div>
          <div className="section-kicker">
            <span>04</span> Ready when your server is
          </div>
          <h2>Replace the essentials pile with one modern core.</h2>
        </div>
        <div className="ec-project-cta-actions">
          <Link className="primary-action" href="/builds?project=eternalcore">
            Download latest build <Download className="h-4 w-4" />
          </Link>
          <a
            className="secondary-action"
            href="https://github.com/EternalCodeTeam/EternalCore"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github className="h-4 w-4" /> View source
          </a>
        </div>
      </section>
    </div>
  );
}
