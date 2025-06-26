"use client";

import React from "react";

import AnimatedSection from "@/components/animations/AnimatedSection";

interface TeamErrorProps {
  error: string;
}

export default function TeamError({ error }: TeamErrorProps) {
  return (
    <AnimatedSection id="team" animationType="fadeUp">
      <div className="mx-auto max-w-screen-xl px-4 py-16">
        <div className="flex h-64 items-center justify-center">
          <div className="text-xl text-red-500">Error: {error}</div>
        </div>
      </div>
    </AnimatedSection>
  );
}
