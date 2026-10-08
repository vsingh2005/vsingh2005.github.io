"use client";

import React, { useEffect, useRef } from "react";

export function BackgroundAmbient() {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;
    let isRunning = false;

    const updatePosition = () => {
      // Smooth interpolation (lerp) for liquid mouse tracking
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
      }

      // Check if motion has settled
      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        rafId = requestAnimationFrame(updatePosition);
      } else {
        isRunning = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      document.documentElement.style.setProperty("--mouse-x", `${targetX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${targetY}px`);

      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 contain-paint">
      {/* LINEARITY-INSPIRED MULTICOLORED BACKGROUND AURORA BLURS (Hardware-Accelerated) */}

      {/* Primary Hero Multicolored Aurora Cluster */}
      <div className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[850px] sm:w-[1100px] h-[550px] opacity-35 sm:opacity-45 mix-blend-screen blur-[70px] sm:blur-[90px] animate-pulse-slow pointer-events-none transform-gpu will-change-transform">
        <div className="absolute top-0 left-[10%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-violet-600 via-indigo-600 to-transparent" />
        <div className="absolute top-[20%] right-[15%] w-[420px] h-[420px] rounded-full bg-gradient-to-bl from-cyan-400 via-sky-500 to-transparent" />
        <div className="absolute bottom-0 left-[30%] w-[500px] h-[400px] rounded-full bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-transparent" />
        <div className="absolute -top-[10%] left-[45%] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 opacity-60" />
      </div>

      {/* Mid-Page Floating Gradient Blob (Fuchsia / Purple) */}
      <div 
        className="absolute top-[35%] -left-[15%] w-[600px] h-[600px] rounded-full blur-[80px] opacity-25 mix-blend-screen transform-gpu"
        style={{
          background: "radial-gradient(circle at center, rgba(236, 72, 153, 0.75) 0%, rgba(139, 92, 246, 0.35) 50%, transparent 75%)",
        }}
      />

      {/* Mid-Page Floating Gradient Blob (Cyan / Emerald) */}
      <div 
        className="absolute top-[55%] -right-[15%] w-[650px] h-[650px] rounded-full blur-[85px] opacity-25 mix-blend-screen transform-gpu"
        style={{
          background: "radial-gradient(circle at center, rgba(6, 182, 212, 0.75) 0%, rgba(16, 185, 129, 0.25) 50%, transparent 75%)",
        }}
      />

      {/* Lower Section Warm Violet/Blue Glow */}
      <div 
        className="absolute bottom-[5%] left-[20%] w-[750px] h-[450px] rounded-full blur-[80px] opacity-20 mix-blend-screen transform-gpu"
        style={{
          background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.65) 0%, rgba(217, 70, 239, 0.25) 50%, transparent 70%)",
        }}
      />

      {/* Interactive Mouse Spotlight Gradient (Hardware-Accelerated transform) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[80px] opacity-15 sm:opacity-20 mix-blend-screen will-change-transform pointer-events-none"
        style={{
          background: "radial-gradient(circle, #38BDF8 0%, #818CF8 50%, #C084FC 100%)",
          transform: "translate3d(-500px, -500px, 0)",
        }}
      />

      {/* Fine-grained Noise / Micro dot overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25" />
    </div>
  );
}
