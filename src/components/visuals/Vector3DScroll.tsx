"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Orbit, Compass, Zap } from "lucide-react";

interface Vector3DScrollProps {
  className?: string;
  size?: number;
  interactive?: boolean;
}

type VisualMode = "singularity" | "torus" | "gyroscope";

interface Particle3D {
  r: number;
  theta: number;
  yBase: number;
  speed: number;
  phase: number;
  size: number;
  colorIdx: number;
  freq: number;
}

export function Vector3DScroll({
  className = "",
  size = 460,
  interactive = true,
}: Vector3DScrollProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeMode, setActiveMode] = useState<VisualMode>("singularity");
  const [telemetry, setTelemetry] = useState({
    fps: 60,
    rotX: 24.2,
    rotY: 48.6,
    scrollDir: "IDLE" as "DOWN" | "UP" | "IDLE",
    velocity: "0 px/s",
  });

  const modeRef = useRef<VisualMode>(activeMode);
  useEffect(() => {
    modeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    // Intersection observer to pause rendering when scrolled out of viewport (saves phone battery)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    // Particle Cloud: 1,400 artistic luminescence particles
    const particleCount = 1400;
    const particles: Particle3D[] = [];
    const baseRadius = size * 0.38;

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution across spherical/toroidal shells
      const rRatio = Math.pow(Math.random(), 0.65);
      const r = baseRadius * (0.35 + rRatio * 1.1);
      const theta = Math.random() * Math.PI * 2;
      const yBase = (Math.random() - 0.5) * baseRadius * 1.2;
      const speed = (0.003 + Math.random() * 0.006) * (Math.random() > 0.4 ? 1 : -0.8);
      const phase = Math.random() * Math.PI * 2;
      const sizeP = Math.random() * 1.8 + 0.6;
      const colorIdx = Math.floor(Math.random() * 5); // 0: Cyan, 1: Violet, 2: Rose, 3: Gold, 4: Starlight
      const freq = Math.floor(Math.random() * 3) + 2;

      particles.push({
        r,
        theta,
        yBase,
        speed,
        phase,
        size: sizeP,
        colorIdx,
        freq,
      });
    }

    // Curated Artistic Color Palette (Phobos Cosmic Noir + Luminous Iridescence)
    const palette = [
      { r: 0, g: 245, b: 212 },   // Electric Turquoise/Cyan
      { r: 121, g: 40, b: 202 },  // Deep Royal Violet
      { r: 255, g: 0, b: 128 },   // Vivid Fuchsia/Magenta
      { r: 205, g: 141, b: 189 }, // Phobos Blush Rose
      { r: 255, g: 220, b: 120 }, // Starlight Amber
    ];

    // Mathematical Torus Knot Knots (p, q)
    const knotPoints = 320;
    const pVal = 3;
    const qVal = 4;

    // Dynamic Bidirectional Scroll Physics
    let scrollPos = typeof window !== "undefined" ? window.scrollY : 0;
    let targetScrollPos = scrollPos;
    let scrollVelocity = 0;
    let lastScrollY = scrollPos;

    let rotX = 0.45;
    let rotY = 0.2;
    let rotZ = 0.05;
    let targetRotX = rotX;
    let targetRotY = rotY;

    // Mouse & Touch Parallax / Direct Manipulation
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onScroll = () => {
      const nowY = window.scrollY;
      const deltaY = nowY - lastScrollY;
      lastScrollY = nowY;

      // Direct bidirectional coupling:
      // Scrolling DOWN (deltaY > 0) -> spins forward, expands wave resonance
      // Scrolling UP (deltaY < 0) -> immediately reverses rotation & wave resonance
      targetScrollPos += deltaY * 0.005;
      targetRotY += deltaY * 0.004;
      targetRotX += deltaY * 0.002;
      scrollVelocity = deltaY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Touch & Pointer handlers
    const onPointerDown = (clientX: number, clientY: number) => {
      if (!interactive) return;
      isDragging = true;
      startX = clientX;
      startY = clientY;
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      mouseX = (clientX / window.innerWidth - 0.5) * 0.4;
      mouseY = (clientY / window.innerHeight - 0.5) * 0.4;

      if (!isDragging) return;
      const dx = clientX - startX;
      const dy = clientY - startY;
      startX = clientX;
      startY = clientY;

      targetRotY += dx * 0.008;
      targetRotX -= dy * 0.008;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleMouseUp = () => onPointerUp();

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => onPointerUp();

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // 3D Perspective Projection with Camera Matrix
    const project = (
      x: number,
      y: number,
      z: number,
      rx: number,
      ry: number,
      rz: number,
      cx: number,
      cy: number,
      fov: number
    ) => {
      // Y-axis rotation
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY + z * sinY;
      const y1 = y;
      const z1 = -x * sinY + z * cosY;

      // X-axis rotation
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const x2 = x1;
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;

      // Z-axis rotation
      const cosZ = Math.cos(rz);
      const sinZ = Math.sin(rz);
      const x3 = x2 * cosZ - y2 * sinZ;
      const y3 = x2 * sinZ + y2 * cosZ;
      const z3 = z2;

      const scale = fov / (fov + z3);
      return {
        x2d: cx + x3 * scale,
        y2d: cy + y3 * scale,
        z: z3,
        scale,
      };
    };

    let frame = 0;
    let lastTime = performance.now();
    let fpsCounter = 60;

    // Main Render Loop
    const render = (time: number) => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      const deltaMs = time - lastTime;
      lastTime = time;
      frame++;

      if (frame % 15 === 0 && deltaMs > 0) {
        fpsCounter = Math.round(1000 / deltaMs);
        setTelemetry({
          fps: Math.min(fpsCounter, 60),
          rotX: parseFloat(((rotX * 180) / Math.PI % 360).toFixed(1)),
          rotY: parseFloat(((rotY * 180) / Math.PI % 360).toFixed(1)),
          scrollDir: scrollVelocity > 0.4 ? "DOWN" : scrollVelocity < -0.4 ? "UP" : "IDLE",
          velocity: `${Math.round(scrollVelocity * 10)} px/s`,
        });
      }

      // Smooth physics lerp for rotation & bidirectional scroll velocity
      scrollPos += (targetScrollPos - scrollPos) * 0.08;
      rotX += (targetRotX + mouseY * 0.4 - rotX) * 0.07;
      rotY += (targetRotY + mouseX * 0.4 - rotY) * 0.07;

      // Continuous ambient breathing drift
      targetRotY += 0.0018;
      rotZ = Math.sin(time * 0.0006) * 0.08;

      scrollVelocity *= 0.93;
      if (Math.abs(scrollVelocity) < 0.1) scrollVelocity = 0;

      // Resize Canvas dynamically
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || size;
      const height = rect.height || size;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 480;
      const currentMode = modeRef.current;

      // 1. Radiant Atmospheric Core Glow (Additive Shimmer)
      const corePulse = 1 + Math.sin(time * 0.002 + scrollPos * 4) * 0.12;
      const coreR = baseRadius * 0.42 * corePulse;

      const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 2.2);
      glowGrad.addColorStop(0, "rgba(0, 245, 212, 0.16)");
      glowGrad.addColorStop(0.3, "rgba(121, 40, 202, 0.12)");
      glowGrad.addColorStop(0.7, "rgba(255, 0, 128, 0.06)");
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.save();
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Artistic Mode Rendering
      if (currentMode === "singularity" || currentMode === "gyroscope") {
        // Render Orbital Harmonic Splines (Wave flux rings)
        const ringConfigs = [
          { r: baseRadius * 0.85, tilt: 0.35, color: "rgba(0, 245, 212, ALPHA)", speed: 1.2, harmonic: 4 },
          { r: baseRadius * 1.15, tilt: -0.6, color: "rgba(255, 0, 128, ALPHA)", speed: -0.9, harmonic: 5 },
          { r: baseRadius * 1.45, tilt: 0.9, color: "rgba(121, 40, 202, ALPHA)", speed: 0.7, harmonic: 6 },
          { r: baseRadius * 1.7, tilt: -0.2, color: "rgba(205, 141, 189, ALPHA)", speed: -0.5, harmonic: 3 },
        ];

        ringConfigs.forEach((rc, rIdx) => {
          const points = 72;
          ctx.beginPath();
          let firstPt = { x2d: 0, y2d: 0 };

          for (let k = 0; k <= points; k++) {
            const angle = (k / points) * Math.PI * 2;
            // Harmonic wave oscillation driven directly by scroll + time
            const wave = Math.sin(angle * rc.harmonic + time * 0.002 * rc.speed + scrollPos * 6) * (baseRadius * 0.07);
            const rEff = rc.r + wave;

            const x = Math.cos(angle) * rEff;
            const z = Math.sin(angle) * rEff;
            const y = Math.sin(angle) * Math.sin(rc.tilt) * (baseRadius * 0.45);

            const pt = project(x, y, z, rotX, rotY, rotZ, cx, cy, fov);

            if (k === 0) {
              ctx.moveTo(pt.x2d, pt.y2d);
              firstPt = pt;
            } else {
              ctx.lineTo(pt.x2d, pt.y2d);
            }
          }

          const avgAlpha = (0.28 + Math.sin(time * 0.001 + rIdx) * 0.08).toFixed(2);
          ctx.strokeStyle = rc.color.replace("ALPHA", avgAlpha);
          ctx.lineWidth = 1.3;
          ctx.stroke();
        });
      }

      if (currentMode === "torus") {
        // Render 3D Quantum Torus Knot Ribbon
        ctx.beginPath();
        const R_torus = baseRadius * 0.95;
        const r_torus = baseRadius * 0.4;
        let lastPt: { x2d: number; y2d: number; z: number } | null = null;

        for (let i = 0; i <= knotPoints; i++) {
          const t = (i / knotPoints) * Math.PI * 2;
          const thetaKnot = pVal * t + time * 0.001 + scrollPos * 4;
          const phiKnot = qVal * t;

          const rCurrent = R_torus + r_torus * Math.cos(phiKnot);
          const x = rCurrent * Math.cos(thetaKnot);
          const z = rCurrent * Math.sin(thetaKnot);
          const y = r_torus * Math.sin(phiKnot);

          const pt = project(x, y, z, rotX, rotY, rotZ, cx, cy, fov);

          if (i === 0) {
            ctx.moveTo(pt.x2d, pt.y2d);
          } else {
            ctx.lineTo(pt.x2d, pt.y2d);
          }
          lastPt = pt;
        }

        const gradTorus = ctx.createLinearGradient(cx - baseRadius, cy - baseRadius, cx + baseRadius, cy + baseRadius);
        gradTorus.addColorStop(0, "rgba(0, 245, 212, 0.7)");
        gradTorus.addColorStop(0.5, "rgba(121, 40, 202, 0.6)");
        gradTorus.addColorStop(1, "rgba(255, 0, 128, 0.7)");

        ctx.strokeStyle = gradTorus;
        ctx.lineWidth = 2.0;
        ctx.stroke();
      }

      // 3. Project & Sort Dynamic 3D Particle Cloud
      const projectedList: {
        x2d: number;
        y2d: number;
        z: number;
        size: number;
        color: typeof palette[0];
        alpha: number;
      }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Harmonic particle orbital motion + bidirectional scroll responsiveness
        const currentAngle = p.theta + p.speed * time * 0.15 + scrollPos * (p.speed > 0 ? 8 : -8);
        const waveY = Math.sin(currentAngle * p.freq + p.phase + time * 0.0018) * (baseRadius * 0.14);

        let x = Math.cos(currentAngle) * p.r;
        let z = Math.sin(currentAngle) * p.r;
        let y = p.yBase + waveY;

        if (currentMode === "gyroscope") {
          // Flatten into structured celestial gyroscope disk
          y *= 0.45;
        }

        const proj = project(x, y, z, rotX, rotY, rotZ, cx, cy, fov);

        // Depth-based transparency and scale
        const depthNorm = (proj.z + baseRadius * 1.5) / (baseRadius * 3);
        const alpha = Math.max(0.12, Math.min(0.95, depthNorm));
        const color = palette[p.colorIdx];

        projectedList.push({
          x2d: proj.x2d,
          y2d: proj.y2d,
          z: proj.z,
          size: p.size * proj.scale,
          color,
          alpha,
        });
      }

      // Sort back to front for beautiful atmospheric blending
      projectedList.sort((a, b) => a.z - b.z);

      // Render Particles with Optical Glow
      for (let i = 0; i < projectedList.length; i++) {
        const p = projectedList[i];
        const { r, g, b } = p.color;

        // Soft halo on larger front particles
        if (p.z > 0 && p.size > 1.3) {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(p.alpha * 0.35).toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(p.x2d, p.y2d, p.size * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Particle Core
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, Math.max(0.7, p.size), 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Subtle Event Horizon Singularity Center
      const coreFront = project(0, 0, 0, rotX, rotY, rotZ, cx, cy, fov);
      const coreInnerGrad = ctx.createRadialGradient(
        coreFront.x2d,
        coreFront.y2d,
        0,
        coreFront.x2d,
        coreFront.y2d,
        baseRadius * 0.18
      );
      coreInnerGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      coreInnerGrad.addColorStop(0.2, "rgba(0, 245, 212, 0.8)");
      coreInnerGrad.addColorStop(0.6, "rgba(121, 40, 202, 0.4)");
      coreInnerGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = coreInnerGrad;
      ctx.beginPath();
      ctx.arc(coreFront.x2d, coreFront.y2d, baseRadius * 0.18, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      observer.disconnect();
    };
  }, [interactive, size]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square max-w-[480px] mx-auto rounded-3xl bg-black/40 border border-white/[0.08] backdrop-blur-2xl p-4 overflow-hidden shadow-2xl group select-none ${className}`}
    >
      {/* Dynamic Background Aurora Glow */}
      <div className="absolute -top-14 -right-14 w-72 h-72 rounded-full bg-gradient-to-tr from-fuchsia-500/25 via-violet-600/25 to-transparent blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-14 -left-14 w-72 h-72 rounded-full bg-gradient-to-tr from-cyan-400/20 via-emerald-500/15 to-transparent blur-[90px] pointer-events-none" />

      {/* Top Header: Visual Presets & Live Telemetry */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2.5 mb-2 text-xs font-mono">
        {/* Preset Selector */}
        <div className="flex items-center gap-1 p-0.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <button
            type="button"
            onClick={() => setActiveMode("singularity")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              activeMode === "singularity"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
            title="Singularity Core: Gravitational wave vortex"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Singularity</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("torus")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              activeMode === "torus"
                ? "bg-violet-500/20 text-purple-300 border border-purple-500/30 shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
            title="Quantum Torus: Intertwined harmonic knot"
          >
            <Orbit className="w-3 h-3 text-purple-400" />
            <span>Torus</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("gyroscope")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              activeMode === "gyroscope"
                ? "bg-fuchsia-500/20 text-pink-300 border border-pink-500/30 shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
            title="Gyroscope: Orbital plane disk"
          >
            <Compass className="w-3 h-3 text-pink-400" />
            <span>Gyro</span>
          </button>
        </div>

        {/* Live Scroll Indicator */}
        <div className="flex items-center gap-2 text-[11px] text-text-muted">
          <span className="flex items-center gap-1 text-cyan-300 font-semibold">
            <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>{telemetry.scrollDir === "DOWN" ? "▼ SCROLL DOWN" : telemetry.scrollDir === "UP" ? "▲ SCROLL UP" : "⟳ DUAL-SCROLL"}</span>
          </span>
        </div>
      </div>

      {/* Main 3D Canvas */}
      <div className="relative w-full h-[calc(100%-80px)] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
          title="Scroll page in both directions or drag directly to rotate"
        />
      </div>

      {/* Bottom Technical Coordinates Bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-text-muted pt-2 border-t border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span>
            PITCH: <strong className="text-cyan-300">{telemetry.rotX}°</strong>
          </span>
          <span>
            YAW: <strong className="text-fuchsia-300">{telemetry.rotY}°</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text-muted/80 hidden sm:inline">1,400 Particles • 60 FPS • Dual-Scroll Physics</span>
          <span className="text-text-muted/80 sm:hidden">Dual-Scroll Physics</span>
        </div>
      </div>
    </div>
  );
}
