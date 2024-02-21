"use client";

import { motion } from "framer-motion";
import Terminal from "./terminal/Terminal";
import TransparentHeroButton from "@/components/header/hero/button/TransparentHeroButton";
import BackgroundHeroButton from "@/components/header/hero/button/BackgroundHeroButton";

export default function Hero() {
  return (
    <div className="relative mx-auto mt-10 max-w-screen-xl px-4 pt-14 lg:pt-20">
      <div className="flex flex-col-reverse items-center justify-center gap-8 py-8 md:flex-row lg:py-16">
        <div className="text-center lg:text-left">
          <motion.h1
            className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl lg:mb-6 lg:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            EternalCode.pl
          </motion.h1>
          <motion.p
            className="mb-6 ml-[3px] max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55 }}
          >
            We are a team creating open source projects!
          </motion.p>
          <div className="flex flex-row justify-center lg:justify-start">
            <TransparentHeroButton />
            <BackgroundHeroButton />
          </div>
        </div>

        <div className="hidden w-full px-20 lg:col-span-8 lg:block lg:pl-36 lg:pr-0">
          <Terminal />
        </div>
        {/* <PolygonRight /> */}
      </div>
    </div>
  );
}
