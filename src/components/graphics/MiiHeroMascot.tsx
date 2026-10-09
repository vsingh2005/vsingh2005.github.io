"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Cloud, Cpu, Terminal, Layers, Code2, Sparkles, Box } from "lucide-react";

export function MiiHeroMascot({ className = "" }: { className?: string }) {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const floatingSkills = [
    {
      name: "Terraform & AWS",
      icon: Cloud,
      position: "-top-1 -left-2 sm:-left-6",
      color: "border-brand-cobalt text-brand-cobalt bg-brand-cobalt/10",
      delay: "animation-delay-0",
    },
    {
      name: "Python & PyTorch",
      icon: Code2,
      position: "-top-2 -right-2 sm:-right-6",
      color: "border-brand-amber text-brand-navy dark:text-brand-amber bg-brand-amber/15",
      delay: "animation-delay-150",
    },
    {
      name: "C / C++ Systems",
      icon: Cpu,
      position: "top-24 -left-4 sm:-left-8",
      color: "border-brand-ember text-brand-ember bg-brand-ember/10",
      delay: "animation-delay-300",
    },
    {
      name: "Docker & CI/CD",
      icon: Box,
      position: "top-28 -right-4 sm:-right-8",
      color: "border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10",
      delay: "animation-delay-200",
    },
    {
      name: "TypeScript & Next.js",
      icon: Layers,
      position: "bottom-8 -right-2 sm:-right-4",
      color: "border-brand-blue text-brand-blue bg-brand-blue/10",
      delay: "animation-delay-100",
    },
  ];

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none py-6 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 2000);
      }}
    >
      {/* Ambient Halo Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-brand-amber/15 dark:bg-brand-ember/15 blur-3xl -z-10 pointer-events-none" />

      {/* Speech Bubble on Hover/Click */}
      <div
        className={`absolute -top-4 sm:-top-6 z-30 transition-all duration-300 transform ${
          hovered || clicked
            ? "opacity-100 scale-100 -translate-y-1"
            : "opacity-95 scale-95"
        }`}
      >
        <div className="relative px-4 py-1.5 rounded-2xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-brand-amber shadow-solid-sm text-xs font-mono font-bold text-brand-navy dark:text-white flex items-center gap-2 cursor-pointer">
          <span className="inline-block animate-wave text-base">👋</span>
          <span>{clicked ? "Ready for Full-Time & Internships!" : "Hey there! I'm Vansh"}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-surface-darkCard border-r-2 border-b-2 border-brand-navy dark:border-brand-amber rotate-45" />
        </div>
      </div>

      {/* Main Avatar Frame & Floating Skills */}
      <div className="relative w-full max-w-[360px] h-[300px] sm:h-[340px] flex items-center justify-center">
        {/* Floating Skill Badges */}
        {floatingSkills.map((skill, idx) => {
          const Icon = skill.icon;
          return (
            <div
              key={idx}
              className={`absolute ${skill.position} z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/95 dark:bg-surface-darkCard border-2 border-brand-navy dark:border-surface-darkBorder shadow-solid-sm text-[11px] font-mono font-bold text-brand-navy dark:text-gray-200 transition-all duration-300 hover:scale-110 hover:shadow-solid cursor-pointer`}
            >
              <div className={`p-1 rounded-md border ${skill.color}`}>
                <Icon className="w-3 h-3" />
              </div>
              <span className="whitespace-nowrap">{skill.name}</span>
            </div>
          );
        })}

        {/* Center Character Image */}
        <div className="relative w-56 h-72 sm:w-64 sm:h-80 flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer z-10">
          <Image
            src="/images/mii-waving.png"
            alt="Vansh Mii Avatar Waving"
            width={340}
            height={400}
            priority
            className="w-full h-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_12px_28px_rgba(0,0,0,0.65)]"
          />
        </div>

        {/* Ground Shadow Ellipse */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-5 rounded-full bg-brand-navy/15 dark:bg-black/40 blur-sm -z-10" />
      </div>
    </div>
  );
}
