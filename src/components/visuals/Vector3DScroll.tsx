"use client";

import React, { useEffect, useRef, useState } from "react";
import { Cpu, CircuitBoard, Binary, Zap } from "lucide-react";

interface Vector3DScrollProps {
  className?: string;
  size?: number;
  interactive?: boolean;
}

type CompEMode = "die" | "pcb" | "logic";

interface TraceLine3D {
  layer: number; // 0: Substrate, 1: Logic Core, 2: Bus Interconnect
  path: { x: number; y: number; z: number }[];
  color: string;
  pulseOffset: number;
}

interface ComponentBlock3D {
  name: string;
  layer: number;
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  color: string;
}

export function Vector3DScroll({
  className = "",
  size = 460,
  interactive = true,
}: Vector3DScrollProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeMode, setActiveMode] = useState<CompEMode>("die");
  const [telemetry, setTelemetry] = useState({
    fps: 60,
    rotX: 32.5,
    rotY: -28.0,
    scrollDir: "IDLE" as "DOWN" | "UP" | "IDLE",
    clockFreq: "3.2 GHz",
    busActivity: "FORWARD",
  });

  const modeRef = useRef<CompEMode>(activeMode);
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

    // Pause animation when scrolled out of view to preserve mobile performance and battery
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    // Core Computer Engineering Geometry:
    // 1. Silicon Die Architecture Blocks (ALU, Register File, Cache, Bus Controller, I/O)
    const chipRadius = size * 0.38;

    const dieBlocks: ComponentBlock3D[] = [
      { name: "VECTOR ALU", layer: 1, x: -chipRadius * 0.45, y: -chipRadius * 0.45, z: 0, w: chipRadius * 0.4, h: chipRadius * 0.4, color: "#00F5D4" },
      { name: "REG FILE", layer: 1, x: chipRadius * 0.05, y: -chipRadius * 0.45, z: 0, w: chipRadius * 0.4, h: chipRadius * 0.22, color: "#7928CA" },
      { name: "L1 CACHE", layer: 1, x: chipRadius * 0.05, y: -chipRadius * 0.18, z: 0, w: chipRadius * 0.4, h: chipRadius * 0.18, color: "#FF0080" },
      { name: "BUS MATRIX", layer: 1, x: -chipRadius * 0.45, y: chipRadius * 0.05, z: 0, w: chipRadius * 0.9, h: chipRadius * 0.15, color: "#F59E0B" },
      { name: "DMA & TELEMETRY", layer: 1, x: -chipRadius * 0.45, y: chipRadius * 0.26, z: 0, w: chipRadius * 0.42, h: chipRadius * 0.22, color: "#CD8DBD" },
      { name: "SPI/I2C ENGINE", layer: 1, x: chipRadius * 0.03, y: chipRadius * 0.26, z: 0, w: chipRadius * 0.42, h: chipRadius * 0.22, color: "#00F5D4" },
    ];

    // 2. Multi-Layer Integrated Circuit Traces (Orthogonal Manhattan Routing)
    const traces: TraceLine3D[] = [];

    // Helper to generate orthogonal circuit pathways
    const addTrace = (layer: number, start: [number, number], segments: [number, number][], color: string) => {
      const path = [{ x: start[0], y: start[1], z: 0 }];
      for (const seg of segments) {
        path.push({ x: seg[0], y: seg[1], z: 0 });
      }
      traces.push({
        layer,
        path,
        color,
        pulseOffset: Math.random() * 100,
      });
    };

    // Layer 0: Substrate Ground & Power Rails (Gold & Copper)
    for (let i = -4; i <= 4; i++) {
      const span = (i / 4) * chipRadius * 0.75;
      addTrace(0, [-chipRadius * 0.75, span], [[chipRadius * 0.75, span]], "rgba(245, 158, 11, 0.4)");
      addTrace(0, [span, -chipRadius * 0.75], [[span, chipRadius * 0.75]], "rgba(245, 158, 11, 0.4)");
    }

    // Layer 1: High-Density Logic Core Buses (Cyan & Violet)
    addTrace(1, [-chipRadius * 0.6, -chipRadius * 0.3], [[-chipRadius * 0.25, -chipRadius * 0.3], [-chipRadius * 0.25, chipRadius * 0.1], [chipRadius * 0.2, chipRadius * 0.1]], "rgba(0, 245, 212, 0.85)");
    addTrace(1, [-chipRadius * 0.2, -chipRadius * 0.5], [[-chipRadius * 0.2, -chipRadius * 0.2], [chipRadius * 0.1, -chipRadius * 0.2], [chipRadius * 0.1, chipRadius * 0.3]], "rgba(121, 40, 202, 0.85)");
    addTrace(1, [chipRadius * 0.3, -chipRadius * 0.4], [[chipRadius * 0.3, chipRadius * 0.0], [chipRadius * 0.45, chipRadius * 0.0], [chipRadius * 0.45, chipRadius * 0.4]], "rgba(255, 0, 128, 0.85)");
    addTrace(1, [-chipRadius * 0.4, chipRadius * 0.2], [[-chipRadius * 0.1, chipRadius * 0.2], [-chipRadius * 0.1, chipRadius * 0.45]], "rgba(0, 245, 212, 0.8)");
    addTrace(1, [chipRadius * 0.2, chipRadius * 0.2], [[chipRadius * 0.2, chipRadius * 0.35], [-chipRadius * 0.2, chipRadius * 0.35]], "rgba(205, 141, 189, 0.8)");

    // Layer 2: External Interconnect Pins & Differential Wave Pairs
    const pinCount = 32;
    const perimeterPins: { x: number; y: number; layer: number }[] = [];
    for (let i = 0; i < pinCount; i++) {
      const theta = (i / pinCount) * Math.PI * 2;
      const rx = Math.cos(theta) * chipRadius * 0.85;
      const ry = Math.sin(theta) * chipRadius * 0.85;
      perimeterPins.push({ x: rx, y: ry, layer: 2 });

      // Connect perimeter pins to core
      const innerX = rx * 0.65;
      const innerY = ry * 0.65;
      addTrace(2, [rx, ry], [[innerX, ry], [innerX, innerY]], "rgba(0, 245, 212, 0.6)");
    }

    // Logic Gate Nodes (SystemVerilog / Transistor Matrix for "logic" mode)
    const logicNodes: { x: number; y: number; z: number; type: string; connections: number[] }[] = [];
    const gateGrid = 4;
    for (let gx = 0; gx < gateGrid; gx++) {
      for (let gy = 0; gy < gateGrid; gy++) {
        const nx = ((gx - (gateGrid - 1) / 2) / (gateGrid - 1)) * chipRadius * 0.8;
        const ny = ((gy - (gateGrid - 1) / 2) / (gateGrid - 1)) * chipRadius * 0.8;
        const types = ["NAND", "XOR", "FF", "MUX"];
        logicNodes.push({
          x: nx,
          y: ny,
          z: (Math.sin(gx * 1.5 + gy * 1.2) * chipRadius * 0.25),
          type: types[(gx + gy) % types.length],
          connections: [],
        });
      }
    }

    // Wire logic gates to neighbors
    for (let i = 0; i < logicNodes.length; i++) {
      if (i % gateGrid < gateGrid - 1) logicNodes[i].connections.push(i + 1);
      if (i + gateGrid < logicNodes.length) logicNodes[i].connections.push(i + gateGrid);
    }

    // Dynamic Bidirectional Scroll Coupling
    let scrollPos = typeof window !== "undefined" ? window.scrollY : 0;
    let targetScrollPos = scrollPos;
    let scrollVelocity = 0;
    let lastScrollY = scrollPos;

    // Isometric default viewing angles (CompE CAD / Architecture view)
    let rotX = 0.62; // ~35° tilt
    let rotY = -0.55; // ~-30° rotation
    let targetRotX = rotX;
    let targetRotY = rotY;

    // Interactive mouse / touch dragging
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onScroll = () => {
      const currentY = window.scrollY;
      const deltaY = currentY - lastScrollY;
      lastScrollY = currentY;

      // Positive = scrolling down; Negative = scrolling up
      targetScrollPos += deltaY * 0.005;
      targetRotY += deltaY * 0.003;
      targetRotX += deltaY * 0.0015;
      scrollVelocity = deltaY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

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
      if (e.touches.length === 1) onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchEnd = () => onPointerUp();

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // 3D Perspective Projection
    const project = (x: number, y: number, z: number, rx: number, ry: number, cx: number, cy: number, fov: number) => {
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY + z * sinY;
      const y1 = y;
      const z1 = -x * sinY + z * cosY;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const x2 = x1;
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;

      const scale = fov / (fov + z2);
      return {
        x2d: cx + x2 * scale,
        y2d: cy + y2 * scale,
        z: z2,
        scale,
      };
    };

    let frame = 0;
    let lastTime = performance.now();

    // Render loop
    const render = (time: number) => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      const deltaMs = time - lastTime;
      lastTime = time;
      frame++;

      if (frame % 15 === 0 && deltaMs > 0) {
        setTelemetry({
          fps: Math.min(Math.round(1000 / deltaMs), 60),
          rotX: parseFloat(((rotX * 180) / Math.PI % 360).toFixed(1)),
          rotY: parseFloat(((rotY * 180) / Math.PI % 360).toFixed(1)),
          scrollDir: scrollVelocity > 0.4 ? "DOWN" : scrollVelocity < -0.4 ? "UP" : "IDLE",
          clockFreq: "3.2 GHz",
          busActivity: scrollVelocity > 0.4 ? "ACCEL (+BUS)" : scrollVelocity < -0.4 ? "REVERSE (-BUS)" : "NOMINAL",
        });
      }

      // Smooth physics lerp
      scrollPos += (targetScrollPos - scrollPos) * 0.08;
      rotX += (targetRotX + mouseY * 0.35 - rotX) * 0.07;
      rotY += (targetRotY + mouseX * 0.35 - rotY) * 0.07;

      // Subtle ambient hover drift
      targetRotY += 0.0012;

      scrollVelocity *= 0.93;
      if (Math.abs(scrollVelocity) < 0.1) scrollVelocity = 0;

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
      const fov = 460;
      const currentMode = modeRef.current;

      // Exploded Layer Elevation factor: scrolling separates silicon layers into an architectural exploded-view
      // Clamped smooth breathing separation
      const layerSeparation = (0.28 + Math.abs(Math.sin(scrollPos * 2)) * 0.45) * chipRadius * 0.65;

      // 1. Draw Silicon Wafer Glowing Foundation
      const waferR = chipRadius * 1.15;
      const waferGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, waferR);
      waferGrad.addColorStop(0, "rgba(0, 245, 212, 0.10)");
      waferGrad.addColorStop(0.5, "rgba(121, 40, 202, 0.07)");
      waferGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = waferGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, waferR, 0, Math.PI * 2);
      ctx.fill();

      // Draw 3D Silicon Die Substrate Base Plate (Layer 0)
      const baseCorners = [
        { x: -chipRadius * 0.8, y: -chipRadius * 0.8 },
        { x: chipRadius * 0.8, y: -chipRadius * 0.8 },
        { x: chipRadius * 0.8, y: chipRadius * 0.8 },
        { x: -chipRadius * 0.8, y: chipRadius * 0.8 },
      ];

      const drawLayerPlane = (layerZ: number, strokeCol: string, fillCol: string, label: string) => {
        const projCorners = baseCorners.map((c) => project(c.x, c.y, layerZ, rotX, rotY, cx, cy, fov));
        ctx.beginPath();
        ctx.moveTo(projCorners[0].x2d, projCorners[0].y2d);
        for (let i = 1; i < projCorners.length; i++) {
          ctx.lineTo(projCorners[i].x2d, projCorners[i].y2d);
        }
        ctx.closePath();
        ctx.fillStyle = fillCol;
        ctx.fill();
        ctx.strokeStyle = strokeCol;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Label on top-left pin
        ctx.fillStyle = strokeCol;
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillText(label, projCorners[0].x2d - 10, projCorners[0].y2d - 6);
      };

      if (currentMode === "die") {
        // Draw 3 Exploded Metal & Silicon Interconnect Planes
        drawLayerPlane(-layerSeparation, "rgba(245, 158, 11, 0.35)", "rgba(245, 158, 11, 0.03)", "LAYER 0: SUBSTRATE");
        drawLayerPlane(0, "rgba(0, 245, 212, 0.45)", "rgba(0, 245, 212, 0.04)", "LAYER 1: COMPUTE DIE");
        drawLayerPlane(layerSeparation, "rgba(255, 0, 128, 0.35)", "rgba(255, 0, 128, 0.02)", "LAYER 2: METAL INTERCONNECT");

        // Vertical Vias connecting layers (microscopic silicon through-silicon vias TSVs)
        baseCorners.forEach((c) => {
          const pBot = project(c.x * 0.85, c.y * 0.85, -layerSeparation, rotX, rotY, cx, cy, fov);
          const pTop = project(c.x * 0.85, c.y * 0.85, layerSeparation, rotX, rotY, cx, cy, fov);
          ctx.beginPath();
          ctx.strokeStyle = "rgba(0, 245, 212, 0.35)";
          ctx.setLineDash([2, 4]);
          ctx.moveTo(pBot.x2d, pBot.y2d);
          ctx.lineTo(pTop.x2d, pTop.y2d);
          ctx.stroke();
          ctx.setLineDash([]);
        });

        // Draw Architectural Blocks on Die (Layer 1)
        dieBlocks.forEach((b) => {
          const zElevation = 0;
          const corners = [
            project(b.x, b.y, zElevation, rotX, rotY, cx, cy, fov),
            project(b.x + b.w, b.y, zElevation, rotX, rotY, cx, cy, fov),
            project(b.x + b.w, b.y + b.h, zElevation, rotX, rotY, cx, cy, fov),
            project(b.x, b.y + b.h, zElevation, rotX, rotY, cx, cy, fov),
          ];

          ctx.beginPath();
          ctx.moveTo(corners[0].x2d, corners[0].y2d);
          for (let i = 1; i < corners.length; i++) ctx.lineTo(corners[i].x2d, corners[i].y2d);
          ctx.closePath();

          ctx.fillStyle = `${b.color}18`;
          ctx.fill();
          ctx.strokeStyle = `${b.color}88`;
          ctx.lineWidth = 1.4;
          ctx.stroke();

          // Block text label
          const center = project(b.x + b.w / 2, b.y + b.h / 2, zElevation, rotX, rotY, cx, cy, fov);
          ctx.fillStyle = b.color;
          ctx.font = `bold ${Math.max(8, 9 * center.scale)}px 'JetBrains Mono', monospace`;
          ctx.textAlign = "center";
          ctx.fillText(b.name, center.x2d, center.y2d + 3);
          ctx.textAlign = "left";
        });
      }

      // Draw Multi-Layer Circuit Traces and Traveling Bitstream Data Packets
      traces.forEach((tr) => {
        let zPos = 0;
        if (currentMode === "die") {
          zPos = tr.layer === 0 ? -layerSeparation : tr.layer === 2 ? layerSeparation : 0;
        }

        const projPath = tr.path.map((p) => project(p.x, p.y, zPos, rotX, rotY, cx, cy, fov));

        // Draw trace line
        ctx.beginPath();
        ctx.moveTo(projPath[0].x2d, projPath[0].y2d);
        for (let i = 1; i < projPath.length; i++) {
          ctx.lineTo(projPath[i].x2d, projPath[i].y2d);
        }
        ctx.strokeStyle = tr.color;
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Draw bidirectional traveling clock/data pulse on this trace!
        // Driven forward or backward by scroll position + time
        const pulseProgress = ((time * 0.0018 + tr.pulseOffset + scrollPos * 4) % 1 + 1) % 1;
        const totalSegments = projPath.length - 1;
        const currentSeg = Math.min(Math.floor(pulseProgress * totalSegments), totalSegments - 1);
        const subT = (pulseProgress * totalSegments) - currentSeg;

        const pA = projPath[currentSeg];
        const pB = projPath[currentSeg + 1];

        const pulseX = pA.x2d + (pB.x2d - pA.x2d) * subT;
        const pulseY = pA.y2d + (pB.y2d - pA.y2d) * subT;

        // Glowing data packet bit
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 2.5 * pA.scale, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#00F5D4";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Perimeter I/O Wirebond Pads
      perimeterPins.forEach((pin, idx) => {
        const zPos = currentMode === "die" ? layerSeparation : 0;
        const p = project(pin.x, pin.y, zPos, rotX, rotY, cx, cy, fov);

        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, 2.2 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = idx % 2 === 0 ? "#F59E0B" : "#00F5D4";
        ctx.fill();
      });

      // 3. Logic Gate Network Mode (SystemVerilog State Machine Topology)
      if (currentMode === "logic") {
        logicNodes.forEach((node) => {
          const p = project(node.x, node.y, node.z + Math.sin(scrollPos * 3 + node.x) * 20, rotX, rotY, cx, cy, fov);

          // Connect wires
          node.connections.forEach((targetIdx) => {
            const target = logicNodes[targetIdx];
            const targetP = project(target.x, target.y, target.z + Math.sin(scrollPos * 3 + target.x) * 20, rotX, rotY, cx, cy, fov);

            ctx.beginPath();
            ctx.moveTo(p.x2d, p.y2d);
            ctx.lineTo(targetP.x2d, targetP.y2d);
            ctx.strokeStyle = "rgba(121, 40, 202, 0.45)";
            ctx.lineWidth = 1.2;
            ctx.stroke();
          });

          // Draw Gate Icon / Node
          ctx.beginPath();
          ctx.arc(p.x2d, p.y2d, 5 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = node.type === "NAND" ? "#00F5D4" : node.type === "XOR" ? "#FF0080" : "#F59E0B";
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.font = "8px 'JetBrains Mono', monospace";
          ctx.fillText(node.type, p.x2d + 7, p.y2d + 3);
        });
      }

      // 4. PCB Matrix Mode (Component Packages, Solder Joints & SMD Capacitors)
      if (currentMode === "pcb") {
        drawLayerPlane(0, "rgba(0, 245, 212, 0.6)", "rgba(0, 40, 25, 0.15)", "PCB MAINBOARD");

        // Surface mount IC chips on PCB
        const smdChips = [
          { x: -chipRadius * 0.4, y: -chipRadius * 0.4, w: chipRadius * 0.35, h: chipRadius * 0.35, label: "MCU (ARM)" },
          { x: chipRadius * 0.1, y: -chipRadius * 0.4, w: chipRadius * 0.35, h: chipRadius * 0.25, label: "EEPROM" },
          { x: -chipRadius * 0.4, y: chipRadius * 0.1, w: chipRadius * 0.25, h: chipRadius * 0.25, label: "CRYSTAL" },
          { x: 0, y: chipRadius * 0.1, w: chipRadius * 0.45, h: chipRadius * 0.3, label: "POWER REG" },
        ];

        smdChips.forEach((chip) => {
          const corners = [
            project(chip.x, chip.y, 0, rotX, rotY, cx, cy, fov),
            project(chip.x + chip.w, chip.y, 0, rotX, rotY, cx, cy, fov),
            project(chip.x + chip.w, chip.y + chip.h, 0, rotX, rotY, cx, cy, fov),
            project(chip.x, chip.y + chip.h, 0, rotX, rotY, cx, cy, fov),
          ];

          ctx.beginPath();
          ctx.moveTo(corners[0].x2d, corners[0].y2d);
          for (let i = 1; i < corners.length; i++) ctx.lineTo(corners[i].x2d, corners[i].y2d);
          ctx.closePath();
          ctx.fillStyle = "rgba(10, 15, 25, 0.85)";
          ctx.fill();
          ctx.strokeStyle = "#00F5D4";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Solder pads on chip sides
          for (let pIdx = 0; pIdx < 4; pIdx++) {
            const py = chip.y + (pIdx / 3) * chip.h;
            const padL = project(chip.x - 3, py, 0, rotX, rotY, cx, cy, fov);
            const padR = project(chip.x + chip.w + 3, py, 0, rotX, rotY, cx, cy, fov);

            ctx.fillStyle = "#F59E0B";
            ctx.fillRect(padL.x2d - 2, padL.y2d - 1, 4, 2);
            ctx.fillRect(padR.x2d - 2, padR.y2d - 1, 4, 2);
          }

          const center = project(chip.x + chip.w / 2, chip.y + chip.h / 2, 0, rotX, rotY, cx, cy, fov);
          ctx.fillStyle = "#EDDFEE";
          ctx.font = "8px 'JetBrains Mono', monospace";
          ctx.textAlign = "center";
          ctx.fillText(chip.label, center.x2d, center.y2d + 3);
          ctx.textAlign = "left";
        });
      }

      // 5. Mini Digital Logic Waveform (Oscilloscope trace at bottom)
      const waveY = height - 20;
      const waveWidth = width - 40;
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 245, 212, 0.5)";
      ctx.lineWidth = 1.2;

      for (let wx = 0; wx < waveWidth; wx += 4) {
        // Clock square wave shifted dynamically by scroll direction
        const clockT = (wx * 0.08 + time * 0.005 + scrollPos * 3);
        const squareVal = Math.sin(clockT) > 0 ? 8 : -8;
        const ptX = 20 + wx;
        const ptY = waveY + squareVal;

        if (wx === 0) ctx.moveTo(ptX, ptY);
        else ctx.lineTo(ptX, ptY);
      }
      ctx.stroke();

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
      {/* Background Silicon Glow in Theme Colors */}
      <div className="absolute -top-14 -right-14 w-72 h-72 rounded-full bg-gradient-to-tr from-cyan-500/20 via-violet-600/20 to-transparent blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-14 -left-14 w-72 h-72 rounded-full bg-gradient-to-tr from-fuchsia-500/20 via-amber-500/15 to-transparent blur-[90px] pointer-events-none" />

      {/* Top Header: Computer Engineering Architecture Modes & Telemetry */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2.5 mb-2 text-xs font-mono">
        {/* Architecture Mode Selector */}
        <div className="flex items-center gap-1 p-0.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <button
            type="button"
            onClick={() => setActiveMode("die")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              activeMode === "die"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
            title="Silicon Die: Multi-layer microprocessor architecture with exploded elevation"
          >
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>Silicon Die</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("pcb")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              activeMode === "pcb"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
            title="PCB Matrix: Surface mount components & bus routing"
          >
            <CircuitBoard className="w-3 h-3 text-amber-400" />
            <span>PCB Matrix</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("logic")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              activeMode === "logic"
                ? "bg-violet-500/20 text-purple-300 border border-purple-500/30 shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
            title="Logic Lattice: 3D SystemVerilog state machine topology"
          >
            <Binary className="w-3 h-3 text-purple-400" />
            <span>Logic Gates</span>
          </button>
        </div>

        {/* Live Scroll Bus Indicator */}
        <div className="flex items-center gap-2 text-[11px] text-text-muted">
          <span className="flex items-center gap-1 text-cyan-300 font-semibold">
            <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>{telemetry.scrollDir === "DOWN" ? "▼ BUS: CLOCK+" : telemetry.scrollDir === "UP" ? "▲ BUS: CLOCK-" : "⟳ DUAL-SCROLL"}</span>
          </span>
        </div>
      </div>

      {/* Main 3D Canvas */}
      <div className="relative w-full h-[calc(100%-80px)] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
          title="Scroll page in both directions to accelerate bus pulses, or drag directly to rotate"
        />
      </div>

      {/* Bottom Technical Architecture Coordinates Bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-text-muted pt-2 border-t border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span>
            PITCH: <strong className="text-cyan-300">{telemetry.rotX}°</strong>
          </span>
          <span>
            YAW: <strong className="text-fuchsia-300">{telemetry.rotY}°</strong>
          </span>
          <span className="hidden sm:inline">
            BUS: <strong className="text-amber-300">{telemetry.busActivity}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text-muted/80 hidden sm:inline">Scroll drives clock in both directions • Drag to inspect</span>
          <span className="text-text-muted/80 sm:hidden">Dual-Scroll Clock</span>
        </div>
      </div>
    </div>
  );
}
