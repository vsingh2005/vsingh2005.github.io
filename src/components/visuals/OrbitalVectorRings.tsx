"use client";

import React from "react";

interface OrbitalVectorRingsProps {
  className?: string;
  size?: number;
}

export function OrbitalVectorRings({ className = "", size = 500 }: OrbitalVectorRingsProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width: "100%", maxWidth: size, aspectRatio: "1/1" }}
    >
      <svg
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible opacity-90"
      >
        <defs>
          <radialGradient id="artisticGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#CD8DBD" stopOpacity="0.08" />
            <stop offset="60%" stopColor="#7000FF" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft, warm background glow */}
        <circle cx="400" cy="400" r="380" fill="url(#artisticGlow)" />

        {/* Outer Ring: Delicate technical dashes (120s counter-clockwise) */}
        <g className="origin-center animate-[spin_120s_linear_infinite_reverse]">
          <circle
            cx="400"
            cy="400"
            r="380"
            stroke="rgba(237, 223, 238, 0.18)"
            strokeWidth="1"
            strokeDasharray="1.5 10"
            style={{ vectorEffect: "non-scaling-stroke" }}
          />

          {/* Minimal cardinal tick markers */}
          {[0, 90, 180, 270].map((deg) => (
            <g key={`deg-${deg}`} transform={`rotate(${deg} 400 400)`}>
              <line x1="400" y1="14" x2="400" y2="26" stroke="#CD8DBD" strokeWidth="1.5" />
              <circle cx="400" cy="30" r="1.5" fill="#EDDFEE" />
            </g>
          ))}
        </g>

        {/* Middle Ring: Blueprint arcs (80s clockwise) */}
        <g className="origin-center animate-[spin_80s_linear_infinite]">
          <circle
            cx="400"
            cy="400"
            r="290"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="1.2"
            strokeDasharray="2 8"
            style={{ vectorEffect: "non-scaling-stroke" }}
          />
          {/* Subtle blush accent arcs */}
          <circle
            cx="400"
            cy="400"
            r="290"
            stroke="#CD8DBD"
            strokeWidth="1.8"
            strokeDasharray="60 340"
            strokeOpacity="0.65"
            style={{ vectorEffect: "non-scaling-stroke" }}
          />
          <circle
            cx="400"
            cy="400"
            r="290"
            stroke="#EDDFEE"
            strokeWidth="1.5"
            strokeDasharray="30 370"
            strokeDashoffset="180"
            strokeOpacity="0.5"
            style={{ vectorEffect: "non-scaling-stroke" }}
          />
        </g>

        {/* Inner Ring: Fine orbital boundary (50s counter-clockwise) */}
        <g className="origin-center animate-[spin_50s_linear_infinite_reverse]">
          <circle
            cx="400"
            cy="400"
            r="210"
            stroke="rgba(237, 223, 238, 0.2)"
            strokeWidth="1"
            strokeDasharray="1 6"
            style={{ vectorEffect: "non-scaling-stroke" }}
          />
          {/* Tri-point satellite dots */}
          {[0, 120, 240].map((deg) => (
            <g key={`sat-${deg}`} transform={`rotate(${deg} 400 400)`}>
              <circle cx="400" cy="190" r="2.5" fill="#CD8DBD" />
              <circle cx="400" cy="190" r="6" stroke="rgba(205, 141, 189, 0.3)" strokeWidth="1" />
            </g>
          ))}
        </g>

        {/* Static center crosshairs */}
        <g stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1">
          <line x1="370" y1="400" x2="390" y2="400" />
          <line x1="410" y1="400" x2="430" y2="400" />
          <line x1="400" y1="370" x2="400" y2="390" />
          <line x1="400" y1="410" x2="400" y2="430" />
          <circle cx="400" cy="400" r="3" fill="rgba(237, 223, 238, 0.4)" />
        </g>
      </svg>
    </div>
  );
}
