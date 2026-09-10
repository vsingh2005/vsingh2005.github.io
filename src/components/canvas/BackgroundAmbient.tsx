"use client";

import React, { useEffect, useState } from "react";

export function BackgroundAmbient() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* LINEARITY-INSPIRED MULTICOLORED BACKGROUND AURORA BLURS */}

      {/* Primary Hero Multicolored Aurora Cluster */}
      <div className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[850px] sm:w-[1100px] h-[550px] opacity-35 sm:opacity-45 mix-blend-screen blur-[120px] sm:blur-[150px] animate-pulse-slow pointer-events-none">
        <div className="absolute top-0 left-[10%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-violet-600 via-indigo-600 to-transparent" />
        <div className="absolute top-[20%] right-[15%] w-[420px] h-[420px] rounded-full bg-gradient-to-bl from-cyan-400 via-sky-500 to-transparent" />
        <div className="absolute bottom-0 left-[30%] w-[500px] h-[400px] rounded-full bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-transparent" />
        <div className="absolute -top-[10%] left-[45%] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 opacity-60" />
      </div>

      {/* Mid-Page Floating Gradient Blob (Fuchsia / Purple) */}
      <div 
        className="absolute top-[35%] -left-[15%] w-[650px] h-[650px] rounded-full blur-[160px] opacity-25 mix-blend-screen"
        style={{
          background: "radial-gradient(circle at center, rgba(236, 72, 153, 0.8) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 75%)",
        }}
      />

      {/* Mid-Page Floating Gradient Blob (Cyan / Emerald) */}
      <div 
        className="absolute top-[55%] -right-[15%] w-[700px] h-[700px] rounded-full blur-[170px] opacity-25 mix-blend-screen"
        style={{
          background: "radial-gradient(circle at center, rgba(6, 182, 212, 0.8) 0%, rgba(16, 185, 129, 0.3) 50%, transparent 75%)",
        }}
      />

      {/* Lower Section Warm Violet/Blue Glow */}
      <div 
        className="absolute bottom-[5%] left-[20%] w-[800px] h-[500px] rounded-full blur-[160px] opacity-20 mix-blend-screen"
        style={{
          background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.7) 0%, rgba(217, 70, 239, 0.3) 50%, transparent 70%)",
        }}
      />

      {/* Interactive Mouse Spotlight Gradient (Follows cursor smoothly) */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 sm:opacity-20 transition-transform duration-500 ease-out mix-blend-screen"
        style={{
          background: "radial-gradient(circle, #38BDF8 0%, #818CF8 50%, #C084FC 100%)",
          left: `${mousePosition.x - 250}px`,
          top: `${mousePosition.y - 250}px`,
        }}
      />

      {/* Fine-grained Noise / Micro dot overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25" />
    </div>
  );
}
