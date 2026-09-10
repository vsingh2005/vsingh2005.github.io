"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface OrbitalVectorRingsProps {
  className?: string;
  size?: number;
}

export function OrbitalVectorRings({ className = "", size = 600 }: OrbitalVectorRingsProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width: "100%", maxWidth: size, aspectRatio: "1/1" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.12" />
            <stop offset="70%" stopColor="#7000FF" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cyanVioletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#7000FF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FF007A" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="radarSweep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00F2FE" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Center Glow */}
        <circle cx="400" cy="400" r="380" fill="url(#ringGlow)" />

        {/* --- OUTER RING (orbRing0 - Counter-Clockwise) --- */}
        <g className="origin-center animate-[spin_120s_linear_infinite_reverse]">
          <circle
            cx="400"
            cy="400"
            r="380"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.2"
            strokeDasharray="2 12"
            style={{ vectorEffect: "non-scaling-stroke" }}
          />
          <circle
            cx="400"
            cy="400"
            r="380"
            stroke="rgba(0, 242, 254, 0.4)"
            strokeWidth="2"
            strokeDasharray="40 180"
            style={{ vectorEffect: "non-scaling-stroke" }}
          />

          {/* Coordinate Ticks on Outer Ring */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <g key={`tick-${deg}`} transform={`rotate(${deg} 400 400)`}>
              <line x1="400" y1="12" x2="400" y2="28" stroke="rgba(0, 242, 254, 0.6)" strokeWidth="1.5" />
              <circle cx="400" cy="32" r="1.5" fill="#00F2FE" />
              <text
                x="400"
                y="8"
                fill="rgba(255, 255, 255, 0.35)"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                textAnchor="middle"
                className="tracking-widest select-none"
              >
                {deg.toString().padStart(3, "0")}°
              </text>
            </g>
          ))}
        </g>

        {/* --- MIDDLE RING (orbRing1 - Clockwise) --- */}
        <g className="origin-center animate-[spin_80s_linear_infinite]">
          <circle
            cx="400"
            cy="400"
            r="290"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            style={{ vectorEffect: "non-scaling-stroke" }}
          />
          {/* Accent Arc Segments */}
          <circle
            cx="400"
            cy="400"
            r="290"
            stroke="url(#cyanVioletGrad)"
            strokeWidth="2.5"
            strokeDasharray="90 320"
            style={{ vectorEffect: "non-scaling-stroke" }}
          />

          {/* Telemetry Labels around middle ring */}
          <text
            x="400"
            y="102"
            fill="rgba(0, 242, 254, 0.7)"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
            textAnchor="middle"
            letterSpacing="0.2em"
          >
            SYS.QUANTUM // |Ψ⟩ = α|0⟩ + β|1⟩
          </text>
          <text
            x="400"
            y="706"
            fill="rgba(255, 255, 255, 0.4)"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
            textAnchor="middle"
            letterSpacing="0.2em"
          >
            FREQ: 4.80GHz • LAT: 42.3868°N
          </text>

          {/* Crosshair marks */}
          <line x1="100" y1="400" x2="120" y2="400" stroke="#7000FF" strokeWidth="2" />
          <line x1="680" y1="400" x2="700" y2="400" stroke="#7000FF" strokeWidth="2" />
          <line x1="400" y1="100" x2="400" y2="120" stroke="#7000FF" strokeWidth="2" />
          <line x1="400" y1="680" x2="400" y2="700" stroke="#7000FF" strokeWidth="2" />
        </g>

        {/* --- INNER RING (orbRing2 - Counter-Clockwise Fast) --- */}
        <g className="origin-center animate-[spin_50s_linear_infinite_reverse]">
          <circle
            cx="400"
            cy="400"
            r="200"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.2"
            strokeDasharray="1.5 6"
            style={{ vectorEffect: "non-scaling-stroke" }}
          />
          <circle
            cx="400"
            cy="400"
            r="200"
            stroke="#00F2FE"
            strokeWidth="2"
            strokeDasharray="30 120"
            style={{ vectorEffect: "non-scaling-stroke" }}
          />

          {/* Inner Tri-Point Satellite Nodes */}
          {[0, 120, 240].map((angle) => (
            <g key={`sat-${angle}`} transform={`rotate(${angle} 400 400)`}>
              <circle cx="400" cy="200" r="4" fill="#00F2FE" />
              <circle cx="400" cy="200" r="8" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="1" />
              <line x1="400" y1="185" x2="400" y2="215" stroke="rgba(0, 242, 254, 0.5)" strokeWidth="1" />
            </g>
          ))}
        </g>

        {/* --- RADAR SWEEP LINE (Smooth Rotation) --- */}
        <g className="origin-center animate-[spin_12s_linear_infinite]">
          <line
            x1="400"
            y1="400"
            x2="400"
            y2="30"
            stroke="url(#radarSweep)"
            strokeWidth="2"
          />
          <circle cx="400" cy="30" r="3" fill="#00F2FE" filter="drop-shadow(0 0 6px #00F2FE)" />
        </g>

        {/* --- CENTER TARGET RETICLE --- */}
        <g>
          <circle cx="400" cy="400" r="6" fill="#00F2FE" fillOpacity="0.8" />
          <circle cx="400" cy="400" r="14" stroke="rgba(0, 242, 254, 0.5)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="380" y1="400" x2="420" y2="400" stroke="rgba(0, 242, 254, 0.6)" strokeWidth="1" />
          <line x1="400" y1="380" x2="400" y2="420" stroke="rgba(0, 242, 254, 0.6)" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
