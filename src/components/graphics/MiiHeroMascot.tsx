"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Cloud, Cpu, Box, Code2, Layers } from "lucide-react";

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
      glow: "shadow-[0_0_12px_rgba(37,99,235,0.25)]",
    },
    {
      name: "Python & PyTorch",
      icon: Code2,
      color: "border-brand-amber text-brand-navy dark:text-brand-amber bg-brand-amber/20 dark:bg-brand-amber/30",
      glow: "shadow-[0_0_12px_rgba(255,176,32,0.25)]",
    },
    {
      name: "C / C++ Systems",
      icon: Cpu,
      color: "border-brand-ember text-brand-ember bg-brand-ember/15 dark:bg-brand-ember/25",
      glow: "shadow-[0_0_12px_rgba(255,87,34,0.25)]",
    },
    {
      name: "Docker & CI/CD",
      icon: Box,
      color: "border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-cyan-500/15 dark:bg-cyan-500/25",
      glow: "shadow-[0_0_12px_rgba(6,182,212,0.25)]",
    },
    {
      name: "TypeScript & Next.js",
      icon: Layers,
      color: "border-brand-blue text-brand-blue bg-brand-blue/15 dark:bg-brand-blue/25",
      glow: "shadow-[0_0_12px_rgba(59,130,246,0.25)]",
    },
  ];

  useEffect(() => {
    let animationFrameId: number;
    let angle = 0;

    const animate = () => {
      if (!isPausedRef.current) {
        // Smooth orbital rotation speed (~18s full orbit)
        angle += 0.007;

        const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
        const radiusX = isMobile ? 112 : 132;
        const radiusY = isMobile ? 54 : 64;
        const centerYOffset = isMobile ? 8 : 12;

        badgeRefs.current.forEach((badge, index) => {
          if (!badge) return;

          // 5 badges evenly distributed (2 * PI / 5)
          const currentAngle = angle + (index * (2 * Math.PI)) / floatingSkills.length;
          const x = Math.cos(currentAngle) * radiusX;
          const y = Math.sin(currentAngle) * radiusY + centerYOffset;

          // 3D Depth layering:
          // When currentAngle is in bottom half (sin > 0), badge orbits IN FRONT of Mii (z-25)
          // When in top half (sin < 0), badge orbits BEHIND Mii (z-5)
          const sinVal = Math.sin(currentAngle);
          const depth = (sinVal + 1) / 2; // Range 0 to 1
          const scale = 0.84 + depth * 0.22; // Range 0.84 to 1.06
          const zIndex = sinVal > 0 ? 25 : 5;
          const opacity = 0.72 + depth * 0.28; // Range 0.72 to 1.0

          // IMPORTANT: Keep -50%, -50% center anchoring so badges orbit from their exact center!
          badge.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`;
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
      className={`relative flex flex-col items-center justify-center select-none py-4 ${className}`}
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
      <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-brand-ember/35 via-brand-coral/20 to-brand-amber/15 blur-3xl -z-10 pointer-events-none animate-soft-glow" />

      {/* Speech Bubble on Hover/Click */}
      <div
        className={`absolute -top-3 sm:-top-5 z-30 transition-all duration-300 transform ${
          hovered || clicked
            ? "opacity-100 scale-100 -translate-y-1"
            : "opacity-95 scale-95"
        }`}
      >
        <div className="relative px-4 py-1.5 rounded-2xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-brand-amber shadow-solid-sm text-xs font-mono font-bold text-brand-navy dark:text-white flex items-center gap-2 cursor-pointer">
          <span>{clicked ? "Available for Spring 2027 & May 2027 Roles" : "Hi, I'm Vansh"}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-surface-darkCard border-r-2 border-b-2 border-brand-navy dark:border-brand-amber rotate-45" />
        </div>
      </div>

      {/* Main Orbit Stage */}
      <div className="relative w-full max-w-[360px] h-[310px] sm:h-[340px] flex items-center justify-center overflow-visible">
        {/* Orbiting Skill Badges (Centered at 50%, 50%) */}
        {floatingSkills.map((skill, idx) => {
          const Icon = skill.icon;
          return (
            <div
              key={idx}
              ref={(el) => {
                badgeRefs.current[idx] = el;
              }}
              className="absolute left-1/2 top-1/2 will-change-transform pointer-events-auto cursor-pointer"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/95 dark:bg-surface-darkCard border-2 border-brand-navy dark:border-surface-darkBorder shadow-solid-sm ${skill.glow} text-[11px] font-mono font-bold text-brand-navy dark:text-gray-200 transition-all duration-200 hover:scale-110 hover:shadow-solid whitespace-nowrap`}
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
        <div className="relative z-10 w-52 h-68 sm:w-60 sm:h-76 flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer">
          <Image
            src="/images/mii-waving.png"
            alt="Vansh Mii Avatar Waving"
            width={320}
            height={380}
            priority
            className="w-full h-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.22)] dark:drop-shadow-[0_12px_28px_rgba(0,0,0,0.65)]"
          />
        </div>
      </div>
    </div>
  );
}
