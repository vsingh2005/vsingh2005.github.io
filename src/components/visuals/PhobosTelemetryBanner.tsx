"use client";

import React from "react";
import { SpinningBadge } from "./SpinningBadge";
import { Radio, ShieldAlert, Cpu, Sparkles, Layers } from "lucide-react";

export function PhobosTelemetryBanner() {
  return (
    <div className="relative rounded-2xl glass-panel border border-white/[0.08] p-6 sm:p-8 overflow-hidden bg-gradient-to-r from-background-deep/90 via-background-card/80 to-background-deep/90 shadow-2xl">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid crosshairs */}
      <div className="hud-corner-tl p-2">+</div>
      <div className="hud-corner-tr p-2">+</div>
      <div className="hud-corner-bl p-2">+</div>
      <div className="hud-corner-br p-2">+</div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        {/* Left Side: Technical Mission Specs */}
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono text-cyan-300">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>TECHNICAL CAPABILITIES // PHOBOS ARCHITECTURE</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Vector Precision &amp; Quantum Scale Computing
          </h3>

          <p className="text-sm text-text-secondary leading-relaxed font-normal">
            Bridging bare-metal embedded circuits, cloud orchestration with Terraform, and hybrid quantum variational machine learning algorithms with high-throughput data analytics.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs font-mono text-text-muted">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>PennyLane + Braket</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5 text-violet-300">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              <span>Terraform + AWS IaC</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5 text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>ASME Mechatronics (2nd)</span>
            </span>
          </div>
        </div>

        {/* Right Side: Circular Rotating SVG Typography Badge */}
        <div className="shrink-0 flex items-center justify-center p-2">
          <SpinningBadge
            size={160}
            text="• QUANTUM ML • CLOUD SYSTEMS • EMBEDDED MECHATRONICS • RINGULARITY0 •"
            icon="cpu"
          />
        </div>
      </div>
    </div>
  );
}
