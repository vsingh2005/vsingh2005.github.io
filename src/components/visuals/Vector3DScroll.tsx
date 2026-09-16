"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Cpu, CircuitBoard, Binary, Zap, Play, Pause, ChevronRight } from "lucide-react";

interface Vector3DScrollProps {
  className?: string;
  size?: number;
  interactive?: boolean;
}

type CompEMode = "logic" | "die" | "pcb";

export function Vector3DScroll({
  className = "",
  size = 460,
  interactive = true,
}: Vector3DScrollProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Default to the real, functional logic gates mode
  const [activeMode, setActiveMode] = useState<CompEMode>("logic");

  // Real Boolean inputs for Full Adder circuit: A, B, Carry-In
  const [inputA, setInputA] = useState<boolean>(true);
  const [inputB, setInputB] = useState<boolean>(false);
  const [inputCin, setInputCin] = useState<boolean>(true);

  // Auto-clock stepping toggle
  const [autoClock, setAutoClock] = useState<boolean>(false);

  // Telemetry display
  const [telemetry, setTelemetry] = useState({
    fps: 60,
    rotX: 12.0,
    rotY: -8.0,
    stepIndex: 5, // (1, 0, 1) = index 5 in truth table
    sum: 0,
    cout: 1,
    formula: "1 + 0 + 1 = 2 (Binary 10)",
  });

  // Calculate real Boolean values
  const xor1 = inputA !== inputB;
  const and1 = inputA && inputB;
  const sum = xor1 !== inputCin;
  const and2 = xor1 && inputCin;
  const cout = and1 || and2;

  // Refs for animation loop access
  const modeRef = useRef<CompEMode>(activeMode);
  const inputsRef = useRef({ a: inputA, b: inputB, cin: inputCin });
  const autoClockRef = useRef(autoClock);

  useEffect(() => {
    modeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    inputsRef.current = { a: inputA, b: inputB, cin: inputCin };
  }, [inputA, inputB, inputCin]);

  useEffect(() => {
    autoClockRef.current = autoClock;
  }, [autoClock]);

  // Step through truth table vectors (000 -> 111)
  const stepTruthTable = useCallback((forward: boolean = true) => {
    const truthTable = [
      { a: false, b: false, cin: false }, // 0: 000
      { a: false, b: false, cin: true },  // 1: 001
      { a: false, b: true,  cin: false }, // 2: 010
      { a: false, b: true,  cin: true },  // 3: 011
      { a: true,  b: false, cin: false }, // 4: 100
      { a: true,  b: false, cin: true },  // 5: 101
      { a: true,  b: true,  cin: false }, // 6: 110
      { a: true,  b: true,  cin: true },  // 7: 111
    ];

    const currentIdx = (inputsRef.current.a ? 4 : 0) + (inputsRef.current.b ? 2 : 0) + (inputsRef.current.cin ? 1 : 0);
    const nextIdx = forward
      ? (currentIdx + 1) % 8
      : (currentIdx - 1 + 8) % 8;

    const next = truthTable[nextIdx];
    setInputA(next.a);
    setInputB(next.b);
    setInputCin(next.cin);
  }, []);

  // Auto-clock effect
  useEffect(() => {
    if (!autoClock) return;
    const interval = setInterval(() => {
      stepTruthTable(true);
    }, 1400);
    return () => clearInterval(interval);
  }, [autoClock, stepTruthTable]);

  // Main canvas rendering & 3D projection engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    // Fixed, forward-facing isometric CAD angles clamped so circuit NEVER flips backwards
    let rotX = 0.16;  // ~9° pitch
    let rotY = -0.12; // ~-7° yaw
    let targetRotX = rotX;
    let targetRotY = rotY;

    // Drag interaction
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const onPointerDown = (clientX: number, clientY: number) => {
      if (!interactive) return;
      isDragging = true;
      startX = clientX;
      startY = clientY;
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      if (!isDragging) return;
      const dx = clientX - startX;
      const dy = clientY - startY;
      startX = clientX;
      startY = clientY;

      // Clamp yaw and pitch within a safe range so circuit never flips or mirrors
      targetRotY = Math.max(-0.35, Math.min(0.35, targetRotY + dx * 0.005));
      targetRotX = Math.max(-0.25, Math.min(0.35, targetRotX - dy * 0.005));
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

    // 3D Perspective Projection Function
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

      const scale = fov / (fov + z2 + 280);
      return {
        x2d: cx + x2 * scale,
        y2d: cy + y2 * scale,
        z: z2,
        scale,
      };
    };

    let frame = 0;
    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      const deltaMs = time - lastTime;
      lastTime = time;
      frame++;

      // Update telemetry every 15 frames
      if (frame % 15 === 0 && deltaMs > 0) {
        const curA = inputsRef.current.a;
        const curB = inputsRef.current.b;
        const curCin = inputsRef.current.cin;
        const curXor1 = curA !== curB;
        const curAnd1 = curA && curB;
        const curSum = curXor1 !== curCin;
        const curAnd2 = curXor1 && curCin;
        const curCout = curAnd1 || curAnd2;
        const decVal = (curA ? 1 : 0) + (curB ? 1 : 0) + (curCin ? 1 : 0);

        setTelemetry({
          fps: Math.min(Math.round(1000 / deltaMs), 60),
          rotX: parseFloat(((rotX * 180) / Math.PI).toFixed(1)),
          rotY: parseFloat(((rotY * 180) / Math.PI).toFixed(1)),
          stepIndex: (curA ? 4 : 0) + (curB ? 2 : 0) + (curCin ? 1 : 0),
          sum: curSum ? 1 : 0,
          cout: curCout ? 1 : 0,
          formula: `${curA ? 1 : 0} + ${curB ? 1 : 0} + ${curCin ? 1 : 0} = ${decVal} (Sum:${curSum ? 1 : 0}, Cout:${curCout ? 1 : 0})`,
        });
      }

      // Smooth physics damping toward target angles
      rotX += (targetRotX - rotX) * 0.1;
      rotY += (targetRotY - rotY) * 0.1;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width || size;
      const height = rect.height || (size * 0.7);

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 440;
      const currentMode = modeRef.current;

      // Ambient background glow
      const gridR = width * 0.44;
      const gridGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, gridR);
      gridGrad.addColorStop(0, "rgba(0, 245, 212, 0.05)");
      gridGrad.addColorStop(0.6, "rgba(121, 40, 202, 0.03)");
      gridGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gridGrad;
      ctx.fillRect(0, 0, width, height);

      // ANSI Logic Gate Shape Renderers (clean, authentic vector paths)
      const drawAndGate = (
        c: CanvasRenderingContext2D,
        center: { x: number; y: number; z: number },
        w: number,
        h: number,
        active: boolean,
        label: string
      ) => {
        const p = project(center.x, center.y, center.z, rotX, rotY, cx, cy, fov);
        const gw = w * p.scale;
        const gh = h * p.scale;
        const left = p.x2d - gw / 2;
        const top = p.y2d - gh / 2;

        c.save();
        c.beginPath();
        c.moveTo(left, top);
        c.lineTo(left + gw * 0.5, top);
        c.arc(left + gw * 0.5, p.y2d, gh / 2, -Math.PI / 2, Math.PI / 2);
        c.lineTo(left, top + gh);
        c.closePath();

        c.fillStyle = active ? "rgba(0, 245, 212, 0.12)" : "rgba(30, 41, 59, 0.6)";
        c.fill();
        c.strokeStyle = active ? "#00F5D4" : "rgba(100, 116, 139, 0.65)";
        c.lineWidth = active ? 2 : 1.3;
        c.stroke();

        c.fillStyle = active ? "#00F5D4" : "rgba(148, 163, 184, 0.85)";
        c.font = `bold ${Math.max(9, Math.round(10 * p.scale))}px 'JetBrains Mono', monospace`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText(label, p.x2d - gw * 0.08, p.y2d);
        c.restore();
      };

      const drawOrGate = (
        c: CanvasRenderingContext2D,
        center: { x: number; y: number; z: number },
        w: number,
        h: number,
        active: boolean,
        label: string
      ) => {
        const p = project(center.x, center.y, center.z, rotX, rotY, cx, cy, fov);
        const gw = w * p.scale;
        const gh = h * p.scale;
        const left = p.x2d - gw / 2;
        const right = p.x2d + gw / 2;
        const top = p.y2d - gh / 2;
        const bottom = p.y2d + gh / 2;

        c.save();
        c.beginPath();
        c.moveTo(left, top);
        c.quadraticCurveTo(left + gw * 0.28, p.y2d, left, bottom);
        c.quadraticCurveTo(left + gw * 0.65, bottom - gh * 0.08, right, p.y2d);
        c.quadraticCurveTo(left + gw * 0.65, top + gh * 0.08, left, top);
        c.closePath();

        c.fillStyle = active ? "rgba(245, 158, 11, 0.12)" : "rgba(30, 41, 59, 0.6)";
        c.fill();
        c.strokeStyle = active ? "#F59E0B" : "rgba(100, 116, 139, 0.65)";
        c.lineWidth = active ? 2 : 1.3;
        c.stroke();

        c.fillStyle = active ? "#F59E0B" : "rgba(148, 163, 184, 0.85)";
        c.font = `bold ${Math.max(9, Math.round(10 * p.scale))}px 'JetBrains Mono', monospace`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText(label, p.x2d - gw * 0.05, p.y2d);
        c.restore();
      };

      const drawXorGate = (
        c: CanvasRenderingContext2D,
        center: { x: number; y: number; z: number },
        w: number,
        h: number,
        active: boolean,
        label: string
      ) => {
        const p = project(center.x, center.y, center.z, rotX, rotY, cx, cy, fov);
        const gw = w * p.scale;
        const gh = h * p.scale;
        const left = p.x2d - gw / 2;
        const right = p.x2d + gw / 2;
        const top = p.y2d - gh / 2;
        const bottom = p.y2d + gh / 2;

        c.save();
        c.beginPath();
        c.moveTo(left - gw * 0.14, top);
        c.quadraticCurveTo(left + gw * 0.14, p.y2d, left - gw * 0.14, bottom);
        c.strokeStyle = active ? "#A855F7" : "rgba(100, 116, 139, 0.65)";
        c.lineWidth = active ? 2 : 1.3;
        c.stroke();

        c.beginPath();
        c.moveTo(left, top);
        c.quadraticCurveTo(left + gw * 0.28, p.y2d, left, bottom);
        c.quadraticCurveTo(left + gw * 0.65, bottom - gh * 0.08, right, p.y2d);
        c.quadraticCurveTo(left + gw * 0.65, top + gh * 0.08, left, top);
        c.closePath();

        c.fillStyle = active ? "rgba(168, 85, 247, 0.14)" : "rgba(30, 41, 59, 0.6)";
        c.fill();
        c.strokeStyle = active ? "#A855F7" : "rgba(100, 116, 139, 0.65)";
        c.lineWidth = active ? 2 : 1.3;
        c.stroke();

        c.fillStyle = active ? "#D8B4FE" : "rgba(148, 163, 184, 0.85)";
        c.font = `bold ${Math.max(9, Math.round(10 * p.scale))}px 'JetBrains Mono', monospace`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText(label, p.x2d - gw * 0.05, p.y2d);
        c.restore();
      };

      const drawLogicWire = (
        c: CanvasRenderingContext2D,
        waypoints: { x: number; y: number; z: number }[],
        isHigh: boolean,
        colorHigh: string = "#00F5D4"
      ) => {
        if (waypoints.length < 2) return;
        const proj = waypoints.map((pt) => project(pt.x, pt.y, pt.z, rotX, rotY, cx, cy, fov));

        c.save();
        c.beginPath();
        c.moveTo(proj[0].x2d, proj[0].y2d);
        for (let i = 1; i < proj.length; i++) {
          c.lineTo(proj[i].x2d, proj[i].y2d);
        }

        if (isHigh) {
          c.strokeStyle = colorHigh;
          c.lineWidth = 2.2;
          c.shadowColor = colorHigh;
          c.shadowBlur = 6;
          c.stroke();
        } else {
          c.strokeStyle = "rgba(71, 85, 105, 0.45)";
          c.lineWidth = 1.3;
          c.stroke();
        }
        c.restore();
      };

      const drawPinBadge = (
        c: CanvasRenderingContext2D,
        pt: { x: number; y: number; z: number },
        label: string,
        isHigh: boolean,
        align: "left" | "right" | "top" | "bottom" = "left",
        badgeColor: string = "#00F5D4"
      ) => {
        const p = project(pt.x, pt.y, pt.z, rotX, rotY, cx, cy, fov);
        c.save();

        c.beginPath();
        c.arc(p.x2d, p.y2d, 4.5 * p.scale, 0, Math.PI * 2);
        c.fillStyle = isHigh ? badgeColor : "rgba(30, 41, 59, 0.9)";
        c.strokeStyle = isHigh ? "#ffffff" : "rgba(100, 116, 139, 0.8)";
        c.lineWidth = 1.4;
        c.fill();
        c.stroke();

        c.font = `bold ${Math.max(9, Math.round(9.5 * p.scale))}px 'JetBrains Mono', monospace`;
        c.textAlign = align === "left" ? "right" : align === "right" ? "left" : "center";
        c.textBaseline = "middle";

        const offset = 9 * p.scale;
        const textX = align === "left" ? p.x2d - offset : align === "right" ? p.x2d + offset : p.x2d;
        const textY = align === "top" ? p.y2d - offset : align === "bottom" ? p.y2d + offset : p.y2d;

        c.fillStyle = isHigh ? badgeColor : "rgba(148, 163, 184, 0.75)";
        c.fillText(`${label}=${isHigh ? "1" : "0"}`, textX, textY);
        c.restore();
      };

      // =========================================================================
      // MODE 1: VERIFIABLE 1-BIT ALU FULL ADDER DIGITAL LOGIC CIRCUIT
      // =========================================================================
      if (currentMode === "logic") {
        const curA = inputsRef.current.a;
        const curB = inputsRef.current.b;
        const curCin = inputsRef.current.cin;
        const curXor1 = curA !== curB;
        const curAnd1 = curA && curB;
        const curSum = curXor1 !== curCin;
        const curAnd2 = curXor1 && curCin;
        const curCout = curAnd1 || curAnd2;

        // Clean, well-proportioned 3D Schematic Substrate Plane
        const plateCorners = [
          { x: -160, y: -100, z: -10 },
          { x: 165, y: -100, z: -10 },
          { x: 165, y: 100, z: -10 },
          { x: -160, y: 100, z: -10 },
        ];
        const projCorners = plateCorners.map((pt) => project(pt.x, pt.y, pt.z, rotX, rotY, cx, cy, fov));
        ctx.beginPath();
        ctx.moveTo(projCorners[0].x2d, projCorners[0].y2d);
        for (let i = 1; i < projCorners.length; i++) ctx.lineTo(projCorners[i].x2d, projCorners[i].y2d);
        ctx.closePath();
        ctx.fillStyle = "rgba(10, 15, 26, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 245, 212, 0.25)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Architectural title on plane
        ctx.fillStyle = "rgba(0, 245, 212, 0.5)";
        ctx.font = "8px 'JetBrains Mono', monospace";
        ctx.fillText("CIRCUIT: 1-BIT FULL ADDER ALU", projCorners[0].x2d + 10, projCorners[0].y2d + 13);

        // Scaled, perfectly centered coordinates (left-to-right flow)
        // Inputs on Left
        const pinA = { x: -140, y: -65, z: 0 };
        const pinB = { x: -140, y: -24, z: 0 };
        const pinCin = { x: -140, y: 55, z: 0 };

        // Stage 1 Gates: XOR1 and AND1
        const center_XOR1 = { x: -50, y: -50, z: 0 };
        const in1_XOR1 = { x: -70, y: -60, z: 0 };
        const in2_XOR1 = { x: -70, y: -40, z: 0 };
        const out_XOR1 = { x: -30, y: -50, z: 0 };

        const center_AND1 = { x: -50, y: 8, z: 0 };
        const in1_AND1 = { x: -70, y: 0, z: 0 };
        const in2_AND1 = { x: -70, y: 16, z: 0 };
        const out_AND1 = { x: -30, y: 8, z: 0 };

        // Stage 2 Gates: XOR2 and AND2
        const center_XOR2 = { x: 40, y: -38, z: 0 };
        const in1_XOR2 = { x: 20, y: -48, z: 0 };
        const in2_XOR2 = { x: 20, y: -28, z: 0 };
        const out_XOR2 = { x: 60, y: -38, z: 0 };

        const center_AND2 = { x: 40, y: 25, z: 0 };
        const in1_AND2 = { x: 20, y: 17, z: 0 };
        const in2_AND2 = { x: 20, y: 33, z: 0 };
        const out_AND2 = { x: 60, y: 25, z: 0 };

        // Stage 3 Gate: OR1 (computes Cout)
        const center_OR1 = { x: 105, y: 42, z: 0 };
        const in1_OR1 = { x: 85, y: 32, z: 0 };
        const in2_OR1 = { x: 85, y: 52, z: 0 };
        const out_OR1 = { x: 125, y: 42, z: 0 };

        // Outputs on Right
        const pinSum = { x: 145, y: -38, z: 0 };
        const pinCout = { x: 145, y: 42, z: 0 };

        // 1. Draw Wires with Real Boolean States
        // Input A Wire -> XOR1 in1 & branch down to AND1 in1
        drawLogicWire(ctx, [pinA, { x: -105, y: -65, z: 0 }, { x: -105, y: -60, z: 0 }, in1_XOR1], curA, "#00F5D4");
        drawLogicWire(ctx, [{ x: -105, y: -65, z: 0 }, { x: -105, y: 0, z: 0 }, in1_AND1], curA, "#00F5D4");

        // Input B Wire -> XOR1 in2 & branch down to AND1 in2
        drawLogicWire(ctx, [pinB, { x: -92, y: -24, z: 0 }, { x: -92, y: -40, z: 0 }, in2_XOR1], curB, "#00F5D4");
        drawLogicWire(ctx, [{ x: -92, y: -24, z: 0 }, { x: -92, y: 16, z: 0 }, in2_AND1], curB, "#00F5D4");

        // Input Cin Wire -> XOR2 in2 & branch to AND2 in2
        drawLogicWire(ctx, [pinCin, { x: 0, y: 55, z: 0 }, { x: 0, y: -28, z: 0 }, in2_XOR2], curCin, "#00F5D4");
        drawLogicWire(ctx, [{ x: 0, y: 55, z: 0 }, { x: 0, y: 33, z: 0 }, in2_AND2], curCin, "#00F5D4");

        // XOR1 Output Wire -> XOR2 in1 & branch to AND2 in1
        drawLogicWire(ctx, [out_XOR1, { x: -8, y: -50, z: 0 }, { x: -8, y: -48, z: 0 }, in1_XOR2], curXor1, "#A855F7");
        drawLogicWire(ctx, [{ x: -8, y: -50, z: 0 }, { x: -8, y: 17, z: 0 }, in1_AND2], curXor1, "#A855F7");

        // AND1 Output Wire -> OR1 in1
        drawLogicWire(ctx, [out_AND1, { x: 72, y: 8, z: 0 }, { x: 72, y: 32, z: 0 }, in1_OR1], curAnd1, "#F59E0B");

        // AND2 Output Wire -> OR1 in2
        drawLogicWire(ctx, [out_AND2, { x: 72, y: 25, z: 0 }, { x: 72, y: 52, z: 0 }, in2_OR1], curAnd2, "#F59E0B");

        // XOR2 Output Wire -> Sum Output Pin
        drawLogicWire(ctx, [out_XOR2, pinSum], curSum, "#00F5D4");

        // OR1 Output Wire -> Cout Output Pin
        drawLogicWire(ctx, [out_OR1, pinCout], curCout, "#F59E0B");

        // 2. Draw ANSI Logic Gates
        const gateW = 40;
        const gateH = 28;
        drawXorGate(ctx, center_XOR1, gateW, gateH, curXor1, "XOR₁");
        drawAndGate(ctx, center_AND1, gateW, gateH, curAnd1, "AND₁");
        drawXorGate(ctx, center_XOR2, gateW, gateH, curSum, "XOR₂");
        drawAndGate(ctx, center_AND2, gateW, gateH, curAnd2, "AND₂");
        drawOrGate(ctx, center_OR1, gateW, gateH, curCout, "OR₁");

        // 3. Draw Input & Output Terminal Badges
        drawPinBadge(ctx, pinA, "A", curA, "left", "#00F5D4");
        drawPinBadge(ctx, pinB, "B", curB, "left", "#00F5D4");
        drawPinBadge(ctx, pinCin, "C_IN", curCin, "left", "#00F5D4");

        drawPinBadge(ctx, pinSum, "SUM", curSum, "right", "#00F5D4");
        drawPinBadge(ctx, pinCout, "C_OUT", curCout, "right", "#F59E0B");
      }

      // =========================================================================
      // MODE 2: MULTI-LAYER SILICON DIE ARCHITECTURE
      // =========================================================================
      else if (currentMode === "die") {
        const chipRadius = width * 0.32;
        const layerSeparation = chipRadius * 0.38;

        const baseCorners = [
          { x: -chipRadius * 0.8, y: -chipRadius * 0.8 },
          { x: chipRadius * 0.8, y: -chipRadius * 0.8 },
          { x: chipRadius * 0.8, y: chipRadius * 0.8 },
          { x: -chipRadius * 0.8, y: chipRadius * 0.8 },
        ];

        const drawLayerPlane = (layerZ: number, strokeCol: string, fillCol: string, label: string) => {
          const projC = baseCorners.map((c) => project(c.x, c.y, layerZ, rotX, rotY, cx, cy, fov));
          ctx.beginPath();
          ctx.moveTo(projC[0].x2d, projC[0].y2d);
          for (let i = 1; i < projC.length; i++) ctx.lineTo(projC[i].x2d, projC[i].y2d);
          ctx.closePath();
          ctx.fillStyle = fillCol;
          ctx.fill();
          ctx.strokeStyle = strokeCol;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          ctx.fillStyle = strokeCol;
          ctx.font = "9px 'JetBrains Mono', monospace";
          ctx.fillText(label, projC[0].x2d - 10, projC[0].y2d - 6);
        };

        drawLayerPlane(-layerSeparation, "rgba(245, 158, 11, 0.4)", "rgba(245, 158, 11, 0.03)", "LAYER 0: SUBSTRATE");
        drawLayerPlane(0, "rgba(0, 245, 212, 0.5)", "rgba(0, 245, 212, 0.04)", "LAYER 1: COMPUTE CORE");
        drawLayerPlane(layerSeparation, "rgba(168, 85, 247, 0.4)", "rgba(168, 85, 247, 0.02)", "LAYER 2: METAL INTERCONNECT");

        // Microprocessor Blocks on Die
        const dieBlocks = [
          { name: "VECTOR ALU", x: -chipRadius * 0.45, y: -chipRadius * 0.45, w: chipRadius * 0.4, h: chipRadius * 0.4, color: "#00F5D4" },
          { name: "REG FILE", x: chipRadius * 0.05, y: -chipRadius * 0.45, w: chipRadius * 0.4, h: chipRadius * 0.22, color: "#A855F7" },
          { name: "L1 CACHE", x: chipRadius * 0.05, y: -chipRadius * 0.18, w: chipRadius * 0.4, h: chipRadius * 0.18, color: "#EC4899" },
          { name: "BUS MATRIX", x: -chipRadius * 0.45, y: chipRadius * 0.05, w: chipRadius * 0.9, h: chipRadius * 0.15, color: "#F59E0B" },
          { name: "DMA & TELEMETRY", x: -chipRadius * 0.45, y: chipRadius * 0.26, w: chipRadius * 0.42, h: chipRadius * 0.22, color: "#38BDF8" },
          { name: "SPI/I2C CONTROLLER", x: chipRadius * 0.03, y: chipRadius * 0.26, w: chipRadius * 0.42, h: chipRadius * 0.22, color: "#10B981" },
        ];

        dieBlocks.forEach((b) => {
          const corners = [
            project(b.x, b.y, 0, rotX, rotY, cx, cy, fov),
            project(b.x + b.w, b.y, 0, rotX, rotY, cx, cy, fov),
            project(b.x + b.w, b.y + b.h, 0, rotX, rotY, cx, cy, fov),
            project(b.x, b.y + b.h, 0, rotX, rotY, cx, cy, fov),
          ];

          ctx.beginPath();
          ctx.moveTo(corners[0].x2d, corners[0].y2d);
          for (let i = 1; i < corners.length; i++) ctx.lineTo(corners[i].x2d, corners[i].y2d);
          ctx.closePath();
          ctx.fillStyle = `${b.color}15`;
          ctx.fill();
          ctx.strokeStyle = `${b.color}90`;
          ctx.lineWidth = 1.3;
          ctx.stroke();

          const center = project(b.x + b.w / 2, b.y + b.h / 2, 0, rotX, rotY, cx, cy, fov);
          ctx.fillStyle = b.color;
          ctx.font = `bold ${Math.max(8, 9 * center.scale)}px 'JetBrains Mono', monospace`;
          ctx.textAlign = "center";
          ctx.fillText(b.name, center.x2d, center.y2d + 3);
          ctx.textAlign = "left";
        });

        // Vertical Through-Silicon Vias (TSVs)
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
      }

      // =========================================================================
      // MODE 3: PCB MAINBOARD & COMPONENT FOOTPRINTS
      // =========================================================================
      else if (currentMode === "pcb") {
        const chipRadius = width * 0.32;
        const pcbCorners = [
          { x: -chipRadius * 0.9, y: -chipRadius * 0.9 },
          { x: chipRadius * 0.9, y: -chipRadius * 0.9 },
          { x: chipRadius * 0.9, y: chipRadius * 0.9 },
          { x: -chipRadius * 0.9, y: chipRadius * 0.9 },
        ];
        const projCorners = pcbCorners.map((pt) => project(pt.x, pt.y, 0, rotX, rotY, cx, cy, fov));
        ctx.beginPath();
        ctx.moveTo(projCorners[0].x2d, projCorners[0].y2d);
        for (let i = 1; i < projCorners.length; i++) ctx.lineTo(projCorners[i].x2d, projCorners[i].y2d);
        ctx.closePath();
        ctx.fillStyle = "rgba(6, 44, 30, 0.4)";
        ctx.fill();
        ctx.strokeStyle = "rgba(16, 185, 129, 0.6)";
        ctx.lineWidth = 1.4;
        ctx.stroke();

        const smdChips = [
          { x: -chipRadius * 0.45, y: -chipRadius * 0.45, w: chipRadius * 0.38, h: chipRadius * 0.38, label: "MCU (ARM-M4)" },
          { x: chipRadius * 0.1, y: -chipRadius * 0.45, w: chipRadius * 0.35, h: chipRadius * 0.25, label: "EEPROM (I2C)" },
          { x: -chipRadius * 0.45, y: chipRadius * 0.1, w: chipRadius * 0.25, h: chipRadius * 0.25, label: "16MHz XTAL" },
          { x: 0, y: chipRadius * 0.1, w: chipRadius * 0.45, h: chipRadius * 0.3, label: "3.3V LDO REG" },
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
          ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
          ctx.fill();
          ctx.strokeStyle = "#10B981";
          ctx.lineWidth = 1.4;
          ctx.stroke();

          const center = project(chip.x + chip.w / 2, chip.y + chip.h / 2, 0, rotX, rotY, cx, cy, fov);
          ctx.fillStyle = "#E2E8F0";
          ctx.font = "8px 'JetBrains Mono', monospace";
          ctx.textAlign = "center";
          ctx.fillText(chip.label, center.x2d, center.y2d + 3);
          ctx.textAlign = "left";
        });
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      observer.disconnect();
    };
  }, [interactive, size, stepTruthTable]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[500px] h-[520px] mx-auto rounded-3xl bg-black/50 border border-white/[0.08] backdrop-blur-2xl p-4 flex flex-col justify-between overflow-hidden shadow-2xl group select-none ${className}`}
    >
      {/* Background Silicon Glow */}
      <div className="absolute -top-14 -right-14 w-72 h-72 rounded-full bg-gradient-to-tr from-cyan-500/20 via-violet-600/15 to-transparent blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-14 -left-14 w-72 h-72 rounded-full bg-gradient-to-tr from-amber-500/15 via-emerald-500/10 to-transparent blur-[90px] pointer-events-none" />

      {/* Top Header: Architecture Modes */}
      <div className="relative z-10 shrink-0 flex flex-wrap items-center justify-between gap-1.5 border-b border-white/[0.06] pb-2 text-xs font-mono">
        {/* Architecture Mode Selector */}
        <div className="flex items-center gap-1 p-0.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <button
            type="button"
            onClick={() => setActiveMode("logic")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              activeMode === "logic"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
            title="Real 1-Bit Full Adder ALU slice: Authentic Boolean logic gates with verifiable inputs & outputs"
          >
            <Binary className="w-3 h-3 text-cyan-400" />
            <span>Logic Gates (ALU)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("die")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              activeMode === "die"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
            title="Silicon Die: Multi-layer microprocessor architecture with exploded elevation"
          >
            <Cpu className="w-3 h-3 text-purple-400" />
            <span>Silicon Die</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("pcb")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              activeMode === "pcb"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
            title="PCB Mainboard: Component footprints & traces"
          >
            <CircuitBoard className="w-3 h-3 text-emerald-400" />
            <span>PCB Matrix</span>
          </button>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-1 text-[11px]">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 font-medium">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>1-BIT ALU</span>
          </span>
        </div>
      </div>

      {/* Interactive Circuit Switch Bar (Only shown in Logic mode) */}
      {activeMode === "logic" && (
        <div className="relative z-10 shrink-0 flex flex-wrap items-center justify-between gap-1.5 mt-2.5 px-2.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-text-muted uppercase tracking-wider">Inputs:</span>
            
            <button
              type="button"
              onClick={() => setInputA(!inputA)}
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all border ${
                inputA
                  ? "bg-cyan-500/25 text-cyan-300 border-cyan-400/50 shadow-sm shadow-cyan-500/20"
                  : "bg-white/[0.04] text-text-muted border-white/10 hover:text-white"
              }`}
              title="Click to toggle Input A (0 or 1)"
            >
              A: {inputA ? "1" : "0"}
            </button>

            <button
              type="button"
              onClick={() => setInputB(!inputB)}
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all border ${
                inputB
                  ? "bg-cyan-500/25 text-cyan-300 border-cyan-400/50 shadow-sm shadow-cyan-500/20"
                  : "bg-white/[0.04] text-text-muted border-white/10 hover:text-white"
              }`}
              title="Click to toggle Input B (0 or 1)"
            >
              B: {inputB ? "1" : "0"}
            </button>

            <button
              type="button"
              onClick={() => setInputCin(!inputCin)}
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all border ${
                inputCin
                  ? "bg-cyan-500/25 text-cyan-300 border-cyan-400/50 shadow-sm shadow-cyan-500/20"
                  : "bg-white/[0.04] text-text-muted border-white/10 hover:text-white"
              }`}
              title="Click to toggle Carry In (0 or 1)"
            >
              C_IN: {inputCin ? "1" : "0"}
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => stepTruthTable(true)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors"
              title="Step to next truth table combination"
            >
              <span>Step Vector</span>
              <ChevronRight className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={() => setAutoClock(!autoClock)}
              className={`p-1 rounded-md transition-all border ${
                autoClock
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-white/[0.04] text-text-muted border-white/10 hover:text-white"
              }`}
              title={autoClock ? "Pause auto clock" : "Run continuous clock generator"}
            >
              {autoClock ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>
        </div>
      )}

      {/* Main 3D Canvas (Dynamically fills available space with zero clipping) */}
      <div className="relative w-full flex-1 min-h-0 flex items-center justify-center my-1">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
          title="Drag to inspect circuit in 3D perspective"
        />
      </div>

      {/* Bottom Telemetry & Real Boolean Computation Output */}
      <div className="relative z-10 shrink-0 flex items-center justify-between text-[11px] font-mono text-text-muted pt-2.5 pb-0.5 border-t border-white/[0.08]">
        {activeMode === "logic" ? (
          <div className="flex items-center gap-2 flex-wrap w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">
                ALU OUT: <strong className="text-cyan-300">SUM={telemetry.sum}</strong>, <strong className="text-amber-300">C_OUT={telemetry.cout}</strong>
              </span>
              <span className="text-text-muted/70 text-[10px]">
                ({telemetry.formula})
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
              <span className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/10 text-cyan-300">Vector #{telemetry.stepIndex}/7</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full text-[10px]">
            <div className="flex items-center gap-3">
              <span>PITCH: <strong className="text-cyan-300">{telemetry.rotX}°</strong></span>
              <span>YAW: <strong className="text-purple-300">{telemetry.rotY}°</strong></span>
            </div>
            <span>Drag to rotate</span>
          </div>
        )}
      </div>
    </div>
  );
}
