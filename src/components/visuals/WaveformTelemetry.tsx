"use client";

import React, { useEffect, useRef, useState } from "react";
import { Activity, Zap } from "lucide-react";

interface WaveformTelemetryProps {
  className?: string;
  label?: string;
}

export function WaveformTelemetry({
  className = "",
  label = "QUANTUM WAVE OSCILLOSCOPE // |Ψ(t)|²",
}: WaveformTelemetryProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [freq, setFreq] = useState(4.8);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += isHovered ? 0.04 : 0.02;
      const width = (canvas.width = canvas.offsetWidth);
      const height = (canvas.height = canvas.offsetHeight);

      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      const step = 24;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center baseline
      ctx.strokeStyle = "rgba(0, 242, 254, 0.15)";
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Primary Wave (Cyan)
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#00F2FE";
      ctx.shadowColor = "#00F2FE";
      ctx.shadowBlur = 8;

      const centerY = height / 2;
      const amp1 = isHovered ? 28 : 20;

      for (let x = 0; x < width; x++) {
        // Multi-harmonic superposition
        const y =
          centerY +
          Math.sin(x * 0.025 + time * 2) * amp1 * Math.sin(time * 0.5) +
          Math.sin(x * 0.06 - time * 3) * (amp1 * 0.4);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Secondary Wave (Violet Harmonic)
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(180, 100, 255, 0.7)";
      ctx.shadowColor = "rgba(180, 100, 255, 0.8)";
      ctx.shadowBlur = 6;

      const amp2 = isHovered ? 20 : 14;
      for (let x = 0; x < width; x++) {
        const y =
          centerY +
          Math.cos(x * 0.035 - time * 1.5) * amp2 +
          Math.sin(x * 0.015 + time) * (amp2 * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Reset shadow
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  return (
    <div
      className={`relative rounded-xl bg-background-deep/90 border border-white/[0.08] p-4 overflow-hidden transition-all duration-300 hover:border-cyan-400/40 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] mb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-[11px] font-mono text-cyan-300 font-semibold tracking-wider">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-emerald-400" />
            <span>4.8 GHz</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="text-cyan-400 font-semibold">SIGNAL LOCK</span>
        </div>
      </div>

      {/* Real-time Oscilloscope Canvas */}
      <div className="relative w-full h-24">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Bottom Technical Ticker */}
      <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-[10px] font-mono text-text-muted">
        <span>PROB. DENSITY: 0.9842</span>
        <span className="text-accent-violet">PHASE: +0.412 rad</span>
        <span>STATUS: NOMINAL</span>
      </div>

      {/* Micro Crosshairs in Corners */}
      <div className="absolute top-1 left-1 text-white/20 text-[9px] font-mono">+</div>
      <div className="absolute top-1 right-1 text-white/20 text-[9px] font-mono">+</div>
      <div className="absolute bottom-1 left-1 text-white/20 text-[9px] font-mono">+</div>
      <div className="absolute bottom-1 right-1 text-white/20 text-[9px] font-mono">+</div>
    </div>
  );
}
