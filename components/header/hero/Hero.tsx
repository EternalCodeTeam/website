"use client";

import { AnimatedSection, AnimatedElement, AnimatedContainer } from "@/components/animations";
import BackgroundHeroButton from "@/components/header/hero/button/BackgroundHeroButton";
import TransparentHeroButton from "@/components/header/hero/button/TransparentHeroButton";

import Terminal from "./terminal/Terminal";

export default function Hero() {
  return (
    <AnimatedSection
      className="relative mx-auto mt-16 max-w-screen-xl px-4 pt-20 lg:pt-28"
      animationType="fade"
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col-reverse items-center justify-center gap-8 py-8 md:flex-row lg:py-16">
        <div className="text-center lg:text-left">
          <AnimatedElement
            as="h1"
            id="hero-heading"
            className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl lg:mb-6 lg:text-6xl"
            animationType="fadeDown"
            delay={0.1}
          >
            EternalCode.pl
          </AnimatedElement>

          <AnimatedElement
            as="p"
            className="mb-6 ml-[3px] max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl"
            animationType="fadeUp"
            delay={0.2}
          >
            We are a team creating open source projects!
          </AnimatedElement>

          <AnimatedContainer
            className="flex flex-row justify-center lg:justify-start"
            staggerDelay={0.1}
            delay={0.3}
          >
            <AnimatedElement as="div" animationType="fadeLeft" interactive={true}>
              <TransparentHeroButton />
            </AnimatedElement>

            <AnimatedElement as="div" animationType="fadeRight" interactive={true}>
              <BackgroundHeroButton />
            </AnimatedElement>
          </AnimatedContainer>
        </div>

        <AnimatedElement
          as="div"
          className="hidden w-full px-20 lg:col-span-8 lg:block lg:pl-36 lg:pr-0"
          animationType="fadeLeft"
          delay={0.4}
        >
          <Terminal />
        </AnimatedElement>
      </div>
    </AnimatedSection>
  );
}
