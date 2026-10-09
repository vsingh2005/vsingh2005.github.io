"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trophy, Dumbbell, Sparkles, ShieldCheck } from "lucide-react";

export function MiiFlexMascot({ className = "" }: { className?: string }) {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative select-none ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 2000);
      }}
    >
      <div className="group relative neo-card p-3 sm:p-4 rounded-3xl bg-gradient-to-br from-brand-amber/10 via-white to-brand-cream/60 dark:from-surface-darkCard dark:via-surface-dark dark:to-surface-darkCard border-2 border-brand-navy dark:border-surface-darkBorder shadow-solid-sm hover:shadow-solid transition-all cursor-pointer flex items-center justify-between gap-3 overflow-hidden">
        {/* Ambient glow behind avatar */}
        <div className="absolute right-4 w-28 h-28 rounded-full bg-brand-amber/20 dark:bg-brand-ember/20 blur-2xl -z-10 pointer-events-none" />

        {/* Left: Text & Badges */}
        <div className="space-y-1 z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-ember text-white font-mono text-[10px] font-bold shadow-sm">
            <Trophy className="w-3 h-3 text-brand-amber" />
            <span>High Performance</span>
          </div>

          <h4 className="text-xs sm:text-sm font-bold font-display text-brand-navy dark:text-white">
            Built for Extreme Resilience
          </h4>

          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/90 dark:bg-surface-dark border border-brand-navy/15 dark:border-surface-darkBorder text-[10px] font-mono text-brand-slate dark:text-gray-300 font-semibold">
            <Sparkles className="w-3 h-3 text-brand-amber" />
            <span>{clicked ? "Zero Drift • 100% Uptime! 💪" : "ASME Global 2nd Place"}</span>
          </div>
        </div>

        {/* Right: Flexing Mii Image */}
        <div className="relative w-24 h-28 sm:w-28 sm:h-32 shrink-0 flex items-center justify-center">
          <div
            className={`relative w-full h-full transition-transform duration-300 ${
              hovered || clicked ? "scale-110" : "group-hover:scale-105"
            }`}
          >
            <Image
              src="/images/mii-flex.png"
              alt="Vansh Mii Avatar Flexing"
              width={140}
              height={160}
              className="w-full h-full object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_6px_16px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Shadow Base */}
          <div className="absolute bottom-0 inset-x-3 h-2 bg-brand-navy/10 dark:bg-black/30 rounded-full blur-xs" />
        </div>
      </div>
    </div>
  );
}
