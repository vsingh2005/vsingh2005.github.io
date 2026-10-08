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
        <ellipse cx="230" cy="322" rx="170" ry="22" fill="#FFB020" fillOpacity="0.22" />

        {/* Decorative Floating Badges */}
        <g className="animate-float">
          {/* Top-Right Floating Inspection Card */}
          <rect x="295" y="35" width="130" height="74" rx="12" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.5" />
          <rect x="295" y="35" width="130" height="20" rx="12" fill="#18181B" />
          <circle cx="309" cy="45" r="3.5" fill="#FF5722" />
          <circle cx="321" cy="45" r="3.5" fill="#FFB020" />
          <circle cx="333" cy="45" r="3.5" fill="#2563EB" />
          <text x="307" y="75" fill="#18181B" fontFamily="monospace" fontSize="11" fontWeight="bold">
            aws_vpc: ok
          </text>
          <text x="307" y="93" fill="#2563EB" fontFamily="monospace" fontSize="10">
            latency: 1.4ms
          </text>
        </g>

        {/* Floating Code Snippet Tag */}
        <g transform="translate(35, 105)">
          <rect x="0" y="0" width="112" height="40" rx="10" fill="#FEF3C7" stroke="#18181B" strokeWidth="2" />
          <text x="12" y="25" fill="#18181B" fontFamily="monospace" fontSize="11" fontWeight="bold">
            &lt;SystemVerilog/&gt;
          </text>
        </g>

        {/* Floating Sparkles & Starlets */}
        <path
          d="M 120 40 L 123 50 L 133 53 L 123 56 L 120 66 L 117 56 L 107 53 L 117 50 Z"
          fill="#FF5722"
          stroke="#18181B"
          strokeWidth="1.5"
        />
        <path
          d="M 390 185 L 392 192 L 399 194 L 392 196 L 390 203 L 388 196 L 381 194 L 388 192 Z"
          fill="#FFB020"
          stroke="#18181B"
          strokeWidth="1.5"
        />

        {/* ============================================================== */}
        {/* BUSHY ANIMAL TAIL (Fox / Red Panda tail curling up to the left) */}
        {/* ============================================================== */}
        {/* Main Tail Base (Ember) */}
        <path
          d="M 175 255 
             C 125 285, 60 260, 50 195 
             C 42 145, 80 100, 120 115 
             C 140 122, 145 150, 130 170 
             C 115 190, 85 195, 95 220 
             C 105 245, 140 245, 175 235 Z"
          fill="#FF5722"
          stroke="#18181B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Tail Fluffy Tip (Cream) */}
        <path
          d="M 85 145 
             C 80 100, 120 115, 120 115 
             C 140 122, 145 150, 130 170 
             C 120 162, 115 170, 105 160 
             C 98 165, 92 155, 85 145 Z"
          fill="#FEF3C7"
          stroke="#18181B"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Tail Fur Streaks */}
        <path d="M 75 190 Q 90 205 85 220" stroke="#FFB020" strokeWidth="3" strokeLinecap="round" />
        <path d="M 105 230 Q 125 240 145 235" stroke="#FFB020" strokeWidth="3" strokeLinecap="round" />

        {/* ============================================================== */}
        {/* ANIMAL EARS (Perked Fox / Red Panda Ears) */}
        {/* ============================================================== */}
        {/* Left Ear Outer */}
        <path
          d="M 188 110 L 165 42 C 180 40, 215 65, 222 92 Z"
          fill="#FF5722"
          stroke="#18181B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Left Ear Charcoal Tip */}
        <path
          d="M 172 60 L 165 42 C 172 41, 185 48, 192 58 Z"
          fill="#18181B"
        />
        {/* Left Ear Inner Fluff (Cream) */}
        <path
          d="M 185 98 L 176 58 C 188 60, 204 78, 208 92 Z"
          fill="#FEF3C7"
        />

        {/* Right Ear Outer */}
        <path
          d="M 268 92 C 275 65, 310 40, 325 42 L 302 110 Z"
          fill="#FF5722"
          stroke="#18181B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Right Ear Charcoal Tip */}
        <path
          d="M 298 58 C 305 48, 318 41, 325 42 L 318 60 Z"
          fill="#18181B"
        />
        {/* Right Ear Inner Fluff (Cream) */}
        <path
          d="M 282 92 C 286 78, 302 60, 314 58 L 305 98 Z"
          fill="#FEF3C7"
        />

        {/* ============================================================== */}
        {/* ANIMAL BODY (Sitting Torso & Shoulders) */}
        {/* ============================================================== */}
        <path
          d="M 165 200 
             C 155 150, 180 120, 245 120 
             C 310 120, 335 150, 325 200 
             C 320 270, 295 308, 245 308 
             C 195 308, 170 270, 165 200 Z"
          fill="#FF5722"
          stroke="#18181B"
          strokeWidth="3.5"
        />

        {/* Fluffy Chest Ruff / Bib (Cream) */}
        <path
          d="M 205 180 
             C 195 150, 215 138, 245 138 
             C 275 138, 295 150, 285 180 
             C 280 230, 268 275, 245 275 
             C 222 275, 210 230, 205 180 Z"
          fill="#FEF3C7"
          stroke="#18181B"
          strokeWidth="2.5"
        />
        {/* Chest Fur Tufts Accent Lines */}
        <path d="M 235 185 Q 245 192 255 185" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
        <path d="M 232 215 Q 245 222 258 215" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
        <path d="M 236 242 Q 245 248 254 242" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />

        {/* ============================================================== */}
        {/* ANIMAL HEAD (Cute Fox / Cat / Red Panda Silhouette) */}
        {/* ============================================================== */}
        {/* Head Contour with Cheek Fur Tufts */}
        <path
          d="M 178 125 
             C 168 115, 175 95, 215 88 
             C 245 84, 275 88, 305 95 
             C 322 100, 322 115, 312 125 
             C 328 138, 332 158, 315 172 
             C 295 188, 280 190, 245 190 
             C 210 190, 195 188, 175 172 
             C 158 158, 162 138, 178 125 Z"
          fill="#FF5722"
          stroke="#18181B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Cream Cheek Fur & Muzzle Patch */}
        <path
          d="M 195 142 
             C 185 152, 185 168, 202 174 
             C 220 180, 270 180, 288 174 
             C 305 168, 305 152, 295 142 
             C 275 158, 215 158, 195 142 Z"
          fill="#FEF3C7"
          stroke="#18181B"
          strokeWidth="2"
        />

        {/* Cute Animal Button Nose (Charcoal) */}
        <path
          d="M 240 148 C 238 144, 252 144, 250 148 C 248 153, 242 153, 240 148 Z"
          fill="#18181B"
        />
        {/* Nose Highlight */}
        <circle cx="243" cy="147" r="1" fill="#FFFFFF" />

        {/* Cute Muzzle / Mouth (w-shape smile) */}
        <path
          d="M 237 155 Q 245 160 245 152 Q 245 160 253 155"
          stroke="#18181B"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Whiskers */}
        {/* Left Whiskers */}
        <path d="M 190 152 Q 165 148 148 150" stroke="#18181B" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 192 160 Q 168 162 150 166" stroke="#18181B" strokeWidth="1.8" strokeLinecap="round" />
        {/* Right Whiskers */}
        <path d="M 300 152 Q 325 148 342 150" stroke="#18181B" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 298 160 Q 322 162 340 166" stroke="#18181B" strokeWidth="1.8" strokeLinecap="round" />

        {/* ============================================================== */}
        {/* EXPRESSIVE EYES (Alert, intelligent animal gaze) */}
        {/* ============================================================== */}
        {/* Left Eye */}
        <ellipse cx="224" cy="125" rx="14" ry="18" fill="#FFFFFF" stroke="#18181B" strokeWidth="3" />
        <ellipse cx="228" cy="126" rx="8" ry="10" fill="#18181B" />
        <circle cx="230" cy="122" r="3" fill="#FFFFFF" />
        <circle cx="225" cy="130" r="1.5" fill="#FFFFFF" />

        {/* Right Eye */}
        <ellipse cx="266" cy="125" rx="14" ry="18" fill="#FFFFFF" stroke="#18181B" strokeWidth="3" />
        <ellipse cx="264" cy="126" rx="8" ry="10" fill="#18181B" />
        <circle cx="266" cy="122" r="3" fill="#FFFFFF" />
        <circle cx="261" cy="130" r="1.5" fill="#FFFFFF" />

        {/* Cute Eyebrow Dots */}
        <ellipse cx="218" cy="100" rx="4" ry="3" fill="#FEF3C7" />
        <ellipse cx="272" cy="100" rx="4" ry="3" fill="#FEF3C7" />

        {/* ============================================================== */}
        {/* LIMBS & PAWS (Holding Magnifying Glass) */}
        {/* ============================================================== */}
        {/* Left Arm / Paw (Resting gently against hip) */}
        <path
          d="M 180 185 C 160 200 155 225 175 240"
          stroke="#18181B"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 180 185 C 160 200 155 225 175 240"
          stroke="#FF5722"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left Paw Mitt (Charcoal sock) */}
        <circle cx="175" cy="240" r="6" fill="#18181B" />

        {/* Hind Paws (Sitting flat) */}
        <ellipse cx="210" cy="308" rx="16" ry="9" fill="#18181B" stroke="#18181B" strokeWidth="2" />
        <circle cx="205" cy="308" r="2" fill="#FEF3C7" />
        <circle cx="210" cy="306" r="2" fill="#FEF3C7" />
        <circle cx="215" cy="308" r="2" fill="#FEF3C7" />

        <ellipse cx="275" cy="308" rx="16" ry="9" fill="#18181B" stroke="#18181B" strokeWidth="2" />
        <circle cx="270" cy="308" r="2" fill="#FEF3C7" />
        <circle cx="275" cy="306" r="2" fill="#FEF3C7" />
        <circle cx="280" cy="308" r="2" fill="#FEF3C7" />

        {/* Right Arm (Reaching forward with magnifying glass) */}
        <path
          d="M 295 195 C 318 200 338 180 345 160"
          stroke="#18181B"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 295 195 C 318 200 338 180 345 160"
          stroke="#FF5722"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right Paw gripping handle */}
        <circle cx="345" cy="160" r="6.5" fill="#18181B" />

        {/* Magnifying Glass (Inspecting QA / Microchip) */}
        <g transform="translate(325, 115) rotate(18)">
          {/* Glass Handle */}
          <rect x="25" y="55" width="10" height="35" rx="4" fill="#FF5722" stroke="#18181B" strokeWidth="2.5" />
          {/* Glass Rim */}
          <circle cx="30" cy="30" r="28" fill="#FFFFFF" fillOpacity="0.85" stroke="#18181B" strokeWidth="3.5" />
          {/* Glare Reflection */}
          <path
            d="M 16 22 A 20 20 0 0 1 36 12"
            stroke="#2563EB"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Inspected Microchip inside lens */}
          <rect x="22" y="22" width="16" height="16" rx="3" fill="#FEF3C7" stroke="#18181B" strokeWidth="2" />
          <circle cx="30" cy="30" r="3" fill="#FF5722" />
        </g>
      </svg>
    </div>
  );
}
