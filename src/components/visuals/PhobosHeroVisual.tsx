"use client";

import React, { useState, useEffect } from "react";
import { OrbitalVectorRings } from "./OrbitalVectorRings";
import { PhobosSphere } from "./PhobosSphere";
import { Activity, Radio, Cpu, Compass } from "lucide-react";

export function PhobosHeroVisual() {
  const [coords, setCoords] = useState({ ra: "18h 36m 56s", dec: "+38° 47' 01\"", epoch: "J2026.5" });
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[540px] aspect-square mx-auto flex items-center justify-center p-2 sm:p-4">
      {/* Background Vector Orbital Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <OrbitalVectorRings size={540} />
      </div>

      {/* Center Interactive 3D Dot-Matrix Sphere */}
      <div className="relative z-10 flex items-center justify-center">
        <PhobosSphere size={360} interactive={true} />
      </div>

      {/* Top Left HUD Telemetry Tag */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 flex flex-col gap-1 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background-deep/80 border border-cyan-400/30 backdrop-blur-md text-[11px] font-mono text-cyan-300">
          <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span className="tracking-wider">PHOBOS.TELEMETRY</span>
        </div>
        <span className="text-[10px] font-mono text-text-muted pl-1">
          RA {coords.ra}
        </span>
      </div>

      {/* Top Right HUD Telemetry Tag */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex flex-col items-end gap-1 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background-deep/80 border border-violet-500/30 backdrop-blur-md text-[11px] font-mono text-violet-300">
          <Activity className="w-3 h-3 text-violet-400" />
          <span className="tracking-wider">CORE: 4.80 GHz</span>
        </div>
        <span className="text-[10px] font-mono text-text-muted pr-1">
          DEC {coords.dec}
        </span>
      </div>

      {/* Bottom Left HUD Telemetry Tag */}
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background-deep/80 border border-white/10 backdrop-blur-md text-[10px] font-mono text-text-secondary pointer-events-none">
        <Compass className="w-3 h-3 text-emerald-400" />
        <span>SYS // ORBIT ACTIVE</span>
      </div>

      {/* Bottom Right HUD Telemetry Tag */}
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background-deep/80 border border-white/10 backdrop-blur-md text-[10px] font-mono text-text-secondary pointer-events-none">
        <Cpu className="w-3 h-3 text-accent-magenta" />
        <span>VQC // 6 QUBITS</span>
      </div>

      {/* Corner Crosshairs (+) Inspired by Phobos Technical Design */}
      <div className="absolute top-0 left-0 text-cyan-400/40 text-xs font-mono select-none pointer-events-none">+</div>
      <div className="absolute top-0 right-0 text-cyan-400/40 text-xs font-mono select-none pointer-events-none">+</div>
      <div className="absolute bottom-0 left-0 text-cyan-400/40 text-xs font-mono select-none pointer-events-none">+</div>
      <div className="absolute bottom-0 right-0 text-cyan-400/40 text-xs font-mono select-none pointer-events-none">+</div>
    </div>
  );
}
