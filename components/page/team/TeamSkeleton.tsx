"use client";

import React from "react";

import AnimatedContainer from "@/components/animations/AnimatedContainer";
import AnimatedElement from "@/components/animations/AnimatedElement";
import AnimatedSection from "@/components/animations/AnimatedSection";
import SectionTitle from "@/components/SectionTitle";

export default function TeamSkeleton() {
  return (
    <AnimatedSection id="team" animationType="fadeUp">
      <div className="mx-auto max-w-screen-xl px-4 py-16">
        <AnimatedElement as="div" animationType="fadeDown" delay={0.1}>
          <SectionTitle
            title="Our Team"
            description="EternalCodeTeam is a dedicated group of creative programmers who work on unique open source projects."
          />
        </AnimatedElement>


        {/* Team member fake card */}
        <AnimatedContainer
          className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          staggerDelay={0.18}
        >
          {[...Array(8)].map((_, index) => (
            <AnimatedElement
              key={index}
              as="div"
              animationType="fadeUp"
              interactive={false}
              style={{ minHeight: 320 }}
            >
              {/* Avatar placeholder */}
              <div className="mx-auto mb-4 h-36 w-36 rounded-full bg-gray-200 dark:bg-gray-700"></div>

              {/* Name placeholder */}
              <div className="mx-auto mb-2 h-6 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700"></div>

              {/* Role placeholder */}
              <div className="mx-auto mb-4 h-4 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700"></div>

              {/* Social links placeholders */}
              <div className="mt-4 flex justify-center space-x-4">
                <div className="h-6 w-6 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-6 w-6 rounded-md bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </AnimatedElement>
          ))}
        </AnimatedContainer>
      </div>
    </AnimatedSection>
  );
}
