"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface SpinningBadgeProps {
  className?: string;
  size?: number;
  text?: string;
}

export function SpinningBadge({
  className = "",
  size = 140,
  text = "• COMPUTER ENGINEERING • SYSTEMS ARCHITECTURE • CLOUD INFRASTRUCTURE • MECHATRONICS •",
}: SpinningBadgeProps) {
  const pathId = `circlePath-artistic`;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Rotating SVG Ring with Circular Text */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full animate-[spin_45s_linear_infinite]"
      >
        <defs>
          <path
            id={pathId}
            d="M 100, 100 m -74, 0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
            fill="none"
          />
        </defs>

        {/* Delicate boundary lines */}
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="rgba(237, 223, 238, 0.12)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke="rgba(205, 141, 189, 0.25)"
          strokeWidth="1"
        />

        <text
          fontSize="9"
          fontFamily="var(--font-mono), monospace"
          fontWeight="500"
          fill="rgba(237, 223, 238, 0.7)"
          letterSpacing="0.18em"
          className="uppercase"
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center Stationary Core */}
      <div className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center">
        <span className="text-xs font-mono text-text-secondary">05</span>
      </div>
    </div>
  );
}
