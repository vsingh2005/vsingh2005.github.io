"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trophy, Sparkles, ShieldCheck, Zap } from "lucide-react";

export function MiiFlexMascot({ className = "" }: { className?: string }) {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative select-none inline-flex flex-col items-center sm:items-end justify-center cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 2000);
      }}
      title="Click me!"
    >
      {/* Interactive Speech / Flex Badge Above */}
      <div
        className={`mb-2 transition-all duration-300 transform ${
          hovered || clicked ? "scale-105 -translate-y-1" : "scale-100"
        }`}
      >
        <div className="relative px-3 py-1.5 rounded-2xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-brand-amber shadow-solid-sm text-xs font-mono font-bold text-brand-navy dark:text-brand-amber flex items-center gap-1.5 whitespace-nowrap">
          <Trophy className="w-3.5 h-3.5 text-brand-amber animate-bounce" />
          <span>{clicked ? "100% Hardware Uptime • Zero Drift! 💪" : "Built for Extreme Resilience! 🏆"}</span>
          <div className="absolute -bottom-1.5 right-10 w-2.5 h-2.5 bg-white dark:bg-surface-darkCard border-r-2 border-b-2 border-brand-navy dark:border-brand-amber rotate-45" />
        </div>
      </div>

      {/* Flexing Avatar Container */}
      <div className="relative w-40 h-44 sm:w-48 sm:h-52 flex items-center justify-center">
        {/* Ambient Halo Glow */}
        <div className="absolute w-36 h-36 rounded-full bg-brand-amber/20 dark:bg-brand-ember/20 blur-2xl -z-10 pointer-events-none" />

        {/* Floating Mini Badges */}
        <div className="absolute -top-1 left-0 z-10 hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-lg bg-brand-cream dark:bg-surface-dark border border-brand-amber/40 text-[10px] font-mono font-bold text-brand-navy dark:text-brand-amber shadow-sm animate-pulse">
          <Zap className="w-2.5 h-2.5 text-brand-ember" />
          <span>2nd Global</span>
        </div>

        {/* Character Image */}
        <div
          className={`relative z-10 w-36 h-40 sm:w-44 sm:h-48 transition-transform duration-300 ${
            hovered || clicked ? "scale-108 -translate-y-1" : "hover:scale-103"
          }`}
        >
          <Image
            src="/images/mii-flex.png"
            alt="Vansh Mii Avatar Flexing"
            width={220}
            height={240}
            className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_8px_20px_rgba(0,0,0,0.65)]"
          />
        </div>
      </div>
    </div>
  );
}
