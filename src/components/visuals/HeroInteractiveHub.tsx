"use client";

import React, { useState } from "react";
import { PhobosHeroVisual } from "./PhobosHeroVisual";
import { WaveformTelemetry } from "./WaveformTelemetry";
import { TerminalCard } from "@/components/ui/TerminalCard";
import { Globe, Activity, Terminal as TerminalIcon, ShieldCheck } from "lucide-react";

export function HeroInteractiveHub() {
  const [activeTab, setActiveTab] = useState<"orbit" | "wave" | "terminal">("orbit");

  return (
    <div className="relative rounded-2xl glass-panel-glow border border-white/10 overflow-hidden shadow-2xl transition-all">
      {/* Top Cybernetic HUD Control Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-background-deep/90 border-b border-white/[0.08] backdrop-blur-xl">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="hidden sm:inline-block ml-2 text-[11px] font-mono text-text-muted">
            PHOBOS-V2 // SYSTEMS CONSOLE
          </span>
        </div>

        {/* Interactive Mode Switcher Tabs */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
          <button
            onClick={() => setActiveTab("orbit")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all ${
              activeTab === "orbit"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_10px_rgba(0,242,254,0.3)]"
                : "text-text-muted hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Globe className="w-3 h-3 text-cyan-400" />
            <span>Orbital Core</span>
          </button>

          <button
            onClick={() => setActiveTab("wave")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all ${
              activeTab === "wave"
                ? "bg-violet-500/20 text-violet-300 border border-violet-400/40 shadow-[0_0_10px_rgba(112,0,255,0.3)]"
                : "text-text-muted hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Activity className="w-3 h-3 text-violet-400" />
            <span>Oscilloscope</span>
          </button>

          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all ${
              activeTab === "terminal"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                : "text-text-muted hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <TerminalIcon className="w-3 h-3 text-emerald-400" />
            <span>Shell</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Content */}
      <div className="relative min-h-[400px] flex items-center justify-center p-2 sm:p-4 bg-background-deep/50">
        {activeTab === "orbit" && (
          <div className="w-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
            <PhobosHeroVisual />
          </div>
        )}

        {activeTab === "wave" && (
          <div className="w-full space-y-3 p-2 animate-in fade-in zoom-in-95 duration-300">
            <WaveformTelemetry label="QUANTUM PROBABILITY DENSITY // |Ψ(t)|²" />
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <span className="text-text-muted">COHERENCE TIME</span>
                <span className="text-cyan-400 font-semibold">124.8 μs</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <span className="text-text-muted">FIDELITY (VQC)</span>
                <span className="text-emerald-400 font-semibold">99.41%</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "terminal" && (
          <div className="w-full animate-in fade-in zoom-in-95 duration-300">
            <TerminalCard />
          </div>
        )}
      </div>

      {/* Bottom Technical Status Bar */}
      <div className="px-4 py-2 bg-background-deep/90 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-text-muted">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981] animate-pulse" />
          <span className="text-text-secondary">SYSTEMS OPERATIONAL</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-cyan-400/80">LAT 42.3868° N</span>
          <span className="text-white/20">•</span>
          <span>AMHERST / CHICAGO</span>
        </div>
      </div>

      {/* Micro Crosshair Corners */}
      <div className="hud-corner-tl p-1.5">+</div>
      <div className="hud-corner-tr p-1.5">+</div>
      <div className="hud-corner-bl p-1.5">+</div>
      <div className="hud-corner-br p-1.5">+</div>
    </div>
  );
}
