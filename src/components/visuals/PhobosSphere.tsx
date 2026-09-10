"use client";

import React, { useEffect, useRef, useState } from "react";

interface PhobosSphereProps {
  className?: string;
  size?: number;
  interactive?: boolean;
}

interface SpherePoint {
  baseX: number;
  baseY: number;
  baseZ: number;
  craterFactor: number;
}

export function PhobosSphere({
  className = "",
  size = 420,
  interactive = true,
}: PhobosSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    const width = size;
    const height = size;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const radius = size * 0.36;
    const pointCount = 1400;
    const points: SpherePoint[] = [];

    // Generate Fibonacci sphere points with topological quantum crater variations
    for (let i = 0; i < pointCount; i++) {
      const y = 1 - (i / (pointCount - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = ((1 + Math.sqrt(5)) / 2) * i * 2 * Math.PI;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Noise crater simulation
      const craterNoise =
        Math.sin(x * 5) * Math.cos(y * 5) * 0.12 +
        Math.sin(z * 8 + x * 4) * 0.08;

      points.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        craterFactor: 1 + craterNoise,
      });
    }

    // Atmospheric spiral particles
    const nebulaParticleCount = 180;
    const nebulaParticles: { angle: number; dist: number; speed: number; yOffset: number; size: number }[] = [];
    for (let i = 0; i < nebulaParticleCount; i++) {
      nebulaParticles.push({
        angle: Math.random() * Math.PI * 2,
        dist: radius * (1.15 + Math.random() * 0.8),
        speed: (Math.random() * 0.004 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        yOffset: (Math.random() - 0.5) * radius * 0.7,
        size: Math.random() * 1.6 + 0.8,
      });
    }

    // Rotation angles and velocities
    let rotX = 0.35;
    let rotY = 0.1;
    let velX = 0.002;
    let velY = 0.004;

    // Drag state
    let dragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // Light source coordinates (front-top-left)
    const light = { x: -0.6, y: -0.7, z: 0.8 };
    const lightMag = Math.sqrt(light.x * light.x + light.y * light.y + light.z * light.z);
    light.x /= lightMag;
    light.y /= lightMag;
    light.z /= lightMag;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      dragging = true;
      setIsDragging(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      lastMouseX = clientX;
      lastMouseY = clientY;
      velX = 0;
      velY = 0;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - lastMouseX;
      const deltaY = clientY - lastMouseY;

      velY = deltaX * 0.007;
      velX = -deltaY * 0.007;

      rotY += velY;
      rotX += velX;

      lastMouseX = clientX;
      lastMouseY = clientY;
    };

    const onPointerUp = () => {
      dragging = false;
      setIsDragging(false);
    };

    const el = canvas;
    el.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    el.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    const render = () => {
      // Natural inertia & ambient rotation
      if (!dragging) {
        velY *= 0.95;
        velX *= 0.95;
        rotY += velY + 0.003;
        rotX += velX + 0.0005;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Atmospheric Glow Behind Sphere
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius * 1.5);
      glowGrad.addColorStop(0, "rgba(0, 242, 254, 0.15)");
      glowGrad.addColorStop(0.5, "rgba(112, 0, 255, 0.08)");
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Precalculate rotation matrix
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Render Nebula Particles (Background & Orbit)
      for (let i = 0; i < nebulaParticles.length; i++) {
        const np = nebulaParticles[i];
        np.angle += np.speed;

        const nx = Math.cos(np.angle) * np.dist;
        const nz = Math.sin(np.angle) * np.dist;

        // Rotate nebula with Y
        const rx = nx * cosY - nz * sinY;
        const rz = nx * sinY + nz * cosY;
        const ry = np.yOffset * cosX - rz * sinX;

        // Depth perspective
        const scale = 380 / (380 + rz);
        const px = cx + rx * scale;
        const py = cy + ry * scale;

        const alpha = Math.max(0.1, Math.min(0.7, (rz + radius) / (radius * 2)));
        ctx.fillStyle = rz > 0 ? `rgba(0, 242, 254, ${alpha})` : `rgba(180, 100, 255, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(px, py, np.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Transform, sort, and project sphere points
      const projected: {
        x: number;
        y: number;
        z: number;
        intensity: number;
        dotSize: number;
      }[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const r = radius * p.craterFactor;

        // Base 3D vector
        const bx = p.baseX * r;
        const by = p.baseY * r;
        const bz = p.baseZ * r;

        // Rotate Y
        const x1 = bx * cosY - bz * sinY;
        const z1 = bx * sinY + bz * cosY;

        // Rotate X
        const y2 = by * cosX - z1 * sinX;
        const z2 = by * sinX + z1 * cosX;

        // Normal vector after rotation for lighting
        const nx = p.baseX * cosY - p.baseZ * sinY;
        const nz_temp = p.baseX * sinY + p.baseZ * cosY;
        const ny = p.baseY * cosX - nz_temp * sinX;
        const nz = p.baseY * sinX + nz_temp * cosX;

        // Directional Lambertian diffuse lighting with ambient fill
        const dotLight = nx * light.x + ny * light.y + nz * light.z;
        const intensity = Math.max(0.08, dotLight * 0.9 + 0.25);

        // Perspective projection
        const focalLength = 400;
        const scale = focalLength / (focalLength + z2);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        projected.push({
          x: px,
          y: py,
          z: z2,
          intensity,
          dotSize: Math.max(0.6, (1.6 + intensity * 1.4) * scale),
        });
      }

      // Sort by Z (painter's algorithm)
      projected.sort((a, b) => b.z - a.z);

      // Render dots
      for (let i = 0; i < projected.length; i++) {
        const dot = projected[i];

        // Cyan highlight towards light, deep violet/blue in shadows
        let rVal = Math.floor(dot.intensity * 100 + 40);
        let gVal = Math.floor(dot.intensity * 242);
        let bVal = Math.floor(dot.intensity * 100 + 155);

        if (dot.intensity > 0.7) {
          // Specular white-cyan glint
          rVal = Math.min(255, 180 + Math.floor(dot.intensity * 75));
          gVal = Math.min(255, 240 + Math.floor(dot.intensity * 15));
          bVal = 255;
        }

        const alpha = Math.min(1, Math.max(0.15, dot.intensity * 1.1));
        ctx.fillStyle = `rgba(${rVal}, ${gVal}, ${bVal}, ${alpha})`;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.dotSize, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      el.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [size, interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none flex items-center justify-center ${interactive ? "cursor-grab active:cursor-grabbing" : ""} ${className}`}
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ touchAction: "none" }}
      />
      {interactive && (
        <div className="absolute bottom-2 text-center pointer-events-none opacity-40 hover:opacity-80 transition-opacity">
          <span className="text-[10px] font-mono text-cyan-300 tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-500/20">
            {isDragging ? "Rotating Core" : "Drag to Tumble Sphere"}
          </span>
        </div>
      )}
    </div>
  );
}
