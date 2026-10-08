"use client";

import React, { useState } from "react";
import {
  Layers,
  Github,
  ExternalLink,
  Award,
  Zap,
  Cpu,
  BrainCircuit,
  Cloud,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { DevpostIcon } from "@/components/ui/DevpostIcon";

interface StarProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge?: string;
  situationTask: string;
  action: string;
  result: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  devpostUrl?: string;
}

export function ProjectsSection() {
  const projects: StarProject[] = [
    {
      id: "quantum-nn",
      title: "Quantum-Classical Hybrid Neural Network",
      subtitle: "Variational Quantum Circuits on AWS Braket with PennyLane",
      category: "Quantum & AI",
      badge: "Flagship Research",
      situationTask:
        "Classical deep learning networks face severe parameter bloat and slow convergence when learning non-linear feature representations across high-dimensional datasets.",
      action:
        "Architected a hybrid neural network integrating classical PyTorch convolutional front-ends with parameterized variational quantum circuits via PennyLane QNodes. Applied multi-qubit CNOT entanglement and parameter-shift gradient pipelines on AWS Braket state-vector simulators.",
      result:
        "Achieved 28% faster epoch convergence and 3.4x higher parameter efficiency compared to classical baselines, demonstrating quantum Hilbert space advantage for complex classification tasks.",
      metrics: [
        { label: "Epoch Convergence", value: "28% Faster" },
        { label: "Param Efficiency", value: "3.4x Boost" },
        { label: "Cloud Simulator", value: "AWS Braket" },
      ],
      technologies: ["PyTorch", "PennyLane", "AWS Braket", "Python", "NumPy"],
      githubUrl: "https://github.com/vsingh2005",
    },
    {
      id: "cloud-iac",
      title: "Multi-Tenant Cloud Infrastructure Automation",
      subtitle: "Automated AWS Environments via Modular Terraform",
      category: "Cloud & DevOps",
      badge: "Infrastructure",
      situationTask:
        "Manual cloud provisioning caused frequent configuration drift, slow developer onboarding, and unpredictable staging environment setup times.",
      action:
        "Engineered modular Infrastructure as Code (IaC) templates in Terraform spanning multi-tier VPCs, IAM least-privilege security boundaries, and Docker containerized microservices on AWS EC2/S3. Authored automated shell health monitoring daemons.",
      result:
        "Reduced environment provisioning and deployment time by 40%, eliminating configuration drift across all staging and production test clusters.",
      metrics: [
        { label: "Provisioning Speed", value: "40% Faster" },
        { label: "Config Drift", value: "Zero (100% IaC)" },
        { label: "Microservices", value: "6 Modules" },
      ],
      technologies: ["Terraform", "AWS (EC2/S3/IAM)", "Docker", "Linux", "Bash"],
      githubUrl: "https://github.com/vsingh2005",
    },
    {
      id: "asme-mechatronics",
      title: "Autonomous Rover & Mechatronics Drivetrain",
      subtitle: "Embedded Hardware & Closed-Loop Control Architecture",
      category: "Embedded & Hardware",
      badge: "2nd Place Global (ASME)",
      situationTask:
        "Needed an autonomous physical mechatronics rover capable of navigating harsh, variable terrain while delivering payloads under strict weight and battery power constraints.",
      action:
        "Led electrical engineering and sensor integration. Designed custom motor driver power regulation circuitry, modeled transient responses in LTSpice, and programmed bare-metal C microcontrollers for real-time sensor fusion and closed-loop motor telemetry.",
      result:
        "Earned 2nd Place Globally at the ASME IAM3D competition among 40+ international university teams with a 99.4% course completion rate and zero hardware electrical failures.",
      metrics: [
        { label: "Global Finish", value: "2nd Place" },
        { label: "Field Size", value: "40+ Universities" },
        { label: "Hardware Reliability", value: "100% Uptime" },
      ],
      technologies: ["Embedded C", "FreeRTOS", "LTSpice", "Power Electronics", "Sensors"],
      githubUrl: "https://github.com/vsingh2005",
    },
    {
      id: "wasteless",
      title: "WasteLess Edge AI Computer Vision",
      subtitle: "Automated Dining Waste Analytics with 60s Plate Caching",
      category: "AI & Full-Stack",
      badge: "Hack the Herd Winner",
      situationTask:
        "University dining facilities suffered massive food waste with zero real-time data due to the impossibility of manual weighing and tracking.",
      action:
        "Built an edge neural network connected to overhead camera sensors to identify discarded food categories in real time. Implemented a 60-second sliding-window plate deduplication caching pipeline and streamed analytics to a live dashboard.",
      result:
        "Successfully tracked over 450 cafeteria interactions during live deployment, reducing logging latency to under 300ms with zero duplicate plate count errors.",
      metrics: [
        { label: "Inference Latency", value: "< 300ms" },
        { label: "Plate Deduplication", value: "60s Window" },
        { label: "Live Interactions", value: "450+ Tested" },
      ],
      technologies: ["Python", "FastAPI", "Computer Vision", "Docker", "Devpost"],
      githubUrl: "https://github.com/vsingh2005/HackTheHerd2025",
      devpostUrl: "https://devpost.com/software/wasteless-lkvgnz",
    },
  ];

  return (
    <section id="projects" className="py-16 sm:py-24 scroll-mt-20 border-t border-surface-lightBorder dark:border-surface-darkBorder bg-surface-light/50 dark:bg-surface-dark/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-coral/15 border border-brand-coral/40 text-xs font-mono font-bold text-brand-coral">
            <Layers className="w-3.5 h-3.5" />
            <span>Case Studies (STAR Framework)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-navy dark:text-white tracking-tight">
            Featured engineering case studies
          </h2>
          <p className="text-base text-brand-slate dark:text-gray-300 leading-relaxed font-normal">
            Detailed breakdowns using the Situation, Task, Action, and Result (STAR) framework with verifiable code and quantifiable outcomes.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="neo-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-surface-darkBorder shadow-solid dark:shadow-none flex flex-col justify-between space-y-6"
            >
              {/* Card Header & Badge */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-cream text-brand-navy border border-brand-amber/40">
                    {proj.category}
                  </span>
                  {proj.badge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-ember/15 text-brand-ember border border-brand-ember/30">
                      <Award className="w-3.5 h-3.5 text-brand-ember" />
                      <span>{proj.badge}</span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-brand-navy dark:text-white tracking-tight">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-brand-cobalt font-semibold mt-1">
                    {proj.subtitle}
                  </p>
                </div>
              </div>

              {/* STAR Breakdown */}
              <div className="space-y-3.5 text-xs leading-relaxed">
                {/* Challenge */}
                <div className="p-3 rounded-2xl bg-surface-light dark:bg-surface-dark border border-surface-lightBorder dark:border-surface-darkBorder space-y-1">
                  <span className="font-mono font-bold text-brand-ember uppercase tracking-wider text-[11px] block">
                    [Challenge / Situation]
                  </span>
                  <p className="text-brand-slate dark:text-gray-300 font-normal">
                    {proj.situationTask}
                  </p>
                </div>

                {/* Engineering Action */}
                <div className="p-3 rounded-2xl bg-surface-light dark:bg-surface-dark border border-surface-lightBorder dark:border-surface-darkBorder space-y-1">
                  <span className="font-mono font-bold text-brand-cobalt uppercase tracking-wider text-[11px] block">
                    [Architecture / Action]
                  </span>
                  <p className="text-brand-slate dark:text-gray-300 font-normal">
                    {proj.action}
                  </p>
                </div>

                {/* Quantifiable Result */}
                <div className="p-3 rounded-2xl bg-brand-cream/80 dark:bg-brand-charcoal/80 border border-brand-amber/40 dark:border-brand-cobalt/30 space-y-1">
                  <span className="font-mono font-bold text-brand-navy dark:text-brand-amber uppercase tracking-wider text-[11px] block flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>[Quantified Impact / Result]</span>
                  </span>
                  <p className="text-brand-navy dark:text-gray-200 font-medium">
                    {proj.result}
                  </p>
                </div>
              </div>

              {/* Metrics Highlights Bar */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {proj.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-surface-lightBorder dark:border-surface-darkBorder text-center"
                  >
                    <span className="text-[10px] font-mono text-brand-slate dark:text-gray-400 block truncate">
                      {m.label}
                    </span>
                    <span className="text-xs sm:text-sm font-bold font-display text-brand-navy dark:text-white block mt-0.5">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technologies & Links Footer */}
              <div className="pt-4 border-t border-surface-lightBorder dark:border-surface-darkBorder space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {proj.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface-light dark:bg-surface-dark text-brand-slate dark:text-gray-300 border border-surface-lightBorder dark:border-surface-darkBorder"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-brand-navy dark:text-white bg-surface-light dark:bg-surface-dark border border-surface-lightBorder dark:border-surface-darkBorder hover:border-brand-blue transition-all"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {proj.devpostUrl && (
                      <a
                        href={proj.devpostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 transition-all"
                      >
                        <DevpostIcon className="w-3.5 h-3.5 text-cyan-500" />
                        <span>Devpost</span>
                      </a>
                    )}
                  </div>

                  <span className="text-xs font-mono text-brand-blue font-bold flex items-center gap-1">
                    <span>STAR Verified</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
