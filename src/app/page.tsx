"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  Cloud,
  FileDown,
  ChevronRight,
  Binary,
  Layers,
  Sparkles
} from "lucide-react";
import { PERSONAL_INFO, PROJECTS } from "@/data/portfolioData";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { TerminalCard } from "@/components/ui/TerminalCard";
import { SpinningBadge } from "@/components/visuals/SpinningBadge";

export default function HomePage() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <div className="space-y-24 sm:space-y-36 pb-24 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Human Voice & Editorial Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Status Pill with Subtle Shimmer */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono text-[#EDDFEE]">
              <span className="w-2 h-2 rounded-full bg-[#CD8DBD] animate-pulse" />
              <span>BS Computer Engineering &apos;26 • MS Business Analytics &apos;27</span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-semibold tracking-tight text-white leading-[1.08]">
                Engineering systems from physical hardware to cloud scale.
              </h1>
              <p className="text-base sm:text-lg font-normal text-text-secondary leading-relaxed max-w-xl">
                I am Vansh Singh, a computer engineer at UMass Amherst. I build automated cloud environments with Terraform, design embedded mechatronics, and explore applied computational models.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-text-primary bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all"
              >
                <span>About Background</span>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </Link>

              <a
                href="/Vansh_Singh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-mono text-xs text-text-muted hover:text-white transition-colors"
              >
                <FileDown className="w-3.5 h-3.5 text-[#CD8DBD]" />
                <span>Resume (PDF)</span>
              </a>
            </div>

            {/* Grounded Engineering Impact Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/[0.08]">
              {PERSONAL_INFO.stats.map((stat, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors">
                  <div className="text-xl sm:text-2xl font-bold font-display text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-text-secondary mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[10px] font-mono text-text-muted mt-0.5 truncate">
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Terminal Card in Linearity-Style Multicolored Aura Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative">
              {/* Multicolored Background Aurora Glow Behind Terminal */}
              <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-gradient-to-tr from-fuchsia-500/30 to-violet-600/30 blur-[90px] pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-gradient-to-tr from-cyan-400/25 to-emerald-500/20 blur-[90px] pointer-events-none" />
              
              {/* Terminal Component */}
              <TerminalCard />
            </div>
          </motion.div>
        </div>
      </section>

      {/* EDITORIAL THESIS & ROTATING BADGE SECTION (Scroll Reveal) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          {/* Subtle multicolored ambient blur in corner */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-violet-600/15 via-fuchsia-500/10 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Thesis Statement */}
            <div className="lg:col-span-5 space-y-2">
              <span className="text-xs font-mono text-[#CD8DBD] uppercase tracking-wider">
                Engineering Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight leading-snug">
                Grounded in physical computing, built for cloud scale.
              </h2>
            </div>

            {/* Narrative Explanation */}
            <div className="lg:col-span-5 text-sm text-text-secondary leading-relaxed font-normal">
              Reliable software stems from understanding how physical systems actually operate.
              Whether writing embedded C for autonomous rovers, simulating transient power circuits in LTSpice, or automating cloud infrastructure across AWS with Terraform, I design architectures built for stability, observability, and real-world execution.
            </div>

            {/* Understated Spinning Vector Badge */}
            <div className="lg:col-span-2 flex items-center justify-center lg:justify-end">
              <SpinningBadge size={135} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* CORE DISCIPLINES (Scroll Staggered Reveal) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12 space-y-2"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#CD8DBD] font-semibold">
            Areas of Focus
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight">
            Core Disciplines &amp; Applied Work
          </h2>
          <p className="text-text-secondary text-sm">
            Disciplined engineering across cloud orchestration, physical mechatronics, and computational systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Cloud & IaC */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="group relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-md overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 text-white group-hover:border-cyan-400/40 transition-colors">
              <Cloud className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-display font-semibold text-white mb-2">
              Cloud &amp; Infrastructure as Code
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Designing modular Terraform configurations and Docker microservices on AWS, reducing manual provisioning times by 40% with self-healing monitoring scripts.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">Terraform</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">AWS (EC2/S3/IAM)</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">Docker &amp; CI/CD</span>
            </div>
          </motion.div>

          {/* Card 2: Embedded Systems & Mechatronics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="group relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-violet-500/30 transition-all duration-300 backdrop-blur-md overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-violet-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 text-white group-hover:border-violet-400/40 transition-colors">
              <Cpu className="w-5 h-5 text-violet-400" />
            </div>
            <h3 className="text-lg font-display font-semibold text-white mb-2">
              Embedded Systems &amp; Robotics
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Electrical and prototyping lead for global competition drone and rover systems (2nd Place ASME IAM3D) and 24V turbine power regulation circuits for the U.S. DOE.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">Embedded C</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">ARM Cortex</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">LTSpice</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">SolidWorks</span>
            </div>
          </motion.div>

          {/* Card 3: Applied Analytics & Computational Models */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="group relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-pink-500/30 transition-all duration-300 backdrop-blur-md overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-pink-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 text-white group-hover:border-pink-400/40 transition-colors">
              <Binary className="w-5 h-5 text-pink-400" />
            </div>
            <h3 className="text-lg font-display font-semibold text-white mb-2">
              Applied Analytics &amp; ML Models
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Quantitative data modeling and business analytics through Isenberg coursework, alongside exploratory research in hybrid quantum variational circuits with PennyLane.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">Python</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">Data Analytics</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">PyTorch</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">PennyLane</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED CASE STUDIES (Scroll Staggered Reveal) */}
      <section id="featured-work" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#CD8DBD] font-semibold">
              Selected Projects
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight">
              Hardware, Cloud, and Systems Case Studies
            </h2>
            <p className="text-text-secondary text-sm">
              In-depth architecture breakdowns, metrics, and implementation notes.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#EDDFEE] hover:text-white transition-colors"
          >
            <span>View all projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* RESUME & CONTACT BANNER (Linearity Multicolored Gradient Frame) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          {/* Multicolored Gradient Aura Backlight */}
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-violet-600/30 to-fuchsia-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-tl from-cyan-400/30 to-emerald-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-white">
              Looking for a systems, cloud, or embedded engineer?
            </h3>
            <p className="text-text-secondary text-sm">
              Open to full-time engineering and internship roles across software, cloud infrastructure, and hardware.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <a
              href="/Vansh_Singh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 transition-all"
            >
              <FileDown className="w-4 h-4 text-[#CD8DBD]" />
              <span>Download Resume</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-[#0B0B0F] bg-gradient-to-r from-white via-slate-100 to-[#EDDFEE] hover:opacity-95 font-semibold shadow-lg shadow-white/10 transition-all"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
