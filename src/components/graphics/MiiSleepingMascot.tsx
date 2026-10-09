"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Moon, Sparkles, Coffee } from "lucide-react";

export function MiiSleepingMascot({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative select-none pointer-events-auto ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Floating Animated Zzz... Letters */}
      <div className="absolute -top-10 sm:-top-12 right-12 sm:right-16 flex flex-col items-end pointer-events-none">
        <span className="text-xs sm:text-sm font-mono font-black text-brand-cobalt dark:text-brand-blue animate-bounce opacity-80">
          Z
        </span>
        <span className="text-[10px] sm:text-xs font-mono font-bold text-brand-amber dark:text-brand-lime animate-bounce delay-150 opacity-70 translate-x-2 -translate-y-1">
          z
        </span>
        <span className="text-[8px] sm:text-[10px] font-mono font-semibold text-brand-ember animate-bounce delay-300 opacity-60 translate-x-4 -translate-y-2">
          z
        </span>
      </div>

      {/* Hover Speech Bubble */}
      <div
        className={`absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 transform ${
          hovered ? "opacity-100 scale-100 -translate-y-1" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="px-3 py-1.5 rounded-2xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-brand-amber shadow-solid-sm text-[11px] font-mono font-bold text-brand-navy dark:text-white whitespace-nowrap flex items-center gap-1.5">
          <Moon className="w-3 h-3 text-brand-amber" />
          <span>Shhh... recharging between builds ⚡</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white dark:bg-surface-darkCard border-r-2 border-b-2 border-brand-navy dark:border-brand-amber rotate-45" />
        </div>
      </div>

      {/* Sleeping Character lying flat on border ledge */}
      <div className="relative w-44 sm:w-56 h-20 sm:h-24 flex items-end justify-center">

        <div className="relative w-full h-full flex items-end justify-center transition-transform duration-300 hover:scale-105 cursor-pointer">
          <Image
            src="/images/mii-sleeping.png"
            alt="Vansh Mii Avatar Sleeping on Ledge"
            width={240}
            height={110}
            className="w-full h-full object-contain object-bottom drop-shadow-[0_4px_8px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>
    </div>
  );
}
