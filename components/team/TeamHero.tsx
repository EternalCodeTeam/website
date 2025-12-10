"use client";



import { SlideIn, StaggerContainer } from "@/components/ui/motion/MotionComponents";


export default function TeamHero() {
    return (
        <section className="relative pt-32 pb-8 lg:pt-48 lg:pb-12">
            <StaggerContainer className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="flex flex-col items-center text-center">
                    <SlideIn direction="up" delay={0.2}>
                        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                            The Architects of{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                                Innovation
                            </span>
                        </h1>
                    </SlideIn>

                    <SlideIn direction="up" delay={0.3}>
                        <p className="mb-8 max-w-3xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
                            We are a collective of passionate developers, designers, and creators dedicated to
                            building the future of open-source software. Driven by curiosity and united by code.
                        </p>
                    </SlideIn>
                </div>
            </StaggerContainer>
        </section>
    );
}
