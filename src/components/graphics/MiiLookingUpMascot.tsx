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
    setTimeout(() => setIsPondering(false), 400);
  };

  return (
    <div
      className={`relative select-none inline-flex flex-col items-center justify-center cursor-pointer ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Click to cycle thoughts!"
    >
      {/* 1. What the Mii is looking up at: Floating Glowing Idea / Cloud Object */}
      <div className="relative mb-3 flex flex-col items-center z-20">
        {/* Floating Glowing Concept Pill directly in gaze path */}
        <div
          className={`relative px-3.5 py-1.5 rounded-2xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-brand-amber shadow-solid-sm flex items-center gap-2 transition-all duration-300 transform ${
            hovered || isPondering ? "scale-110 -translate-y-1 shadow-solid" : "animate-float"
          }`}
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 rounded-2xl bg-brand-amber/20 dark:bg-brand-blue/20 blur-md -z-10 pointer-events-none" />

          <div className={`p-1 rounded-lg border ${current.color}`}>
            <CurrentIcon className="w-4 h-4 animate-spin-slow" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono text-brand-slate dark:text-gray-400 uppercase tracking-wider font-semibold">
              Contemplating
            </span>
            <span className="text-xs font-mono font-bold text-brand-navy dark:text-white">
              {current.tag}
            </span>
          </div>

          <Sparkles className="w-3.5 h-3.5 text-brand-amber animate-pulse ml-1" />
        </div>

        {/* Floating Thought Dots connecting gaze upwards */}
        <div className="flex flex-col items-center gap-1 my-1 opacity-70">
          <span className="w-2 h-2 rounded-full bg-brand-amber dark:bg-brand-blue animate-pulse" />
          <span className="w-1.5 h-1.5 rounded-full bg-brand-ember delay-100 animate-pulse" />
          <span className="w-1 h-1 rounded-full bg-brand-navy dark:bg-white delay-200 animate-pulse" />
        </div>

        {/* Thought Bubble with Click Hint */}
        <div className="mt-0.5 px-3 py-1 rounded-xl bg-white/95 dark:bg-surface-dark border border-brand-navy/20 dark:border-surface-darkBorder font-mono text-xs font-semibold text-brand-navy dark:text-brand-amber shadow-sm">
          💭 &quot;{current.thought}&quot;
        </div>
      </div>

      {/* 2. Large Looking Up Mii Avatar - Stationary in Place */}
      <div className="relative w-48 h-56 sm:w-56 sm:h-64 flex items-center justify-center">
        {/* Ambient Halo Glow */}
        <div className="absolute w-44 h-44 rounded-full bg-brand-cobalt/15 dark:bg-brand-blue/15 blur-2xl -z-10 pointer-events-none" />

        {/* Character Image (Stationary in place) */}
        <div className="relative z-10 w-full h-full">
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
