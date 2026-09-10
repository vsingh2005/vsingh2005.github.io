"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  MapPin,
  FileDown,
  Cpu,
  Cloud,
  CheckCircle2,
  Compass,
  Zap
} from "lucide-react";
import { PERSONAL_INFO, EDUCATIONS } from "@/data/portfolioData";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-20">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-xs font-mono text-accent-cyan">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About Vansh</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight">
          Computer Engineering &{" "}
          <span className="text-gradient-purple">Applied Systems</span>
        </h1>
        <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
          I hold a B.S. in Computer Engineering and am currently pursuing my Master of Science in Business Analytics (MSBA) at the University of Massachusetts Amherst. I work across cloud infrastructure, embedded mechatronics, and applied data systems.
        </p>
      </div>

      {/* Narrative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Narrative Story */}
        <div className="lg:col-span-7 space-y-8">
          <div className="p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-5">
            <h2 className="text-2xl font-display font-bold text-white">
              Background & Interests
            </h2>
            <div className="space-y-4 text-text-secondary text-sm sm:text-base leading-relaxed">
              <p>
                My foundation started in embedded systems and low-level computing. Working with microcontrollers, FPGA logic (SystemVerilog), and circuit simulation gave me a practical understanding of how hardware executes code, from clock cycles to hardware interrupts.
              </p>
              <p>
                At <strong className="text-white">UMass Amherst IT</strong>, I applied this systems approach to cloud infrastructure. Using Terraform and Docker, I automated infrastructure deployments across AWS, cutting provisioning time by 40% while building self-healing monitoring scripts in Python and Bash.
              </p>
              <p>
                In academic research, I explored <strong className="text-white">hybrid quantum-classical neural networks</strong>. Pairing convolutional feature extractors with parameterized variational quantum circuits on AWS Braket using PennyLane, I evaluated parameter efficiency on high-dimensional quantum states.
              </p>
            </div>
          </div>

          {/* Core Principles */}
          <div className="p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-6">
            <h3 className="text-xl font-display font-bold text-white">
              Engineering Focus
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-1.5">
                <div className="flex items-center gap-2 text-accent-cyan font-semibold text-sm">
                  <Zap className="w-4 h-4" />
                  <span>Low-Level Understanding</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Working from hardware registers, circuits, and timing signals up to cloud scale.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-1.5">
                <div className="flex items-center gap-2 text-accent-violet font-semibold text-sm">
                  <Compass className="w-4 h-4" />
                  <span>Hardware & Software Integration</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Bridging electrical schematics and firmware with scalable backend code.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-1.5">
                <div className="flex items-center gap-2 text-accent-blue font-semibold text-sm">
                  <Cloud className="w-4 h-4" />
                  <span>Reliable Automation</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Treating infrastructure as code, avoiding manual drifts, and writing automated health checks.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-1.5">
                <div className="flex items-center gap-2 text-accent-magenta font-semibold text-sm">
                  <BookOpen className="w-4 h-4" />
                  <span>Practical Teaching</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Teaching 150+ students through hands-on microcontroller and circuitry labs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Profile & Education */}
        <div className="lg:col-span-5 space-y-8">
          {/* Quick Profile Summary */}
          <div className="p-6 rounded-3xl glass-panel-glow border border-white/10 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 p-0.5 flex items-center justify-center shadow-lg">
                <div className="w-full h-full bg-background-deep rounded-2xl flex items-center justify-center font-display font-black text-lg text-cyan-300">
                  V
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">{PERSONAL_INFO.name}</h3>
                <p className="text-xs font-mono text-accent-cyan">Computer Engineer & Analyst</p>
                <div className="flex items-center gap-1.5 text-xs text-text-muted mt-1">
                  <MapPin className="w-3 h-3 text-text-muted" />
                  <span>Chicago, IL / Amherst, MA</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-text-muted">Status:</span>
                <span className="text-emerald-400 font-semibold">{PERSONAL_INFO.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-text-muted">Primary Focus:</span>
                <span className="text-white">Cloud IaC & Quantum ML</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-text-muted">Email:</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-accent-cyan hover:underline">
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="/Vansh_Singh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl font-medium text-xs text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 transition-all"
              >
                <FileDown className="w-4 h-4 text-accent-cyan" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Education Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent-cyan" />
              <span>Education</span>
            </h3>

            {EDUCATIONS.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-3 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono text-accent-cyan font-semibold">
                      {edu.college}
                    </span>
                    <h4 className="text-base font-display font-bold text-white mt-0.5">
                      {edu.degree} in {edu.field}
                    </h4>
                    <p className="text-xs text-text-muted">{edu.school}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/[0.04] text-text-secondary border border-white/[0.06] whitespace-nowrap">
                    Grad: {edu.graduation}
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-text-secondary pt-2">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-cyan shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-white/[0.06]">
                  <span className="text-[11px] font-mono text-text-muted block mb-1.5">
                    Coursework:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {edu.courses.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-text-secondary"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
