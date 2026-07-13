"use client";

import { Icon } from "@iconify/react";
import { ArrowUpRight, MessageCircle, Users } from "lucide-react";
import Image from "next/image";

export default function Cta() {
  return (
    <section className="section-shell pb-24 sm:pb-32">
      <div className="cta-panel cta-panel-clean">
        <div className="cta-copy">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-60">
            Build with us
          </span>
          <h2 className="mt-4 max-w-3xl font-semibold text-4xl tracking-[-0.055em] sm:text-6xl">
            Good software gets better in good company.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 opacity-70">
            Ask questions, share feedback or just hang out with people who also spend too much time
            thinking about Minecraft server plugins.
          </p>
          <div className="mt-7 flex flex-wrap gap-5 text-sm opacity-65">
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4" /> Developers & server owners
            </span>
            <span className="inline-flex items-center gap-2">
              <MessageCircle className="h-4 w-4" /> Help, feedback & releases
            </span>
          </div>
        </div>

        <div className="cta-wumpus-column">
          <div className="cta-wumpus">
            <div aria-hidden="true" className="cta-wumpus-glow" />
            <Image
              alt="Wumpus Discord mascot"
              className="cta-wumpus-image"
              height={1020}
              sizes="(max-width: 767px) 184px, 212px"
              src="/community/wumpus.png"
              width={823}
            />
          </div>
          <a
            className="cta-button cta-button-clean"
            href="https://discord.com/invite/FQ7jmGBd6c"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon className="h-5 w-5" icon="simple-icons:discord" /> Join Discord
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
