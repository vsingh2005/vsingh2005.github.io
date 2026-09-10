"use client";

import React, { useState } from "react";
import {
  Wrench,
  Code2,
  Cpu,
  Cloud,
  BrainCircuit,
  Search,
  CheckCircle2,
  Sparkles,
  Layers,
  Terminal,
  Zap
} from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-5 h-5 text-accent-cyan" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-accent-violet" />;
      case "Cloud":
        return <Cloud className="w-5 h-5 text-accent-blue" />;
      case "BrainCircuit":
        return <BrainCircuit className="w-5 h-5 text-accent-magenta" />;
      default:
        return <Wrench className="w-5 h-5 text-accent-cyan" />;
    }
  };

  const getLevelColor = (lvl: string) => {
    switch (lvl) {
      case "Advanced":
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/30";
      case "Specialized":
        return "bg-violet-500/10 text-violet-300 border-violet-500/30";
      default:
        return "bg-blue-500/10 text-blue-300 border-blue-500/30";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-xs font-mono text-accent-cyan">
          <Wrench className="w-3.5 h-3.5" />
          <span>Technical Competency</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight">
          Tools, Frameworks &{" "}
          <span className="text-gradient-cyan">Core Systems</span>
        </h1>
        <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
          Categorized technical stack spanning bare-metal firmware and circuit modeling to cloud orchestration and quantum machine learning.
        </p>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl glass-panel border border-white/[0.08]">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {["all", "Advanced", "Specialized", "Proficient"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                levelFilter === lvl
                  ? "bg-accent-blue/20 text-accent-cyan border border-accent-cyan/40"
                  : "text-text-secondary hover:text-white hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              {lvl === "all" ? "All Levels" : lvl}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skill (e.g. Python, AWS, C)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white placeholder:text-text-muted/60 focus:outline-none focus:border-accent-cyan/50"
          />
        </div>
      </div>

      {/* Categorized Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SKILL_CATEGORIES.map((cat) => {
          const matchingSkills = cat.skills.filter((s) => {
            const matchesLvl = levelFilter === "all" || s.level === levelFilter;
            const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (s.badge && s.badge.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesLvl && matchesSearch;
          });

          if (matchingSkills.length === 0) return null;

          return (
            <div
              key={cat.title}
              className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/[0.08] hover:border-white/20 transition-all duration-300 space-y-6 flex flex-col justify-between"
            >
              <div>
                {/* Category Title */}
                <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-white">
                      {cat.title}
                    </h2>
                    <p className="text-xs text-text-muted font-mono">{cat.tagline}</p>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6">
                  {matchingSkills.map((s) => (
                    <div
                      key={s.name}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/15 transition-all flex items-center justify-between gap-2"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">{s.name}</span>
                        {s.badge && (
                          <span className="text-[10px] font-mono text-text-muted">
                            {s.badge}
                          </span>
                        )}
                      </div>

                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${getLevelColor(s.level)}`}>
                        {s.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Footer Indicator */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-text-muted">
                <span>{matchingSkills.length} competencies listed</span>
                <span className="text-accent-cyan">Production Ready</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Systems Architecture Highlights */}
      <div className="p-8 sm:p-10 rounded-3xl glass-panel-glow border border-white/10 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan font-semibold">
            Architectural Domain Breakdown
          </span>
          <h2 className="text-2xl font-display font-bold text-white">
            Full-Spectrum Hardware & Cloud Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
            <span className="text-xs font-mono text-cyan-400 font-semibold">01 / Low-Level & Circuits</span>
            <h3 className="text-base font-bold text-white">Bare Metal & Simulation</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              LTSpice transient power electronics modeling, ARM Cortex microcontrollers, SystemVerilog register-transfer logic, and CNC prototyping.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
            <span className="text-xs font-mono text-blue-400 font-semibold">02 / Cloud & DevOps</span>
            <h3 className="text-base font-bold text-white">Terraform & AWS Scale</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Multi-tenant IaC blueprints, Docker microservices, automated telemetry daemons in Bash/Python, and zero-drift deployments.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
            <span className="text-xs font-mono text-violet-400 font-semibold">03 / Quantum & Analytics</span>
            <h3 className="text-base font-bold text-white">Variational Quantum ML</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              PennyLane parameterized quantum variational circuits, AWS Braket quantum processing unit pipelines, and enterprise predictive analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
