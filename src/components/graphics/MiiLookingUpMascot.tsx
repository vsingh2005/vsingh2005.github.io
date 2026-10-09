"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BrainCircuit, Lightbulb, Compass, Sparkles } from "lucide-react";

export function MiiLookingUpMascot({ className = "" }: { className?: string }) {
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const thoughts = [
    "From hardware registers to cloud scale... 🧠",
    "How do we cut provisioning time by another 40%? ⚡",
    "Variational quantum circuits on AWS Braket... 🌌",
    "Designing closed-loop motor telemetry in C... 🛠️",
    "Zero drift, deterministic reproducibility... 🎯",
  ];

  const handleNextThought = () => {
    setThoughtIndex((prev) => (prev + 1) % thoughts.length);
  };

  return (
    <div
      className={`relative select-none ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleNextThought}
    >
      <div className="group relative neo-card p-4 sm:p-5 rounded-3xl bg-gradient-to-tr from-brand-cobalt/10 via-white to-brand-cream/70 dark:from-surface-darkCard dark:via-surface-dark dark:to-surface-darkCard border-2 border-brand-navy dark:border-surface-darkBorder shadow-solid-sm hover:shadow-solid transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute left-6 w-32 h-32 rounded-full bg-brand-cobalt/15 dark:bg-brand-blue/15 blur-2xl -z-10 pointer-events-none" />

        {/* Left: Looking Up Mii Avatar */}
        <div className="relative w-28 h-32 sm:w-32 sm:h-36 shrink-0 flex items-center justify-center">
          <div
            className={`relative w-full h-full transition-transform duration-300 ${
              hovered ? "scale-105 -translate-y-1" : "group-hover:scale-102"
            }`}
          >
            <Image
              src="/images/mii-looking-up.png"
              alt="Vansh Mii Avatar Looking Up & Contemplating"
              width={160}
              height={180}
              className="w-full h-full object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_8px_18px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Shadow Base */}
          <div className="absolute bottom-0 inset-x-3 h-2 bg-brand-navy/10 dark:bg-black/30 rounded-full blur-xs" />
        </div>

        {/* Right: Thought Bubble & Philosophy */}
        <div className="space-y-2 text-center sm:text-left z-10 flex-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-cobalt text-white font-mono text-[10px] font-bold shadow-sm">
            <Lightbulb className="w-3 h-3 text-brand-amber animate-pulse" />
            <span>Systems Engineering Mindset</span>
          </div>

          <h4 className="text-xs sm:text-sm font-bold font-display text-brand-navy dark:text-white">
            Pondering Architecture &amp; Scalability
          </h4>

          {/* Interactive Thought Bubble */}
          <div className="relative p-2.5 rounded-2xl bg-white dark:bg-surface-dark border border-brand-navy/20 dark:border-surface-darkBorder font-mono text-xs text-brand-navy dark:text-brand-blue font-semibold shadow-inner">
            <span className="text-brand-slate dark:text-gray-400 text-[10px] block mb-0.5 font-normal">
              Click for next thought:
            </span>
            💭 &quot;{thoughts[thoughtIndex]}&quot;
          </div>
        </div>
      </div>
    </div>
  );
}
