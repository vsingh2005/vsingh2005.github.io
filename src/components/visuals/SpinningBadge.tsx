"use client";

import React from "react";
import { Sparkles, Terminal, Cpu } from "lucide-react";

interface SpinningBadgeProps {
  className?: string;
  size?: number;
  text?: string;
  icon?: "sparkles" | "terminal" | "cpu";
}

export function SpinningBadge({
  className = "",
  size = 140,
  text = "• QUANTUM ML • CLOUD SYSTEMS • EMBEDDED MECHATRONICS • RINGULARITY0 •",
  icon = "cpu",
}: SpinningBadgeProps) {
  const pathId = `circlePath-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Rotating SVG Ring with Circular Text */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full animate-[spin_40s_linear_infinite]"
      >
        <defs>
          <path
            id={pathId}
            d="M 100, 100 m -72, 0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
            fill="none"
          />
        </defs>

        {/* Subtle circular boundary lines */}
        <circle
          cx="100"
          cy="100"
          r="86"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <circle
          cx="100"
          cy="100"
          r="58"
          fill="none"
          stroke="rgba(0, 242, 254, 0.3)"
          strokeWidth="1"
        />

        <text
          fontSize="9.5"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="600"
          fill="rgba(255, 255, 255, 0.75)"
          letterSpacing="0.16em"
          className="uppercase"
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center Stationary Core */}
      <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/30 to-violet-600/30 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.3)]">
        {icon === "sparkles" && <Sparkles className="w-5 h-5 text-cyan-300" />}
        {icon === "terminal" && <Terminal className="w-5 h-5 text-cyan-300" />}
        {icon === "cpu" && <Cpu className="w-5 h-5 text-cyan-300 animate-pulse" />}
      </div>
    </div>
  );
}
