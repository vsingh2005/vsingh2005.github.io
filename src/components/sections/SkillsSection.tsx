"use client";

import React, { useState } from "react";
import { Wrench, Cloud, Cpu, Database, Terminal, Check, Sparkles } from "lucide-react";
import { BugsterStackMascot } from "@/components/graphics/BugsterStackMascot";

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const skillGroups = [
    {
      id: "cloud",
      title: "Cloud & Infrastructure as Code",
      icon: Cloud,
      color: "border-brand-cobalt text-brand-cobalt",
      skills: [
        { name: "Terraform (IaC)", level: "Production", badge: "Primary" },
        { name: "AWS (EC2, S3, IAM, VPC)", level: "Advanced", badge: "Core" },
        { name: "Docker Containers", level: "Production", badge: "Core" },
        { name: "AWS Braket (Quantum)", level: "Applied Research", badge: "Specialized" },
        { name: "Linux Server Administration", level: "Advanced", badge: "Daily" },
        { name: "CI/CD & GitHub Actions", level: "Production", badge: "Automation" },
      ],
    },
    {
      id: "embedded",
      title: "Embedded Systems & Hardware",
      icon: Cpu,
      color: "border-brand-ember text-brand-ember",
      skills: [
        { name: "C & C++ Systems", level: "Advanced", badge: "Core" },
        { name: "FreeRTOS & Embedded RTOS", level: "Advanced", badge: "Hardware" },
        { name: "STM32 & ESP32 Microcontrollers", level: "Advanced", badge: "Firmware" },
        { name: "LTSpice Circuit Simulation", level: "Advanced", badge: "Circuits" },
        { name: "SystemVerilog & Logic Design", level: "Proficient", badge: "Silicon" },
        { name: "UART, I2C, SPI Protocols", level: "Advanced", badge: "Bus" },
        { name: "PCB Design & Soldering", level: "Proficient", badge: "Physical" },
      ],
    },
    {
      id: "data",
      title: "Data Analytics & Machine Learning",
      icon: Database,
      color: "border-brand-amber text-brand-amber",
      skills: [
        { name: "Python", level: "Advanced", badge: "Primary" },
        { name: "PyTorch & Deep Learning", level: "Advanced", badge: "ML" },
        { name: "PennyLane (Quantum Neural Nets)", level: "Research", badge: "Specialized" },
        { name: "SQL & Relational Schemas", level: "Advanced", badge: "MSBA" },
        { name: "NumPy & Pandas Analytics", level: "Advanced", badge: "Data" },
        { name: "Edge AI / Camera Inference", level: "Applied", badge: "Vision" },
      ],
    },
    {
      id: "tools",
      title: "Toolchains & Development Core",
      icon: Terminal,
      color: "border-brand-slate text-brand-slate",
      skills: [
        { name: "Git & Version Control", level: "Advanced", badge: "Workflow" },
        { name: "Bash & Shell Scripting", level: "Advanced", badge: "Automation" },
        { name: "TypeScript & Next.js", level: "Proficient", badge: "Full-Stack" },
        { name: "FastAPI REST Services", level: "Advanced", badge: "Backend" },
        { name: "CMake & Makefiles", level: "Proficient", badge: "Build" },
        { name: "Wireshark Network Analysis", level: "Proficient", badge: "Security" },
      ],
    },
  ];

  const displayedGroups = activeTab === "all"
    ? skillGroups
    : skillGroups.filter((g) => g.id === activeTab);

  return (
    <section id="skills" className="py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cream border border-brand-amber/40 text-xs font-mono font-bold text-brand-navy">
              <Wrench className="w-3.5 h-3.5 text-brand-amber" />
              <span>Technical Toolchain</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-navy dark:text-white tracking-tight">
              Skills across the hardware-cloud stack
            </h2>
            <p className="text-base text-brand-slate dark:text-gray-300 leading-relaxed font-normal">
              Validated through production multi-tenant deployments, collegiate engineering competitions, and graduate quantitative analytics coursework.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-surface-darkCard border border-surface-lightBorder dark:border-surface-darkBorder shrink-0">
            {["all", "cloud", "embedded", "data", "tools"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  activeTab === tab
                    ? "bg-brand-ember text-white shadow-solid-sm"
                    : "text-brand-slate dark:text-gray-400 hover:text-brand-navy dark:hover:text-white"
                }`}
              >
                {tab === "all" ? "All Stack" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Card Layout: Mascot Box & Category Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Mascot Box (Bugster Inspired) */}
          <div className="lg:col-span-4 neo-card p-6 sm:p-7 rounded-3xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-surface-darkBorder shadow-solid-sm dark:shadow-none flex flex-col items-center justify-between text-center space-y-4">
            <div className="w-full text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-brand-cream border border-brand-amber/40 text-brand-navy font-mono text-[11px] font-bold">
                <Sparkles className="w-3 h-3 text-brand-amber" />
                <span>Zero Drift Philosophy</span>
              </div>
              <h3 className="text-lg font-bold text-brand-navy dark:text-white font-display mt-2">
                Built for Precision
              </h3>
              <p className="text-xs text-brand-slate dark:text-gray-400 mt-1 leading-relaxed">
                Whether routing PCB traces or configuring AWS IAM security boundaries, I prioritize predictable, repeatable systems.
              </p>
            </div>

            <BugsterStackMascot className="w-full py-2" />

            <div className="w-full pt-3 border-t border-surface-lightBorder dark:border-surface-darkBorder flex items-center justify-between text-[11px] font-mono text-brand-slate dark:text-gray-400">
              <span>Stack Health: 100%</span>
              <span className="text-emerald-500 font-bold">● Operational</span>
            </div>
          </div>

          {/* Right Column: Categorized Badges Grid */}
          <div className="lg:col-span-8 space-y-6">
            {displayedGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.id}
                  className="neo-card p-6 rounded-3xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-surface-darkBorder shadow-solid-sm dark:shadow-none space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-surface-lightBorder dark:border-surface-darkBorder pb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg border ${group.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-brand-navy dark:text-white font-display">
                        {group.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-brand-slate dark:text-gray-400">
                      {group.skills.length} competencies
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-surface-lightBorder dark:border-surface-darkBorder hover:border-brand-blue transition-all"
                      >
                        <Check className="w-3.5 h-3.5 text-brand-blue" />
                        <span className="text-xs font-mono font-medium text-brand-navy dark:text-gray-200">
                          {skill.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-surface-darkCard text-brand-slate dark:text-gray-400 border border-surface-lightBorder dark:border-surface-darkBorder">
                          {skill.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
