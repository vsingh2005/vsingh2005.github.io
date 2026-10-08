"use client";

import React from "react";

export function BackgroundAmbient() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 contain-strict">
      {/* High-Performance Native GPU Radial Gradients (Zero Filter / Zero Blend Overhead) */}

      {/* Top Hero Glow (Soft Violet / Cyan Aurora) */}
      <div
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[550px] opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(99, 102, 241, 0.45) 0%, rgba(6, 182, 212, 0.2) 45%, transparent 75%)",
        }}
      />

      {/* Mid-Page Floating Glow (Fuchsia / Violet) */}
      <div 
        className="absolute top-[35%] -left-[10%] w-[650px] h-[650px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(217, 70, 239, 0.4) 0%, rgba(139, 92, 246, 0.2) 40%, transparent 70%)",
        }}
      />

      {/* Mid-Page Floating Glow (Cyan / Emerald) */}
      <div 
        className="absolute top-[55%] -right-[10%] w-[700px] h-[700px] opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(6, 182, 212, 0.4) 0%, rgba(16, 185, 129, 0.15) 45%, transparent 70%)",
        }}
      />

      {/* Lower Section Glow */}
      <div 
        className="absolute bottom-[5%] left-[15%] w-[800px] h-[500px] opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.35) 0%, rgba(217, 70, 239, 0.15) 45%, transparent 70%)",
        }}
      />

      {/* Fine-grained Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
    </div>
  );
}
