"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Terminal, Cloud, Cpu, Sparkles } from "lucide-react";

export function MiiStackMascot({ className = "" }: { className?: string }) {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none py-2 ${className}`}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 2000);
      }}
    >
      {/* Speech Pill on Top */}
      <div className="mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cream dark:bg-surface-dark border border-brand-amber/40 dark:border-brand-amber/30 text-[11px] font-mono font-bold text-brand-navy dark:text-brand-amber shadow-sm">
          <Sparkles className="w-3 h-3 text-brand-ember" />
          <span>{clicked ? "Full-Stack + Silicon Ready! ⚡" : "Welcome to my stack! 🚀"}</span>
        </div>
      </div>

      {/* Main Avatar Container */}
      <div className="relative w-full max-w-[260px] h-[210px] sm:h-[230px] flex items-center justify-center">
        {/* Floating Mini Badges */}
        <div className="absolute top-2 -left-1 z-10 hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white dark:bg-surface-darkCard border border-brand-navy/30 dark:border-surface-darkBorder text-[10px] font-mono text-brand-slate dark:text-gray-300 shadow-sm">
          <Cloud className="w-2.5 h-2.5 text-brand-cobalt" />
          <span>IaC</span>
        </div>

        <div className="absolute top-4 -right-1 z-10 hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white dark:bg-surface-darkCard border border-brand-navy/30 dark:border-surface-darkBorder text-[10px] font-mono text-brand-slate dark:text-gray-300 shadow-sm">
          <Cpu className="w-2.5 h-2.5 text-brand-ember" />
          <span>RTOS</span>
        </div>

        {/* Character Image */}
        <div className="relative w-44 h-52 sm:w-48 sm:h-56 flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer">
          <Image
            src="/images/mii-arms-open.png"
            alt="Vansh Mii Avatar Arms Open"
            width={260}
            height={300}
            className="w-full h-full object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}
