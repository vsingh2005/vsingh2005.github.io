"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  BrainCircuit,
  Cloud,
  FileDown,
  ChevronRight,
  Award
} from "lucide-react";
import { PERSONAL_INFO, PROJECTS, TESTIMONIALS_AND_HONORS } from "@/data/portfolioData";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { TerminalCard } from "@/components/ui/TerminalCard";

export default function HomePage() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/30 text-xs font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>BS Computer Engineering &apos;26 | MS Business Analytics &apos;27</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight text-white leading-[1.05]">
                Hi, I&apos;m{" "}
                <span className="text-gradient-purple">
                  {PERSONAL_INFO.name}
                </span>
                .
              </h1>
              <p className="text-xl sm:text-2xl font-display font-medium text-text-secondary leading-snug">
                Computer engineer building <span className="text-accent-cyan font-semibold">Quantum ML</span>, scalable{" "}
                <span className="text-accent-blue font-semibold">Cloud Infrastructure</span>, and{" "}
                <span className="text-accent-violet font-semibold">Embedded Systems</span>.
              </p>
            </div>

            {/* Brief Intro */}
            <p className="text-text-secondary text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
              Dual-degree student at UMass Amherst. I write Terraform modules for AWS cloud environments, model circuits and robotics telemetry in hardware, and train hybrid quantum variational circuits.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-accent-blue via-accent-violet to-accent-magenta shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-text-primary bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all"
              >
                <span>About Me</span>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </Link>

              <a
                href="/Vansh_Singh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-mono text-xs text-text-secondary hover:text-white bg-transparent hover:bg-white/[0.04] transition-all"
              >
                <FileDown className="w-4 h-4 text-accent-cyan" />
                <span>Resume (PDF)</span>
              </a>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/[0.08]">
              {PERSONAL_INFO.stats.map((stat, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors">
                  <div className="text-xl sm:text-2xl font-bold font-display text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-text-secondary mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[10px] font-mono text-accent-cyan/80 mt-0.5 truncate">
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Live Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent-blue/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent-magenta/20 rounded-full blur-3xl pointer-events-none" />
              <TerminalCard />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE EXPERTISE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan font-semibold">
            What I Focus On
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Hardware, Cloud & Quantum Machine Learning
          </h2>
          <p className="text-text-secondary text-sm">
            Practical engineering from bare-metal circuits to cloud automation and quantum algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-white mb-2">
              Quantum Machine Learning
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Building hybrid neural networks that connect PyTorch models with PennyLane quantum variational circuits on AWS Braket for parameter-efficient learning.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">PennyLane</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">AWS Braket</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">PyTorch</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08] hover:border-blue-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
              <Cloud className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-white mb-2">
              Cloud & IaC Automation
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Writing Terraform configurations and Docker microservices for AWS, cutting server provisioning times by 40% with automated health monitoring.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">Terraform</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">AWS EC2/S3</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">Docker & CI/CD</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08] hover:border-violet-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6 text-violet-400 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-white mb-2">
              Embedded Robotics & Power
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Leading electrical teams for payload drones, offshore wind turbine power circuits in LTSpice, and ARM Cortex / ESP32 firmware development.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">Embedded C</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">LTSpice</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-text-muted">SolidWorks</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CASE STUDIES */}
      <section id="featured-work" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-violet/20 text-xs font-mono text-accent-violet">
              <Award className="w-3.5 h-3.5" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              Featured Case Studies
            </h2>
            <p className="text-text-secondary text-sm max-w-xl">
              Technical breakdowns of quantum neural networks, autonomous drone telemetry, and power electronics.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-accent-cyan/40 transition-all self-start md:self-auto"
          >
            <span>All ({PROJECTS.length}) Projects</span>
            <ArrowRight className="w-4 h-4 text-accent-cyan" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* LEADERSHIP & TESTIMONIAL HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel-glow border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan font-semibold">
                Highlights
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                Team Leadership & Applied Engineering
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                From mentoring 150+ students in microcontrollers to competing internationally and automating university cloud systems.
              </p>
              <div className="pt-2">
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 text-sm font-mono text-accent-cyan hover:underline"
                >
                  <span>View Experience Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {TESTIMONIALS_AND_HONORS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2 hover:border-white/10 transition-colors"
                >
                  <p className="text-text-primary text-sm italic leading-relaxed">
                    &quot;{item.quote}&quot;
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono pt-1">
                    <span className="text-accent-cyan font-semibold">{item.author}</span>
                    <span className="text-text-muted">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-accent-blue/20 via-accent-violet/20 to-accent-magenta/20 border border-white/15 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Looking for a software or systems engineer?
            </h2>
            <p className="text-text-secondary text-sm sm:text-base">
              Feel free to reach out for engineering roles, internships, or technical discussions.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl font-medium text-sm text-black bg-white hover:bg-white/90 hover:scale-[1.02] transition-all"
            >
              Get In Touch
            </Link>
            <a
              href="/Vansh_Singh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl font-medium text-sm text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-all"
            >
              View Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
