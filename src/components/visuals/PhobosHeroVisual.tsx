"use client";

import React from "react";
import { OrbitalVectorRings } from "./OrbitalVectorRings";
import { PhobosSphere } from "./PhobosSphere";

export function PhobosHeroVisual() {
  return (
    <div className="relative w-full max-w-[460px] aspect-square mx-auto flex items-center justify-center p-4">
      {/* Background Blueprint Vector Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <OrbitalVectorRings size={460} />
      </div>

      {/* Center Interactive 3D Dot-Matrix Sphere */}
      <div className="relative z-10 flex items-center justify-center">
        <PhobosSphere size={320} interactive={true} />
      </div>

      {/* Understated tactile interaction hint */}
      <div className="absolute bottom-1 text-center pointer-events-none">
        <span className="text-[11px] font-mono text-text-muted/60 tracking-wider">
          drag to interact
        </span>
      </div>
    </div>
  );
}
