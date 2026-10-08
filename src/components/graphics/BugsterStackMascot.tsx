"use client";

import React from "react";

export function BugsterStackMascot({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 340 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[280px]"
      >
        {/* Soft shadow base */}
        <ellipse cx="170" cy="252" rx="120" ry="16" fill="#18181B" fillOpacity="0.12" />

        {/* Cable looping around (Ember) */}
        <path
          d="M 60 220 C 40 250 110 260 160 240 C 220 220 280 260 300 230"
          stroke="#FF5722"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* ============================================================== */}
        {/* BUSHY CURLED FOX TAIL ON THE LEFT */}
        {/* ============================================================== */}
        <path
          d="M 130 215 
             C 85 230, 50 200, 58 165 
             C 65 135, 95 140, 92 165 
             C 88 185, 105 195, 130 198 Z"
          fill="#FF5722"
          stroke="#18181B"
          strokeWidth="3"
        />
        {/* Tail Cream Fluff Tip */}
        <path
          d="M 58 165 
             C 65 135, 95 140, 92 165 
             C 84 160, 78 168, 70 162 Z"
          fill="#FEF3C7"
          stroke="#18181B"
          strokeWidth="2"
        />
        <path d="M 72 178 Q 82 188 78 198" stroke="#FFB020" strokeWidth="3" strokeLinecap="round" />

        {/* ============================================================== */}
        {/* ANIMAL BODY (Sitting posture) */}
        {/* ============================================================== */}
        <path
          d="M 125 175 
             C 115 125, 140 85, 180 85 
             C 220 85, 245 125, 240 175 
             C 235 225, 215 242, 180 242 
             C 145 242, 125 225, 125 175 Z"
          fill="#FF5722"
          stroke="#18181B"
          strokeWidth="3.5"
        />

        {/* Fluffy Chest Ruff (Cream) */}
        <path
          d="M 152 165 
             C 148 135, 162 115, 180 115 
             C 198 115, 212 135, 208 165 
             C 204 200, 195 222, 180 222 
             C 165 222, 156 200, 152 165 Z"
          fill="#FEF3C7"
          stroke="#18181B"
          strokeWidth="2"
        />

        {/* ============================================================== */}
        {/* EARS (Pointed fox ears with dark tips & cream inner fluff) */}
        {/* ============================================================== */}
        {/* Left Ear */}
        <path d="M 145 92 L 130 52 C 142 50, 162 68, 160 85 Z" fill="#FF5722" stroke="#18181B" strokeWidth="2.5" />
        <path d="M 135 64 L 130 52 C 137 51, 145 57, 148 64 Z" fill="#18181B" />
        <path d="M 142 84 L 136 62 C 144 64, 152 75, 153 82 Z" fill="#FEF3C7" />

        {/* Right Ear */}
        <path d="M 200 85 C 198 68, 218 50, 230 52 L 215 92 Z" fill="#FF5722" stroke="#18181B" strokeWidth="2.5" />
        <path d="M 212 64 C 215 57, 223 51, 230 52 L 225 64 Z" fill="#18181B" />
        <path d="M 207 82 C 208 75, 216 64, 224 62 L 218 84 Z" fill="#FEF3C7" />

        {/* Animal Cheek Tufts */}
        <path d="M 130 118 Q 120 125 128 135" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
        <path d="M 230 118 Q 240 125 232 135" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />

        {/* Cute Animal Eyes (Focused intently on screen) */}
        <ellipse cx="168" cy="112" rx="9" ry="12" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.5" />
        <circle cx="171" cy="114" r="5" fill="#18181B" />
        <circle cx="173" cy="111" r="1.5" fill="#FFFFFF" />

        <ellipse cx="192" cy="112" rx="9" ry="12" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.5" />
        <circle cx="189" cy="114" r="5" fill="#18181B" />
        <circle cx="191" cy="111" r="1.5" fill="#FFFFFF" />

        {/* Cute Nose and Whiskers */}
        <circle cx="180" cy="125" r="2.5" fill="#18181B" />
        <path d="M 177 129 Q 180 132 183 129" stroke="#18181B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Whiskers */}
        <line x1="162" y1="126" x2="148" y2="124" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="163" y1="130" x2="150" y2="132" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="198" y1="126" x2="212" y2="124" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="197" y1="130" x2="210" y2="132" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" />

        {/* ============================================================== */}
        {/* LAPTOP & WORKSTATION */}
        {/* ============================================================== */}
        <g transform="translate(145, 172)">
          {/* Base */}
          <rect x="0" y="30" width="75" height="8" rx="2" fill="#E4E4E7" stroke="#18181B" strokeWidth="2.5" />
          {/* Screen frame */}
          <rect x="10" y="0" width="55" height="32" rx="4" fill="#18181B" stroke="#18181B" strokeWidth="2.5" />
          {/* Terminal Screen content */}
          <rect x="13" y="3" width="49" height="26" rx="2" fill="#18181B" />
          <path d="M 18 10 L 23 15 L 18 20" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="27" y1="20" x2="38" y2="20" stroke="#FFB020" strokeWidth="2" strokeLinecap="round" />
          {/* Glowing cursor */}
          <circle cx="43" cy="20" r="1.5" fill="#FFFFFF" />
        </g>

        {/* Paws on Keyboard (Charcoal mitts) */}
        <ellipse cx="160" cy="204" rx="7" ry="5" fill="#18181B" stroke="#18181B" strokeWidth="1.5" />
        <ellipse cx="205" cy="204" rx="7" ry="5" fill="#18181B" stroke="#18181B" strokeWidth="1.5" />

        {/* Coffee Mug on the side (Ember with steam) */}
        <rect x="235" y="212" width="16" height="20" rx="3" fill="#FF5722" stroke="#18181B" strokeWidth="2" />
        <path d="M 251 216 Q 257 222 251 228" stroke="#18181B" strokeWidth="2" fill="none" />
        {/* Steam */}
        <path d="M 240 206 Q 242 200 240 194" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}
