"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Cloud, Cpu, BrainCircuit, Sparkles, Atom } from "lucide-react";

export function MiiLookingUpMascot({ className = "" }: { className?: string }) {
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const [isPondering, setIsPondering] = useState(false);
  const [hovered, setHovered] = useState(false);

  const concepts = [
    {
      icon: Cloud,
      tag: "AWS Cloud Scale",
      thought: "From hardware registers to cloud scale... ☁️",
      color: "text-brand-cobalt bg-brand-cobalt/15 border-brand-cobalt/40",
    },
    {
      icon: Atom,
      tag: "Quantum ML Circuits",
      thought: "Variational QNodes on AWS Braket... 🌌",
      color: "text-purple-600 dark:text-purple-400 bg-purple-500/15 border-purple-500/40",
    },
    {
      icon: Cpu,
      tag: "Embedded Silicon & RTOS",
      thought: "Clock jitter, registers, and bare-metal C... ⚡",
      color: "text-brand-ember bg-brand-ember/15 border-brand-ember/40",
    },
    {
      icon: BrainCircuit,
      tag: "Zero-Drift Architecture",
      thought: "Modular Terraform & self-healing systems... 🎯",
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border-emerald-500/40",
    },
  ];

  const current = concepts[thoughtIndex];
  const CurrentIcon = current.icon;

  const handleClick = () => {
    setIsPondering(true);
    setThoughtIndex((prev) => (prev + 1) % concepts.length);
    setTimeout(() => setIsPondering(false), 300);
  };

  return (
    <div
      className={`relative select-none w-[340px] max-w-full flex flex-col items-center justify-center cursor-pointer ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Click to cycle thoughts!"
    >
      {/* 1. What the Mii is looking up at: Fixed-width Centered Display */}
      <div className="relative mb-2 w-full flex flex-col items-center z-20">
        {/* Floating Glowing Concept Pill */}
        <div
          className={`relative px-4 py-1.5 rounded-2xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-brand-amber shadow-solid-sm flex items-center gap-2 transition-all duration-200 transform ${
            hovered || isPondering ? "scale-105 -translate-y-0.5 shadow-solid" : ""
          }`}
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 rounded-2xl bg-brand-amber/20 dark:bg-brand-blue/20 blur-md -z-10 pointer-events-none" />

          <div className={`p-1 rounded-lg border ${current.color}`}>
            <CurrentIcon className="w-4 h-4" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono text-brand-slate dark:text-gray-400 uppercase tracking-wider font-semibold">
              Contemplating
            </span>
            <span className="text-xs font-mono font-bold text-brand-navy dark:text-white whitespace-nowrap">
              {current.tag}
            </span>
          </div>

          <Sparkles className="w-3.5 h-3.5 text-brand-amber animate-pulse ml-1" />
        </div>

        {/* Floating Thought Dots directly centered */}
        <div className="flex flex-col items-center gap-1 my-1 opacity-70">
          <span className="w-2 h-2 rounded-full bg-brand-amber dark:bg-brand-blue" />
          <span className="w-1.5 h-1.5 rounded-full bg-brand-ember" />
          <span className="w-1 h-1 rounded-full bg-brand-navy dark:bg-white" />
        </div>

        {/* Fixed Center Thought Bubble */}
        <div className="w-full flex justify-center text-center">
          <div className="px-3.5 py-1.5 rounded-xl bg-white/95 dark:bg-surface-dark border border-brand-navy/20 dark:border-surface-darkBorder font-mono text-xs font-semibold text-brand-navy dark:text-brand-amber shadow-sm min-h-[32px] flex items-center justify-center text-center">
            <span>💭 &quot;{current.thought}&quot;</span>
          </div>
        </div>
      </div>

      {/* 2. Large Looking Up Mii Avatar - Exact Static Position */}
      <div className="relative w-56 h-64 sm:w-60 sm:h-72 flex items-center justify-center">
        {/* Ambient Halo Glow */}
        <div className="absolute w-48 h-48 rounded-full bg-brand-cobalt/15 dark:bg-brand-blue/15 blur-2xl -z-10 pointer-events-none" />

        {/* Character Image */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <Image
            src="/images/mii-looking-up.png"
            alt="Vansh Mii Avatar Looking Up & Contemplating Architecture"
            width={280}
            height={320}
            className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.22)] dark:drop-shadow-[0_10px_24px_rgba(0,0,0,0.65)]"
          />
        </div>
      </div>
    </div>
  );
}
