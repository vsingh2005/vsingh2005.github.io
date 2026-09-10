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
  size = 380,
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

    const radius = size * 0.35;
    const pointCount = 1200;
    const points: SpherePoint[] = [];

    // Fibonacci sphere distribution with subtle organic surface variance
    for (let i = 0; i < pointCount; i++) {
      const y = 1 - (i / (pointCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = ((1 + Math.sqrt(5)) / 2) * i * 2 * Math.PI;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Soft topographical variation inspired by Phobos moon surface
      const noise =
        Math.sin(x * 4.5) * Math.cos(y * 4.5) * 0.08 +
        Math.sin(z * 6 + x * 3) * 0.05;

      points.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        craterFactor: 1 + noise,
      });
    }

    // Delicate atmospheric dust particles
    const dustCount = 90;
    const dustParticles: { angle: number; dist: number; speed: number; yOffset: number; size: number }[] = [];
    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        angle: Math.random() * Math.PI * 2,
        dist: radius * (1.1 + Math.random() * 0.6),
        speed: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
        yOffset: (Math.random() - 0.5) * radius * 0.6,
        size: Math.random() * 1.2 + 0.6,
      });
    }

    // Rotation & velocity
    let rotX = 0.35;
    let rotY = 0.15;
    let velX = 0.001;
    let velY = 0.003;

    // Drag tracking
    let dragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // Directional light from upper-left
    const light = { x: -0.55, y: -0.65, z: 0.75 };
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

      velY = deltaX * 0.006;
      velX = -deltaY * 0.006;

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
      if (!dragging) {
        velY *= 0.95;
        velX *= 0.95;
        rotY += velY + 0.0025;
        rotX += velX + 0.0005;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Subtle atmospheric halo (warm blush/lavender)
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.3, cx, cy, radius * 1.3);
      glowGrad.addColorStop(0, "rgba(205, 141, 189, 0.08)");
      glowGrad.addColorStop(0.6, "rgba(112, 0, 255, 0.03)");
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Dust particles
      for (let i = 0; i < dustParticles.length; i++) {
        const dp = dustParticles[i];
        dp.angle += dp.speed;

        const nx = Math.cos(dp.angle) * dp.dist;
        const nz = Math.sin(dp.angle) * dp.dist;

        const rx = nx * cosY - nz * sinY;
        const rz = nx * sinY + nz * cosY;
        const ry = dp.yOffset * cosX - rz * sinX;

        const scale = 360 / (360 + rz);
        const px = cx + rx * scale;
        const py = cy + ry * scale;

        const alpha = Math.max(0.1, Math.min(0.5, (rz + radius) / (radius * 2)));
        ctx.fillStyle = rz > 0 ? `rgba(237, 223, 238, ${alpha})` : `rgba(205, 141, 189, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(px, py, dp.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Project sphere points
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

        const bx = p.baseX * r;
        const by = p.baseY * r;
        const bz = p.baseZ * r;

        const x1 = bx * cosY - bz * sinY;
        const z1 = bx * sinY + bz * cosY;

        const y2 = by * cosX - z1 * sinX;
        const z2 = by * sinX + z1 * cosX;

        const nx = p.baseX * cosY - p.baseZ * sinY;
        const nz_temp = p.baseX * sinY + p.baseZ * cosY;
        const ny = p.baseY * cosX - nz_temp * sinX;
        const nz = p.baseY * sinX + nz_temp * cosX;

        // Diffuse Lambertian illumination
        const dotLight = nx * light.x + ny * light.y + nz * light.z;
        const intensity = Math.max(0.06, dotLight * 0.95 + 0.2);

        const focal = 380;
        const scale = focal / (focal + z2);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        projected.push({
          x: px,
          y: py,
          z: z2,
          intensity,
          dotSize: Math.max(0.7, (1.5 + intensity * 1.3) * scale),
        });
      }

      projected.sort((a, b) => b.z - a.z);

      // Render dots in Phobos moon palette (#EDDFEE to #CD8DBD to deep charcoal)
      for (let i = 0; i < projected.length; i++) {
        const dot = projected[i];

        // Interpolate between deep plum/charcoal (shadow) and pale warm bone (highlight)
        const r = Math.floor(65 + dot.intensity * 172); // 65 -> 237 (#ED)
        const g = Math.floor(55 + dot.intensity * 168); // 55 -> 223 (#DF)
        const b = Math.floor(75 + dot.intensity * 163); // 75 -> 238 (#EE)

        const alpha = Math.min(1, Math.max(0.12, dot.intensity * 1.05));
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

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
    </div>
  );
}
