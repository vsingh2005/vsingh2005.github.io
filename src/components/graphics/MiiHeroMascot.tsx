"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Terminal, Cpu, CheckCircle2 } from "lucide-react";

export function MiiHeroMascot({ className = "" }: { className?: string }) {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none py-4 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 2000);
      }}
    >
      {/* Ambient Halo Glow */}
      <div className="absolute w-64 h-64 rounded-full bg-brand-amber/15 dark:bg-brand-ember/15 blur-3xl -z-10 pointer-events-none" />

      {/* Speech Bubble on Hover/Click */}
      <div
        className={`absolute -top-3 sm:-top-5 z-20 transition-all duration-300 transform ${
          hovered || clicked
            ? "opacity-100 scale-100 -translate-y-1"
            : "opacity-90 scale-95"
        }`}
      >
        <div className="relative px-3.5 py-1.5 rounded-2xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-brand-amber shadow-solid-sm text-xs font-mono font-bold text-brand-navy dark:text-white flex items-center gap-1.5 cursor-pointer">
          <span className="inline-block animate-wave text-sm">👋</span>
          <span>{clicked ? "Ready to build the future!" : "Hey there! I'm Vansh"}</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-surface-darkCard border-r-2 border-b-2 border-brand-navy dark:border-brand-amber rotate-45" />
        </div>
      </div>

      {/* Floating System Badges */}
      <div className="relative w-full max-w-[340px] h-[280px] sm:h-[320px] flex items-center justify-center">
        {/* Floating Top Left Badge */}
        <div className="absolute top-4 left-0 sm:-left-2 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-cream dark:bg-surface-dark border-2 border-brand-navy dark:border-surface-darkBorder shadow-solid-sm text-[11px] font-mono font-bold text-brand-navy dark:text-brand-amber animate-pulse">
          <Cpu className="w-3.5 h-3.5 text-brand-ember" />
          <span>&lt;SystemVerilog/&gt;</span>
        </div>

        {/* Floating Top Right Pipeline Badge */}
        <div className="absolute top-6 right-0 sm:-right-2 z-10 flex flex-col gap-0.5 px-3 py-1.5 rounded-xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-surface-darkBorder shadow-solid-sm text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-brand-navy dark:text-white font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>aws_vpc: ok</span>
          </div>
          <span className="text-[10px] text-brand-cobalt dark:text-brand-blue">latency: 1.4ms</span>
        </div>

        {/* Floating Bottom Left Badge */}
        <div className="absolute bottom-6 left-1 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-lightLime text-brand-navy border border-brand-navy/30 text-[10px] font-mono font-bold shadow-sm">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>IaC Verified</span>
        </div>

        {/* Center Character Image */}
        <div className="relative w-52 h-64 sm:w-60 sm:h-72 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 cursor-pointer">
          <Image
            src="/images/mii-waving.png"
            alt="Vansh Mii Avatar Waving"
            width={320}
            height={380}
            priority
            className="w-full h-full object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* Ground Shadow Ellipse */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-44 h-5 rounded-full bg-brand-navy/15 dark:bg-black/40 blur-sm -z-10" />
      </div>
    </div>
  );
}
