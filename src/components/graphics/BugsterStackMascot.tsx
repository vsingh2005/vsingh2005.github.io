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
        <ellipse cx="170" cy="250" rx="120" ry="18" fill="#062844" fillOpacity="0.1" />

        {/* Cable looping around */}
        <path
          d="M 60 220 C 40 250 110 260 160 240 C 220 220 280 260 300 230"
          stroke="#F9857D"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Mascot Body sitting down */}
        <path
          d="M 120 170 C 110 120 140 80 180 80 C 220 80 245 120 240 170 C 235 220 215 240 180 240 C 145 240 125 220 120 170 Z"
          fill="#048AF8"
          stroke="#062844"
          strokeWidth="3.5"
        />

        {/* Belly */}
        <path
          d="M 150 160 C 145 130 160 110 180 110 C 200 110 215 130 210 160 C 205 200 195 220 180 220 C 165 220 155 200 150 160 Z"
          fill="#C9D4A3"
          stroke="#062844"
          strokeWidth="2"
        />

        {/* Eyes (Focused on code screen) */}
        <ellipse cx="170" cy="105" rx="11" ry="14" fill="#FFFFFF" stroke="#062844" strokeWidth="2.5" />
        <circle cx="174" cy="107" r="5" fill="#062844" />
        <ellipse cx="194" cy="105" rx="11" ry="14" fill="#FFFFFF" stroke="#062844" strokeWidth="2.5" />
        <circle cx="198" cy="107" r="5" fill="#062844" />

        {/* Ears */}
        <path d="M 142 85 C 135 68 148 55 155 70 Z" fill="#048AF8" stroke="#062844" strokeWidth="2.5" />
        <path d="M 205 85 C 215 68 228 75 218 90 Z" fill="#048AF8" stroke="#062844" strokeWidth="2.5" />

        {/* Tail curled on left */}
        <path
          d="M 130 210 C 90 220 60 190 70 160 C 75 145 95 150 90 165 C 85 180 100 195 125 195 Z"
          fill="#048AF8"
          stroke="#062844"
          strokeWidth="3"
        />
        <path d="M 75 165 Q 85 175 80 185" stroke="#C9D4A3" strokeWidth="5" strokeLinecap="round" />

        {/* Laptop */}
        <g transform="translate(145, 170)">
          {/* Base */}
          <rect x="0" y="32" width="75" height="8" rx="2" fill="#E2E5DC" stroke="#062844" strokeWidth="2.5" />
          {/* Screen */}
          <rect x="10" y="0" width="55" height="34" rx="4" fill="#062844" stroke="#062844" strokeWidth="2.5" />
          {/* Terminal Screen content */}
          <rect x="13" y="3" width="49" height="28" rx="2" fill="#048AF8" />
          <path d="M 18 10 L 23 15 L 18 20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="27" y1="20" x2="36" y2="20" stroke="#C9D4A3" strokeWidth="2" strokeLinecap="round" />
          {/* Glowing cursor */}
          <circle cx="42" cy="20" r="1.5" fill="#FFFFFF" />
        </g>

        {/* Hands on Keyboard */}
        <ellipse cx="160" cy="202" rx="7" ry="5" fill="#048AF8" stroke="#062844" strokeWidth="2" />
        <ellipse cx="205" cy="202" rx="7" ry="5" fill="#048AF8" stroke="#062844" strokeWidth="2" />

        {/* Coffee Mug on the side */}
        <rect x="235" y="210" width="16" height="20" rx="3" fill="#F9857D" stroke="#062844" strokeWidth="2" />
        <path d="M 251 214 Q 257 220 251 226" stroke="#062844" strokeWidth="2" fill="none" />
        {/* Steam */}
        <path d="M 240 204 Q 242 198 240 192" stroke="#486073" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}
