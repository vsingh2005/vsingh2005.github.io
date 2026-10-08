"use client";

import React from "react";

export function BugsterHeroMascot({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 460 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[420px] drop-shadow-md"
      >
        {/* Soft Background Accent Pill / Shadow */}
        <ellipse cx="230" cy="320" rx="170" ry="24" fill="#C9D4A3" fillOpacity="0.45" />

        {/* Decorative Grid Floating Badges */}
        <g className="animate-float">
          {/* Top-Right Floating Inspection Card */}
          <rect x="290" y="40" width="130" height="74" rx="12" fill="#FFFFFF" stroke="#062844" strokeWidth="2.5" />
          <rect x="290" y="40" width="130" height="20" rx="12" fill="#062844" />
          <circle cx="304" cy="50" r="3.5" fill="#F9857D" />
          <circle cx="316" cy="50" r="3.5" fill="#C9D4A3" />
          <circle cx="328" cy="50" r="3.5" fill="#048AF8" />
          <text x="302" y="80" fill="#062844" fontFamily="monospace" fontSize="11" fontWeight="bold">
            aws_vpc: ok
          </text>
          <text x="302" y="98" fill="#048AF8" fontFamily="monospace" fontSize="10">
            latency: 1.4ms
          </text>
        </g>

        {/* Floating Code Snippet Tag */}
        <g transform="translate(40, 110)">
          <rect x="0" y="0" width="110" height="42" rx="10" fill="#C9D4A3" stroke="#062844" strokeWidth="2" />
          <text x="12" y="26" fill="#062844" fontFamily="monospace" fontSize="11" fontWeight="bold">
            &lt;SystemVerilog/&gt;
          </text>
        </g>

        {/* Floating Sparkles & Starlets */}
        <path
          d="M 120 45 L 123 55 L 133 58 L 123 61 L 120 71 L 117 61 L 107 58 L 117 55 Z"
          fill="#F9857D"
          stroke="#062844"
          strokeWidth="1.5"
        />
        <path
          d="M 390 190 L 392 197 L 399 199 L 392 201 L 390 208 L 388 201 L 381 199 L 388 197 Z"
          fill="#048AF8"
          stroke="#062844"
          strokeWidth="1.5"
        />

        {/* Tail (Striped Quirky Monster Tail) */}
        <path
          d="M 170 260 C 130 280 80 250 70 200 C 60 160 90 130 110 140 C 120 145 110 170 100 185 C 90 205 115 235 155 240 Z"
          fill="#048AF8"
          stroke="#062844"
          strokeWidth="3.5"
        />
        {/* Tail Stripes */}
        <path d="M 85 160 Q 95 175 90 190" stroke="#C9D4A3" strokeWidth="6" strokeLinecap="round" />
        <path d="M 95 210 Q 115 225 130 225" stroke="#C9D4A3" strokeWidth="6" strokeLinecap="round" />

        {/* Mascot Main Body (Quirky Blue Bugster Monster) */}
        <path
          d="M 160 210 C 150 140 190 90 245 90 C 300 90 330 140 325 210 C 320 280 290 310 240 310 C 190 310 170 270 160 210 Z"
          fill="#048AF8"
          stroke="#062844"
          strokeWidth="4"
        />

        {/* Mascot Belly Patch (Light Slate / Soft Aqua) */}
        <path
          d="M 195 190 C 190 150 210 130 240 130 C 270 130 285 150 280 190 C 275 240 260 275 235 275 C 210 275 200 230 195 190 Z"
          fill="#C9D4A3"
          stroke="#062844"
          strokeWidth="2.5"
        />

        {/* Belly Scales / Texture lines */}
        <path d="M 225 175 Q 240 180 255 175" stroke="#062844" strokeWidth="2" strokeLinecap="round" />
        <path d="M 222 205 Q 237 210 252 205" stroke="#062844" strokeWidth="2" strokeLinecap="round" />
        <path d="M 224 235 Q 239 240 250 235" stroke="#062844" strokeWidth="2" strokeLinecap="round" />

        {/* Big Expressive Cartoon Eyes */}
        {/* Left Eye */}
        <ellipse cx="225" cy="120" rx="16" ry="20" fill="#FFFFFF" stroke="#062844" strokeWidth="3" />
        <ellipse cx="230" cy="122" rx="7.5" ry="9.5" fill="#062844" />
        <circle cx="232" cy="118" r="2.5" fill="#FFFFFF" />

        {/* Right Eye */}
        <ellipse cx="258" cy="120" rx="16" ry="20" fill="#FFFFFF" stroke="#062844" strokeWidth="3" />
        <ellipse cx="262" cy="122" rx="7.5" ry="9.5" fill="#062844" />
        <circle cx="264" cy="118" r="2.5" fill="#FFFFFF" />

        {/* Cute Monster Horns / Ears */}
        <path
          d="M 188 98 C 180 75 195 60 205 75 Z"
          fill="#048AF8"
          stroke="#062844"
          strokeWidth="3"
        />
        <path
          d="M 275 98 C 290 75 305 85 292 105 Z"
          fill="#048AF8"
          stroke="#062844"
          strokeWidth="3"
        />

        {/* Snout / Smile */}
        <path
          d="M 235 142 Q 245 150 255 142"
          stroke="#062844"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left Arm (Resting on Hip) */}
        <path
          d="M 175 185 C 150 200 145 225 165 240"
          stroke="#062844"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 175 185 C 150 200 145 225 165 240"
          stroke="#048AF8"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Feet */}
        <ellipse cx="205" cy="308" rx="18" ry="10" fill="#048AF8" stroke="#062844" strokeWidth="3" />
        <ellipse cx="270" cy="308" rx="18" ry="10" fill="#048AF8" stroke="#062844" strokeWidth="3" />

        {/* Right Arm Holding Magnifying Glass */}
        <path
          d="M 295 195 C 320 200 340 180 345 160"
          stroke="#062844"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 295 195 C 320 200 340 180 345 160"
          stroke="#048AF8"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Magnifying Glass (Inspecting QA / Circuit Code) */}
        <g transform="translate(325, 115) rotate(18)">
          {/* Glass Handle */}
          <rect x="25" y="55" width="10" height="35" rx="4" fill="#F9857D" stroke="#062844" strokeWidth="2.5" />
          {/* Glass Rim */}
          <circle cx="30" cy="30" r="28" fill="#FFFFFF" fillOpacity="0.85" stroke="#062844" strokeWidth="3.5" />
          {/* Glare Reflection */}
          <path
            d="M 16 22 A 20 20 0 0 1 36 12"
            stroke="#048AF8"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Inspected Microchip inside lens */}
          <rect x="22" y="22" width="16" height="16" rx="3" fill="#C9D4A3" stroke="#062844" strokeWidth="2" />
          <circle cx="30" cy="30" r="3" fill="#048AF8" />
        </g>
      </svg>
    </div>
  );
}
