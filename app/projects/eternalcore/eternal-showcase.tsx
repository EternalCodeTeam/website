"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FadeIn } from "@/components/ui/motion/motion-components";
import { useSpotlight } from "@/hooks/use-spotlight";

const marqueeItems = [
  // Row 1: Essentials & Chat
  { id: "adminchat", title: "Admin Chat", src: "/docs/eternalcore/adminchat.gif" },
  { id: "broadcast", title: "Broadcast", src: "/docs/eternalcore/broadcast.gif" },
  { id: "msg", title: "Private Messages", src: "/docs/eternalcore/msg.gif" },
  { id: "afk", title: "AFK System", src: "/docs/eternalcore/afk.gif" },
  { id: "motd", title: "Server MOTD", src: "/docs/eternalcore/motd.gif" },
  { id: "playtime", title: "Playtime Tracker", src: "/docs/eternalcore/playtime.gif" },
  { id: "seen", title: "Last Seen", src: "/docs/eternalcore/seen.gif" },
  { id: "near", title: "Nearby Players", src: "/docs/eternalcore/near.gif" },
  { id: "spawn", title: "Spawn Teleport", src: "/docs/eternalcore/spawn.gif" },
  { id: "randomtp", title: "Random Teleport", src: "/docs/eternalcore/randomtp.gif" },
  { id: "tpahere", title: "TPA Request", src: "/docs/eternalcore/tpahere.gif" },

  // Row 2: Administration & World
  { id: "gamemode", title: "Gamemode", src: "/docs/eternalcore/gamemode.gif" },
  { id: "time", title: "Time Control", src: "/docs/eternalcore/time.gif" },
  { id: "jail", title: "Jail System", src: "/docs/eternalcore/jail.gif" },
  { id: "vanish", title: "Vanish", src: "/docs/eternalcore/vanish.gif" },
  { id: "god", title: "God Mode", src: "/docs/eternalcore/god.gif" },
  { id: "fly", title: "Fly Mode", src: "/docs/eternalcore/fly.gif" },
  { id: "speed", title: "Speed", src: "/docs/eternalcore/speed.gif" },
  { id: "heal", title: "Heal Player", src: "/docs/eternalcore/heal.gif" },
  { id: "feed", title: "Feed Player", src: "/docs/eternalcore/feed.gif" },
  { id: "clear", title: "Clear Inventory", src: "/docs/eternalcore/clear.gif" },
  { id: "butcher", title: "Butcher Mobs", src: "/docs/eternalcore/butcher.gif" },
  { id: "kill", title: "Kill Player", src: "/docs/eternalcore/kill.gif" },

  // Row 3: Items, Fun & Mechanics
  { id: "itemedit", title: "Item Editor", src: "/docs/eternalcore/itemedit.gif" },
  { id: "signedit", title: "Sign Editor", src: "/docs/eternalcore/signedit.gif" },
  { id: "container", title: "Container Access", src: "/docs/eternalcore/container.gif" },
  { id: "enchant", title: "Enchanting", src: "/docs/eternalcore/enchant.gif" },
  { id: "repair", title: "Repair Item", src: "/docs/eternalcore/repair.gif" },
  { id: "give", title: "Give Item", src: "/docs/eternalcore/give.gif" },
  { id: "hat", title: "Wear Hat", src: "/docs/eternalcore/hat.gif" },
  { id: "setslot", title: "Set Slot", src: "/docs/eternalcore/setslot.gif" },
  { id: "powertool", title: "Powertool", src: "/docs/eternalcore/powertool.gif" },
  { id: "lightning", title: "Lightning Strike", src: "/docs/eternalcore/lightning.gif" },
  { id: "fireball", title: "Fireball", src: "/docs/eternalcore/fireball.gif" },
  { id: "burn", title: "Burn Player", src: "/docs/eternalcore/burn.gif" },
  { id: "freeze", title: "Freeze Player", src: "/docs/eternalcore/freeze.gif" },
  { id: "elderguardian", title: "Jumpscare", src: "/docs/eternalcore/elderguardian.gif" },
];

