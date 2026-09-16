"use client";

import React, { useEffect, useRef, useState } from "react";

interface Vector3DScrollProps {
  className?: string;
  size?: number;
  interactive?: boolean;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge3D {
  p1: number;
  p2: number;
  colorType?: "cyan" | "violet" | "fuchsia" | "subtle";
}

export function Vector3DScroll({
  className = "",
  size = 420,
  interactive = true,
}: Vector3DScrollProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Live HUD Telemetry state
  const [telemetry, setTelemetry] = useState({
    rotX: 25.0,
    rotY: 45.0,
    scrollDir: "IDLE" as "IDLE" | "DOWN" | "UP",
    scrollVelocity: 0,
  });

  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    // Intersection observer to save battery on phone when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    // Geometry Generation: 3D Geodesic Icosahedron & Gimbal Vector Rings
    const baseRadius = size * 0.36;
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio for icosahedron vertices

    // 12 vertices of an icosahedron
    const rawVertices: Point3D[] = [
      { x: -1, y: phi, z: 0 },
      { x: 1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: 1, y: -phi, z: 0 },

      { x: 0, y: -1, z: phi },
      { x: 0, y: 1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 0, y: 1, z: -phi },

      { x: phi, y: 0, z: -1 },
      { x: phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
    ];

    // Normalize to unit sphere and scale by radius
    const vertices: Point3D[] = rawVertices.map((v) => {
      const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
      return {
        x: (v.x / len) * baseRadius,
        y: (v.y / len) * baseRadius,
        z: (v.z / len) * baseRadius,
      };
    });

    // Outer nested star nodes
    const starRadius = baseRadius * 1.35;
    const starNodes: Point3D[] = [
      { x: starRadius, y: 0, z: 0 },
      { x: -starRadius, y: 0, z: 0 },
      { x: 0, y: starRadius, z: 0 },
      { x: 0, y: -starRadius, z: 0 },
      { x: 0, y: 0, z: starRadius },
      { x: 0, y: 0, z: -starRadius },
    ];

    // Icosahedron standard 30 edges connecting vertices at distance ~ 2.0
    const edges: Edge3D[] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = rawVertices[i].x - rawVertices[j].x;
        const dy = rawVertices[i].y - rawVertices[j].y;
        const dz = rawVertices[i].z - rawVertices[j].z;
        const distSq = dx * dx + dy * dy + dz * dz;
        // In unit icosahedron, adjacent vertices have distSq = 4
        if (Math.abs(distSq - 4) < 0.2) {
          const colorType: "cyan" | "violet" | "fuchsia" =
            (i + j) % 3 === 0 ? "cyan" : (i + j) % 3 === 1 ? "violet" : "fuchsia";
          edges.push({ p1: i, p2: j, colorType });
        }
      }
    }

    // Secondary vector rings (circular longitude/latitude circles)
    const ringPointCount = 48;
    const ringX: Point3D[] = [];
    const ringY: Point3D[] = [];
    const ringZ: Point3D[] = [];
    const ringRadius = baseRadius * 1.55;

    for (let i = 0; i < ringPointCount; i++) {
      const angle = (i / ringPointCount) * Math.PI * 2;
      ringX.push({ x: 0, y: Math.cos(angle) * ringRadius, z: Math.sin(angle) * ringRadius });
      ringY.push({ x: Math.cos(angle) * ringRadius, y: 0, z: Math.sin(angle) * ringRadius });
      ringZ.push({ x: Math.cos(angle) * ringRadius, y: Math.sin(angle) * ringRadius, z: 0 });
    }

    // Ambient floating 3D dust points
    const dustCount = 40;
    const dust: Point3D[] = [];
    for (let i = 0; i < dustCount; i++) {
      const r = baseRadius * (1.1 + Math.random() * 0.9);
      const theta = Math.random() * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      dust.push({
        x: r * Math.sqrt(1 - u * u) * Math.cos(theta),
        y: r * Math.sqrt(1 - u * u) * Math.sin(theta),
        z: r * u,
      });
    }

    // Physics and rotation state
    let rotX = 0.45;
    let rotY = 0.65;
    let rotZ = 0.1;
    let targetRotX = rotX;
    let targetRotY = rotY;
    let targetRotZ = rotZ;

    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let currentScrollVelocity = 0;
    let idleSpin = 0.0015;

    // Direct scroll event tracking (Works bidirectionally for both UP and DOWN)
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Positive delta = scrolling down; Negative delta = scrolling up
      // Dynamic rotation scaling on both axes
      targetRotY += deltaY * 0.005;
      targetRotX += deltaY * 0.0025;
      targetRotZ += deltaY * 0.0015;

      currentScrollVelocity = deltaY;

