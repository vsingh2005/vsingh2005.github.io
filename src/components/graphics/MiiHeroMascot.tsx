"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Cloud, Cpu, Box, Code2, Layers, Sparkles, Orbit } from "lucide-react";

export function MiiHeroMascot({ className = "" }: { className?: string }) {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isPausedRef = useRef(false);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const floatingSkills = [
    {
      name: "Terraform & AWS",
      icon: Cloud,
      color: "border-brand-cobalt text-brand-cobalt bg-brand-cobalt/15 dark:bg-brand-cobalt/25",
      glow: "shadow-[0_0_15px_rgba(37,99,235,0.3)]",
    },
    {
      name: "Python & PyTorch",
      icon: Code2,
      color: "border-brand-amber text-brand-navy dark:text-brand-amber bg-brand-amber/20 dark:bg-brand-amber/30",
      glow: "shadow-[0_0_15px_rgba(255,176,32,0.3)]",
    },
    {
      name: "C / C++ Systems",
      icon: Cpu,
      color: "border-brand-ember text-brand-ember bg-brand-ember/15 dark:bg-brand-ember/25",
      glow: "shadow-[0_0_15px_rgba(255,87,34,0.3)]",
    },
    {
      name: "Docker & CI/CD",
      icon: Box,
      color: "border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-cyan-500/15 dark:bg-cyan-500/25",
      glow: "shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    },
    {
      name: "TypeScript & Next.js",
      icon: Layers,
      color: "border-brand-blue text-brand-blue bg-brand-blue/15 dark:bg-brand-blue/25",
      glow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    },
  ];

  useEffect(() => {
    let animationFrameId: number;
    let angle = 0;

    const animate = () => {
      if (!isPausedRef.current) {
        // Smooth orbital speed (~20 seconds for full orbit)
        angle += 0.006;

        const isMobile = window.innerWidth < 640;
        const radiusX = isMobile ? 125 : 155;
        const radiusY = isMobile ? 70 : 88;

        badgeRefs.current.forEach((badge, index) => {
          if (!badge) return;

          // 5 badges evenly distributed (2 * PI / 5)
          const currentAngle = angle + (index * (2 * Math.PI)) / floatingSkills.length;
          const x = Math.cos(currentAngle) * radiusX;
          const y = Math.sin(currentAngle) * radiusY;

          // 3D Depth effect: when y > 0, badge is in FRONT of Mii; when y < 0, BEHIND Mii
          const depth = (Math.sin(currentAngle) + 1) / 2; // Range 0 to 1
          const scale = 0.82 + depth * 0.26; // Range 0.82 to 1.08
          const zIndex = y > 0 ? 25 : 5;
          const opacity = 0.65 + depth * 0.35; // Range 0.65 to 1.0

          badge.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
          badge.style.zIndex = `${zIndex}`;
          badge.style.opacity = `${opacity}`;
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [floatingSkills.length]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none py-6 ${className}`}
      onMouseEnter={() => {
        setHovered(true);
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        setHovered(false);
        isPausedRef.current = false;
      }}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 2000);
      }}
    >
      {/* Ambient Soft Breathing Halo Glow */}
      <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-brand-ember/40 via-brand-coral/25 to-brand-amber/20 blur-3xl -z-10 pointer-events-none animate-soft-glow" />

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

      {/* Main Orbit Stage */}
      <div className="relative w-full max-w-[380px] h-[310px] sm:h-[350px] flex items-center justify-center">
        {/* Subtle Visual Orbital Trajectory Rings */}
        <div className="absolute inset-x-3 sm:inset-x-0 top-1/2 -translate-y-1/2 h-[150px] sm:h-[180px] rounded-[100%] border border-dashed border-brand-amber/25 dark:border-brand-blue/25 pointer-events-none -z-0 rotate-[-4deg] opacity-60" />

        {/* Orbiting Skill Badges */}
        {floatingSkills.map((skill, idx) => {
          const Icon = skill.icon;
          return (
            <div
              key={idx}
              ref={(el) => {
                badgeRefs.current[idx] = el;
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-auto cursor-pointer"
            >
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/95 dark:bg-surface-darkCard border-2 border-brand-navy dark:border-surface-darkBorder shadow-solid-sm ${skill.glow} text-[11px] font-mono font-bold text-brand-navy dark:text-gray-200 transition-all duration-200 hover:scale-115 hover:shadow-solid whitespace-nowrap`}
              >
                <div className={`p-1 rounded-md border ${skill.color}`}>
                  <Icon className="w-3 h-3" />
                </div>
                <span>{skill.name}</span>
              </div>
            </div>
          );
        })}

        {/* Center Mii Character (Layered at z-10 so badges orbit in front (z-25) and behind (z-5)) */}
        <div className="relative z-10 w-56 h-72 sm:w-64 sm:h-80 flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer">
          <Image
            src="/images/mii-waving.png"
            alt="Vansh Mii Avatar Waving"
            width={340}
            height={400}
            priority
            className="w-full h-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.22)] dark:drop-shadow-[0_12px_28px_rgba(0,0,0,0.65)]"
          />
        </div>
      </div>
    </div>
  );
}
