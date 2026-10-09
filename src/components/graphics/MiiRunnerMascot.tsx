"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Zap, Flame, Rocket, Code2, AlertTriangle } from "lucide-react";

export function MiiRunnerMascot({ className = "" }: { className?: string }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isSprinting, setIsSprinting] = useState(false);

  const funQuotes = [
    "Deploying to production at lightspeed! 💨",
    "Running 500+ unit tests in parallel! ⚡",
    "Wait, who just pushed directly to main?! 🏃",
    "Optimizing O(N²) down to O(1) in real-time! 🧠",
    "Chasing down that elusive race condition! 🐛",
    "Building hardware rovers & cloud pipelines! 🚀",
  ];

  const handleClick = () => {
    setIsSprinting(true);
    setQuoteIndex((prev) => (prev + 1) % funQuotes.length);
    setTimeout(() => setIsSprinting(false), 800);
  };

  return (
    <div className={`relative select-none ${className}`}>
      <div
        onClick={handleClick}
        className="group relative neo-card p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-brand-amber/15 via-white to-brand-cream/80 dark:from-surface-darkCard dark:via-surface-dark dark:to-surface-darkCard border-2 border-brand-navy dark:border-brand-amber/40 shadow-solid-sm hover:shadow-solid transition-all cursor-pointer overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        {/* Speed lines backdrop effect */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5 bg-[repeating-linear-gradient(45deg,#000_0,#000_2px,transparent_0,transparent_10px)] pointer-events-none" />

        {/* Left: Interactive Info & Quote */}
        <div className="space-y-1.5 text-center sm:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-ember text-white font-mono text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
            <Zap className="w-3 h-3 text-brand-amber animate-bounce" />
            <span>Speed Runner Mode</span>
          </div>

          <h4 className="text-sm sm:text-base font-bold font-display text-brand-navy dark:text-white flex items-center justify-center sm:justify-start gap-2">
            <span>Engineering Velocity in Action</span>
            <span className="text-xs font-mono text-brand-ember font-semibold">(Click to sprint!)</span>
          </h4>

          <div className="p-2.5 rounded-xl bg-white/90 dark:bg-surface-dark border border-brand-navy/20 dark:border-surface-darkBorder font-mono text-xs text-brand-navy dark:text-brand-amber font-semibold shadow-inner inline-block">
            💬 &quot;{funQuotes[quoteIndex]}&quot;
          </div>
        </div>

        {/* Right: Running Character with Speed Trails */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 shrink-0 flex items-center justify-center">
          {/* Animated Speed Wind Lines */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 opacity-60">
            <span className="w-6 h-0.5 bg-brand-ember rounded-full animate-pulse" />
            <span className="w-10 h-0.5 bg-brand-amber rounded-full animate-pulse delay-75" />
            <span className="w-8 h-0.5 bg-brand-navy dark:bg-white rounded-full animate-pulse delay-150" />
          </div>

          {/* Running Mii Image */}
          <div
            className={`relative w-28 h-32 sm:w-32 sm:h-36 transition-transform duration-300 ${
              isSprinting ? "scale-110 -translate-x-2 rotate-6" : "group-hover:scale-105 group-hover:-translate-x-1"
            }`}
          >
            <Image
              src="/images/mii-running.png"
              alt="Vansh Mii Avatar Running Fast"
              width={160}
              height={180}
              className="w-full h-full object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_8px_18px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Ground Dust Puff */}
          <div className="absolute bottom-1 right-2 w-12 h-3 rounded-full bg-brand-navy/10 dark:bg-white/10 blur-xs" />
        </div>
      </div>
    </div>
  );
}