// -- Modal Component --
const ShowcaseModal = ({
  item,
  onClose,
}: {
  item: (typeof marqueeItems)[0];
  onClose: () => void;
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return createPortal(
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-white/10"
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="relative aspect-video w-full bg-black/5 dark:bg-black">
          <Image
            alt={item.title}
            className="object-contain"
            fill
            priority
            src={item.src}
            unoptimized
          />
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 z-20 cursor-pointer rounded-full bg-white/10 p-2 text-black/70 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-black dark:bg-black/50 dark:text-white/70 dark:hover:bg-black/70 dark:hover:text-white"
            onClick={onClose}
            type="button"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="border-gray-100 border-t bg-white p-6 dark:border-white/5 dark:bg-gray-900">
          <h3 className="font-bold text-2xl text-gray-900 dark:text-white">{item.title}</h3>
          <p className="mt-1 font-mono text-gray-500 text-sm dark:text-gray-400">/{item.id}</p>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const InfiniteMarquee = ({
  items,
  direction = "left",
  speed = 40,
  onItemClick,
}: {
  items: typeof marqueeItems;
  direction?: "left" | "right";
  speed?: number;
  onItemClick: (item: (typeof marqueeItems)[0]) => void;
}) => {
  const spotlight = useSpotlight<HTMLDivElement>();

  return (
    <div className="relative flex w-full overflow-hidden">
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        className="flex gap-4 py-4"
        style={{
          width: "max-content",
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <motion.div
            className="spotlight-card group relative aspect-video w-[400px] shrink-0 transform-gpu cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm transition-all will-change-transform hover:border-[#9d6eef]/50 hover:shadow-[#9d6eef]/20 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
            key={`${item.id}-${i}`}
            onClick={() => onItemClick(item)}
            onPointerLeave={spotlight.onPointerLeave}
            onPointerMove={spotlight.onPointerMove}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              alt={item.id}
              className="h-full w-full transform-gpu object-cover transition-transform duration-500 will-change-transform group-hover:scale-110"
              fill
              sizes="400px"
              src={item.src}
              unoptimized
            />

            {/* Gradient Overlay & Content - Always visible on hover */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <div className="translate-y-4 transform-gpu transition-transform duration-300 will-change-transform group-hover:translate-y-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg text-white">{item.title}</h4>
                    <span className="font-mono text-[#9d6eef] text-xs">/{item.id}</span>
                  </div>
                  <div className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export function EternalShowcase() {
  const [selectedItem, setSelectedItem] = useState<(typeof marqueeItems)[0] | null>(null);
  const midPoint = Math.ceil(marqueeItems.length / 2);

  return (
    <>
      <section className="overflow-hidden border-gray-100 border-t py-24 dark:border-gray-800/50">
        <div className="mx-auto max-w-[90rem] px-4 md:px-8">
          <FadeIn className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl text-gray-900 tracking-tight md:text-4xl dark:text-white">
              Powerful Tools <span className="text-[#9d6eef]">Built-in.</span>
            </h2>
            <p className="mx-auto max-w-xl text-gray-600 dark:text-gray-400">
              Everything you need in one standardized core.
            </p>
          </FadeIn>
        </div>

        {/* Horizontal Marquee Container (No 3D Tilt) */}
        <FadeIn className="relative -my-10 space-y-4 py-8" delay={0.2}>
          <InfiniteMarquee
            direction="left"
            items={marqueeItems.slice(0, midPoint)}
            onItemClick={setSelectedItem}
            speed={50}
          />
          <InfiniteMarquee
            direction="right"
            items={marqueeItems.slice(midPoint)}
            onItemClick={setSelectedItem}
            speed={50}
          />
        </FadeIn>

        {/* Fade Edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent dark:from-[#030711]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent dark:from-[#030711]" />
      </section>

      {/* Modal Portal */}
      <AnimatePresence>
        {selectedItem && (
          <ShowcaseModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