      // Update HUD telemetry
      setTelemetry((prev) => ({
        ...prev,
        scrollDir: deltaY > 0 ? "DOWN" : deltaY < 0 ? "UP" : "IDLE",
        scrollVelocity: Math.round(deltaY),
      }));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Touch & Pointer drag support (phone swipe & desktop mouse)
    let isDragging = false;
    let startPointerX = 0;
    let startPointerY = 0;

    const handlePointerDown = (clientX: number, clientY: number) => {
      if (!interactive) return;
      isDragging = true;
      setIsInteracting(true);
      startPointerX = clientX;
      startPointerY = clientY;
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      if (!isDragging) return;
      const dx = clientX - startPointerX;
      const dy = clientY - startPointerY;
      startPointerX = clientX;
      startPointerY = clientY;

      targetRotY += dx * 0.008;
      targetRotX -= dy * 0.008;
    };

    const handlePointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const onMouseDown = (e: MouseEvent) => handlePointerDown(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onMouseUp = () => handlePointerUp();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => handlePointerUp();

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // 3D Matrix Rotation & Perspective Projection
    const projectPoint = (
      p: Point3D,
      rx: number,
      ry: number,
      rz: number,
      cx: number,
      cy: number,
      fov: number
    ) => {
      // Rotation Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = p.x * cosY + p.z * sinY;
      const y1 = p.y;
      const z1 = -p.x * sinY + p.z * cosY;

      // Rotation X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const x2 = x1;
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;

      // Rotation Z
      const cosZ = Math.cos(rz);
      const sinZ = Math.sin(rz);
      const x3 = x2 * cosZ - y2 * sinZ;
      const y3 = x2 * sinZ + y2 * cosZ;
      const z3 = z2;

      // Perspective divide
      const distance = fov;
      const scale = distance / (distance + z3);
      return {
        x2d: cx + x3 * scale,
        y2d: cy + y3 * scale,
        z: z3,
        scale,
      };
    };

    let frameCount = 0;

    // Render Loop
    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Smooth lerp towards target rotation (smooth inertia in both directions)
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;
      rotZ += (targetRotZ - rotZ) * 0.08;

      // Subtle ambient continuous drift when not actively scrolling
      targetRotY += idleSpin;

      // Slowly decay scroll velocity indication
      currentScrollVelocity *= 0.94;
      if (Math.abs(currentScrollVelocity) < 0.2) {
        currentScrollVelocity = 0;
      }

      frameCount++;
      if (frameCount % 6 === 0) {
        setTelemetry({
          rotX: parseFloat(((rotX * 180) / Math.PI % 360).toFixed(1)),
          rotY: parseFloat(((rotY * 180) / Math.PI % 360).toFixed(1)),
          scrollDir: currentScrollVelocity > 0.5 ? "DOWN" : currentScrollVelocity < -0.5 ? "UP" : "IDLE",
          scrollVelocity: Math.round(currentScrollVelocity),
        });
      }

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
      const fov = 450;

      // Draw subtle background polar coordinate grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 1.6, 0, Math.PI * 2);
      ctx.stroke();

      // Project vertices
      const projected = vertices.map((v) => projectPoint(v, rotX, rotY, rotZ, cx, cy, fov));
      const projectedStars = starNodes.map((s) => projectPoint(s, rotX, rotY, rotZ, cx, cy, fov));
      const projectedDust = dust.map((d) => projectPoint(d, rotX * 0.7, rotY * 0.7, rotZ, cx, cy, fov));

      // Draw dust particles in 3D depth
      for (const p of projectedDust) {
        const alpha = Math.max(0.1, Math.min(0.65, (p.z + baseRadius * 1.5) / (baseRadius * 3)));
        ctx.fillStyle = `rgba(205, 141, 189, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, 1 * p.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Gimbal Rings (X, Y, Z orbital circles)
      const drawRing = (ringPoints: Point3D[], color: string, dash: number[] = []) => {
        ctx.beginPath();
        ctx.setLineDash(dash);
        const projRing = ringPoints.map((p) => projectPoint(p, rotX, rotY, rotZ, cx, cy, fov));
        for (let i = 0; i < projRing.length; i++) {
          const next = projRing[(i + 1) % projRing.length];
          const avgZ = (projRing[i].z + next.z) / 2;
          const alpha = Math.max(0.08, Math.min(0.5, (avgZ + ringRadius) / (ringRadius * 2)));

          ctx.strokeStyle = color.replace("ALPHA", alpha.toFixed(2));
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(projRing[i].x2d, projRing[i].y2d);
          ctx.lineTo(next.x2d, next.y2d);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      };

      drawRing(ringZ, "rgba(0, 240, 255, ALPHA)", [2, 6]);
      drawRing(ringY, "rgba(205, 141, 189, ALPHA)", [4, 8]);
      drawRing(ringX, "rgba(168, 85, 247, ALPHA)", [1, 5]);

      // Draw Vector Edges with depth fading & gradient glows
      edges.forEach((edge) => {
        const p1 = projected[edge.p1];
        const p2 = projected[edge.p2];
        const avgZ = (p1.z + p2.z) / 2;

        const depthAlpha = Math.max(0.15, Math.min(0.9, (avgZ + baseRadius) / (baseRadius * 2)));

        let strokeColor = `rgba(0, 240, 255, ${depthAlpha * 0.85})`;
        if (edge.colorType === "violet") {
          strokeColor = `rgba(168, 85, 247, ${depthAlpha * 0.8})`;
        } else if (edge.colorType === "fuchsia") {
          strokeColor = `rgba(205, 141, 189, ${depthAlpha * 0.85})`;
        }

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = Math.max(0.8, 1.4 * ((p1.scale + p2.scale) / 2));
        ctx.beginPath();
        ctx.moveTo(p1.x2d, p1.y2d);
        ctx.lineTo(p2.x2d, p2.y2d);
        ctx.stroke();
      });

      // Draw Vector Nodes (Icosahedron Vertices)
      projected.forEach((p, idx) => {
        const nodeAlpha = Math.max(0.2, Math.min(1, (p.z + baseRadius) / (baseRadius * 2)));
        const radius = Math.max(1.8, 3.2 * p.scale);

        // Halo glow
        const grad = ctx.createRadialGradient(p.x2d, p.y2d, 0, p.x2d, p.y2d, radius * 2.8);
        grad.addColorStop(0, `rgba(0, 240, 255, ${nodeAlpha * 0.7})`);
        grad.addColorStop(1, "rgba(0, 240, 255, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, radius * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Node core
        ctx.fillStyle = idx % 2 === 0 ? "#ffffff" : "#22d3ee";
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Center Orthogonal Axis Vector Arrows (X, Y, Z)
      const origin = projectPoint({ x: 0, y: 0, z: 0 }, rotX, rotY, rotZ, cx, cy, fov);
      const axisLen = baseRadius * 0.55;
      const xAxis = projectPoint({ x: axisLen, y: 0, z: 0 }, rotX, rotY, rotZ, cx, cy, fov);
      const yAxis = projectPoint({ x: 0, y: -axisLen, z: 0 }, rotX, rotY, rotZ, cx, cy, fov);
      const zAxis = projectPoint({ x: 0, y: 0, z: axisLen }, rotX, rotY, rotZ, cx, cy, fov);

      const drawAxis = (to: typeof xAxis, color: string, label: string) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(origin.x2d, origin.y2d);
        ctx.lineTo(to.x2d, to.y2d);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillText(label, to.x2d + 4, to.y2d + 3);
      };

      drawAxis(xAxis, "#22d3ee", "+X");
      drawAxis(yAxis, "#cd8dbd", "+Y");
      drawAxis(zAxis, "#a855f7", "+Z");

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      observer.disconnect();
    };
  }, [interactive, size]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square max-w-[480px] mx-auto rounded-3xl bg-black/40 border border-white/[0.08] backdrop-blur-xl p-4 overflow-hidden shadow-2xl group select-none ${className}`}
    >
      {/* Background Aurora Blur in Theme Colors */}
      <div className="absolute -top-12 -right-12 w-60 h-60 rounded-full bg-gradient-to-tr from-fuchsia-500/25 to-violet-600/25 blur-[75px] pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-60 h-60 rounded-full bg-gradient-to-tr from-cyan-400/20 to-emerald-500/15 blur-[75px] pointer-events-none" />

      {/* Top HUD Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono border-b border-white/[0.06] pb-2.5 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-white font-semibold tracking-wider">3D VECTOR DYNAMICS</span>
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <span className="text-accent-cyan">
            SCROLL: {telemetry.scrollDir === "DOWN" ? "▼ +SCROLL" : telemetry.scrollDir === "UP" ? "▲ -SCROLL" : "⟳ IDLE"}
          </span>
        </div>
      </div>

      {/* Main 3D Canvas */}
      <div className="relative w-full h-[calc(100%-75px)] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
          title="Scroll page to spin in both directions, or touch/drag to inspect"
        />
      </div>

      {/* Bottom Technical Coordinates & Interaction Guide */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-text-muted pt-2 border-t border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span>
            X: <strong className="text-cyan-300">{telemetry.rotX}°</strong>
          </span>
          <span>
            Y: <strong className="text-fuchsia-300">{telemetry.rotY}°</strong>
          </span>
        </div>
        <div className="text-[10px] text-text-muted/80">
          <span className="hidden sm:inline">Scroll page (both directions) or drag</span>
          <span className="sm:hidden">Scroll or drag to rotate</span>
        </div>
      </div>
    </div>
  );
}
