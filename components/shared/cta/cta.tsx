"use client";

import { Icon } from "@iconify/react";
import { ArrowUpRight, MessageCircle, Users } from "lucide-react";
import Image from "next/image";

import "./cta.css";

export default function Cta() {
  return (
    <section className="section-shell pb-24 sm:pb-32">
      <div className="community-cta">
        <div aria-hidden="true" className="community-cta-ambient">
          <span className="community-cta-ambient-orb community-cta-ambient-orb-a" />
          <span className="community-cta-ambient-orb community-cta-ambient-orb-b" />
        </div>

        <div className="community-cta-copy">
          <p className="community-cta-kicker">
            <span aria-hidden="true" className="community-cta-kicker-mark">
              {"//"}
            </span>
            Community
          </p>

          <h2>
            Don&apos;t build the <span className="community-cta-heading-accent">good stuff</span>{" "}
            alone.
          </h2>

          <p className="community-cta-description">
            Trade ideas, get honest feedback, and ship better Minecraft software with people who
            care about the details.
          </p>

          <div className="community-cta-actions">
            <a
              className="community-cta-button"
              href="https://discord.com/invite/FQ7jmGBd6c"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="community-cta-button-icon">
                <Icon aria-hidden="true" className="h-5 w-5" icon="simple-icons:discord" />
              </span>

              <span>Join our Discord</span>

              <ArrowUpRight aria-hidden="true" className="community-cta-button-arrow h-4 w-4" />
            </a>
          </div>

          <div className="community-cta-notes">
            <span className="community-cta-note">
              <Users aria-hidden="true" className="h-3.5 w-3.5" />
              Everything about EternalCodeTeam
            </span>

            <span className="community-cta-note">
              <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
              Help, feedback &amp; releases
            </span>
          </div>
        </div>

        <div aria-hidden="true" className="community-cta-visual">
          <div className="community-cta-glass">
            <div className="community-cta-glass-depth" />
            <div className="community-cta-character-glow" />

            <span className="community-cta-float community-cta-float-a" />
            <span className="community-cta-float community-cta-float-b" />
            <span className="community-cta-float community-cta-float-c" />

            <div className="community-cta-mini-card community-cta-mini-card-top">
              <span className="community-cta-mini-dot" />
              <span className="community-cta-mini-line" />
              <span className="community-cta-mini-line community-cta-mini-line-short" />
            </div>

            <Image
              alt=""
              className="community-cta-mascot"
              height={1020}
              priority={false}
              sizes="(max-width: 767px) 290px, (max-width: 1023px) 360px, 430px"
              src="/community/wumpus.png"
              width={823}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
