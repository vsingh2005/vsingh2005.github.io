"use client";

import React from "react";
import { Cpu, Cloud, BrainCircuit, HeartHandshake, Compass, BookOpen } from "lucide-react";
import { EDUCATIONS, PERSONAL_INFO } from "@/data/portfolioData";
import { MiiLookingUpMascot } from "@/components/graphics/MiiLookingUpMascot";

export function AboutSection() {
  const philosophies = [
    {
      title: "Physical Computing Grounding",
      description: "Software reliability starts at the hardware interface. Understanding clock jitter, registers, and LTSpice transient response makes my cloud and software systems fundamentally more resilient.",
      icon: Cpu,
      color: "text-brand-ember bg-brand-ember/10 border-brand-ember/30",
    },
    {
      title: "Declarative Infrastructure as Code",
      description: "Cloud systems should never rely on ad-hoc console clicks. I architect modular, self-healing Terraform environments across AWS with strict zero-drift reproducibility.",
      icon: Cloud,
      color: "text-brand-cobalt bg-brand-cobalt/10 border-brand-cobalt/30",
    },
    {
      title: "Empathetic Technical Leadership",
      description: "Whether directing a 6-engineer electrical drivetrain subteam or teaching 150+ students in robotics labs, clear communication and mentorship multiply team velocity.",
      icon: HeartHandshake,
      color: "text-brand-navy dark:text-brand-amber bg-brand-cream border-brand-amber/40",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header with Looking Up Mascot */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-ember/10 border border-brand-ember/30 text-xs font-mono font-bold text-brand-ember">
              <Compass className="w-3.5 h-3.5" />
              <span>Story &amp; Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-navy dark:text-white tracking-tight">
              From embedded silicon to cloud orchestration.
            </h2>
            <p className="text-base text-brand-slate dark:text-gray-300 leading-relaxed font-normal">
              A dual-perspective engineer combining the rigorous hardware discipline of Computer Engineering with the scalable systems architecture of Business Analytics.
            </p>
          </div>

          {/* Standalone Pondering Mascot Looking Up */}
          <div className="shrink-0 flex justify-center lg:justify-end">
            <MiiLookingUpMascot />
          </div>
        </div>

        {/* Story Narrative & Education Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Story Narrative */}
          <div className="lg:col-span-7 neo-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-surface-darkBorder shadow-solid-sm dark:shadow-none space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-surface-lightBorder dark:border-surface-darkBorder">
              <BookOpen className="w-4 h-4 text-brand-blue" />
              <h3 className="text-base font-bold text-brand-navy dark:text-white font-display">
                The Technical Narrative
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-brand-slate dark:text-gray-300">
              My engineering journey began with the physical fundamentals: soldering circuits, simulating transient power responses in LTSpice, and coding bare-metal C for autonomous rovers. Leading the electrical architecture for the UMass ASME IAM3D team to a <strong>2nd place finish globally among 40+ universities</strong> solidified my passion for systems that must execute flawlessly under real-world constraints.
            </p>

            <p className="text-sm leading-relaxed text-brand-slate dark:text-gray-300">
              As systems scale beyond the circuit board, I translated those exact principles into cloud infrastructure. At UMass IT and in my applied research, I design multi-tenant cloud automation using <strong>Terraform and AWS</strong>, slashing manual provisioning times by 40% and ensuring zero configuration drift through automated monitoring daemons.
            </p>

            <p className="text-sm leading-relaxed text-brand-slate dark:text-gray-300">
              Currently pursuing my <strong>M.S. in Business Analytics (MSBA)</strong> alongside my Computer Engineering degree, I bridge deep technical implementation with enterprise data architecture, distributed quantum neural networks on AWS Braket, and applied machine learning.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-surface-light dark:bg-surface-dark text-brand-navy dark:text-gray-300 border border-surface-lightBorder dark:border-surface-darkBorder">
                📍 Chicago, IL &amp; Amherst, MA
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-surface-light dark:bg-surface-dark text-brand-navy dark:text-gray-300 border border-surface-lightBorder dark:border-surface-darkBorder">
                🎓 BS CompE &apos;26 • MSBA &apos;27
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-brand-lightLime text-brand-navy border border-brand-lime font-bold">
                ✓ Available Summer/Fall 2026 &amp; Full-Time
              </span>
            </div>
          </div>

          {/* Right: Dual Degrees & Academic Focus */}
          <div className="lg:col-span-5 space-y-4">
            {EDUCATIONS.map((edu, idx) => (
              <div
                key={idx}
                className="neo-card p-5 sm:p-6 rounded-3xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-surface-darkBorder shadow-solid-sm dark:shadow-none space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono text-brand-blue font-bold uppercase tracking-wider">
                      {edu.college}
                    </span>
                    <h4 className="text-base font-bold text-brand-navy dark:text-white font-display mt-0.5">
                      {edu.degree} in {edu.field}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-light dark:bg-surface-dark text-brand-slate dark:text-gray-400 border border-surface-lightBorder dark:border-surface-darkBorder shrink-0">
                    {edu.graduation.includes("Currently") ? "In Progress" : "Completed"}
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-brand-slate dark:text-gray-300">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-surface-lightBorder dark:border-surface-darkBorder flex flex-wrap gap-1">
                  {edu.courses.slice(0, 4).map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-light dark:bg-surface-dark text-brand-navy dark:text-gray-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Core Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {philosophies.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="neo-card p-6 rounded-3xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-surface-darkBorder shadow-solid-sm dark:shadow-none space-y-3"
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-brand-navy dark:text-white font-display">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-brand-slate dark:text-gray-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
