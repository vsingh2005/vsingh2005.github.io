"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Zap, Sparkles } from "lucide-react";

export function MiiRunnerMascot({ className = "" }: { className?: string }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isSprinting, setIsSprinting] = useState(false);
  const [hovered, setHovered] = useState(false);

  const funQuotes = [
    "Deploying to prod at lightspeed! 💨",
    "Running 500+ unit tests in parallel! ⚡",
    "Wait, who just pushed directly to main?! 🏃",
    "Optimizing O(N²) down to O(1) in real-time! 🧠",
    "Chasing down that race condition! 🐛",
    "Building hardware rovers & cloud pipelines! 🚀",
  ];

  const handleClick = () => {
    setIsSprinting(true);
    setQuoteIndex((prev) => (prev + 1) % funQuotes.length);
    setTimeout(() => setIsSprinting(false), 700);
  };

  return (
    <div
      className={`relative select-none inline-flex flex-col items-center sm:items-end justify-center cursor-pointer ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Click me to sprint!"
    >
      {/* Interactive Speech Bubble Above */}
      <div
        className={`mb-2 transition-all duration-300 transform ${
          hovered || isSprinting ? "scale-105 -translate-y-1" : "scale-100"
        }`}
      >
        <div className="relative px-3 py-1.5 rounded-2xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-brand-amber shadow-solid-sm text-xs font-mono font-bold text-brand-navy dark:text-brand-amber flex items-center gap-1.5 whitespace-nowrap">
          <Zap className="w-3.5 h-3.5 text-brand-ember animate-bounce" />
          <span>{funQuotes[quoteIndex]}</span>
          <div className="absolute -bottom-1.5 right-12 w-2.5 h-2.5 bg-white dark:bg-surface-darkCard border-r-2 border-b-2 border-brand-navy dark:border-brand-amber rotate-45" />
        </div>
      </div>

      {/* Running Avatar Container with Sprint Lines on the RIGHT (Behind him) */}
      <div className="relative w-44 h-48 sm:w-56 sm:h-60 flex items-center justify-center">
        {/* Animated Speed / Wind Trail Lines on the RIGHT (trailing behind his back) */}
        <div className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 pointer-events-none z-0">
          <div className="flex items-center gap-1">
            <span className="w-12 sm:w-16 h-1 bg-brand-ember rounded-full animate-pulse shadow-sm" />
            <span className="w-4 h-1 bg-brand-ember/60 rounded-full animate-pulse" />
          </div>
          <div className="flex items-center gap-1 translate-x-3">
            <span className="w-16 sm:w-20 h-1 bg-brand-amber rounded-full animate-pulse delay-75 shadow-sm" />
            <span className="w-5 h-1 bg-brand-amber/60 rounded-full animate-pulse delay-75" />
          </div>
          <div className="flex items-center gap-1 translate-x-1">
            <span className="w-10 sm:w-14 h-1 bg-brand-navy dark:bg-white rounded-full animate-pulse delay-150 shadow-sm" />
            <span className="w-3 h-1 bg-brand-navy/60 dark:bg-white/60 rounded-full animate-pulse delay-150" />
          </div>
        </div>

        {/* Running Mii Character (Large) */}
        <div
          className={`relative z-10 w-40 h-44 sm:w-52 sm:h-56 transition-transform duration-300 ${
            isSprinting
              ? "scale-110 -translate-x-4 rotate-3"
              : hovered
              ? "scale-105 -translate-x-2"
              : "hover:scale-105"
          }`}
        >
          <Image
            src="/images/mii-running.png"
            alt="Vansh Mii Avatar Running"
            width={260}
            height={280}
            className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_10px_24px_rgba(0,0,0,0.7)]"
          />
        </div>

        {/* Dust Clouds at Ground level on the right */}
        <div className="absolute bottom-2 right-6 w-10 h-3 rounded-full bg-brand-amber/30 dark:bg-white/20 blur-xs" />
      </div>
    </div>
  );
}
