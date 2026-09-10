"use client";

import React, { useEffect, useState } from "react";

export function BackgroundAmbient() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic ambient radial gradients */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 transition-transform duration-700 ease-out"
        style={{
          background: "radial-gradient(circle, #3877FF 0%, #8A4FFF 100%)",
          left: `${mousePosition.x - 300}px`,
          top: `${mousePosition.y - 300}px`,
        }}
      />
      {/* Fixed atmospheric background glows */}
      <div className="absolute -top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-accent-blue/10 blur-[150px]" />
      <div className="absolute top-[45%] -right-[10%] w-[600px] h-[600px] rounded-full bg-accent-violet/10 blur-[180px]" />
      <div className="absolute -bottom-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-accent-cyan/10 blur-[160px]" />
      
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
    </div>
  );
}
