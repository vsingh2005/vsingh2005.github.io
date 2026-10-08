"use client";

import React from "react";
import { ArrowRight, FileDown, Sparkles, Terminal, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { BugsterHeroMascot } from "@/components/graphics/BugsterHeroMascot";

export function HeroSection({ onOpenRecruiter }: { onOpenRecruiter: () => void }) {
  return (
    <section className="relative pt-6 sm:pt-12 pb-16 sm:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Announcement Pill (Bugster Style) */}
        <div className="flex items-center justify-center sm:justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-lightLime dark:bg-brand-navy/60 border border-brand-lime/80 dark:border-brand-blue/30 text-xs font-mono font-medium text-brand-navy dark:text-brand-lime shadow-solid-sm dark:shadow-none">
            <span className="w-2 h-2 rounded-full bg-brand-coral animate-pulse" />
            <span>Open to Full-Time &amp; Internship Roles • US Work Authorized</span>
          </div>
        </div>

        {/* Main Grid: Headline & Mascot Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Bold Editorial Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center sm:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-brand-navy dark:text-white leading-[1.12]">
                Engineering systems from{" "}
                <span className="text-brand-blue underline decoration-brand-lime decoration-4 underline-offset-4">
                  physical silicon
                </span>{" "}
                to cloud scale.
              </h1>
              <p className="text-base sm:text-lg text-brand-slate dark:text-gray-300 leading-relaxed max-w-xl font-normal">
                I am <strong className="text-brand-navy dark:text-white font-semibold">Vansh</strong>, a computer engineer at UMass Amherst (BS &apos;26 • MSBA &apos;27). I build automated multi-tenant AWS cloud environments with Terraform, design embedded mechatronics, and explore applied computational models.
              </p>
            </div>

            {/* Quick Proof Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-surface-darkCard border border-surface-lightBorder dark:border-surface-darkBorder text-brand-navy dark:text-gray-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" />
                <span>Terraform &amp; AWS IaC</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-surface-darkCard border border-surface-lightBorder dark:border-surface-darkBorder text-brand-navy dark:text-gray-300">
                <Cpu className="w-3.5 h-3.5 text-brand-coral" />
                <span>ASME Global Podium Lead</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-surface-darkCard border border-surface-lightBorder dark:border-surface-darkBorder text-brand-navy dark:text-gray-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>US Citizen / Authorized</span>
              </span>
            </div>

            {/* CTAs Bar */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              {/* Primary Work Button */}
              <a
                href="#projects"
                className="neo-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-mono text-sm font-bold text-white bg-brand-blue border-2 border-brand-navy shadow-solid hover:shadow-solid-lg transition-all"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Recruiter 10s Brief */}
              <button
                type="button"
                onClick={onOpenRecruiter}
                className="neo-btn inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl font-mono text-sm font-bold text-brand-navy bg-brand-lime border-2 border-brand-navy shadow-solid hover:shadow-solid-lg transition-all"
              >
                <Sparkles className="w-4 h-4 text-brand-navy" />
                <span>Recruiter Brief (10s)</span>
              </button>

              {/* Resume Download */}
              <a
                href={PERSONAL_INFO.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl font-mono text-xs font-semibold text-brand-navy dark:text-white bg-white dark:bg-surface-darkCard border-2 border-surface-lightBorder dark:border-surface-darkBorder shadow-solid-sm hover:border-brand-blue transition-all"
              >
                <FileDown className="w-3.5 h-3.5 text-brand-coral" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Bugster-Inspired Browser Frame Card with Mascot */}
          <div className="lg:col-span-5">
            <div className="neo-card rounded-3xl p-4 sm:p-6 bg-white dark:bg-surface-darkCard border-2 border-brand-navy shadow-solid-lg relative overflow-hidden">
              {/* macOS Traffic Lights Header */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-surface-lightBorder dark:border-surface-darkBorder">
                <div className="mac-dots">
                  <span className="mac-dot bg-brand-coral border border-brand-navy/30" />
                  <span className="mac-dot bg-brand-lime border border-brand-navy/30" />
                  <span className="mac-dot bg-brand-blue border border-brand-navy/30" />
                </div>
                <div className="px-3 py-0.5 rounded-lg bg-surface-light dark:bg-surface-dark border border-surface-lightBorder dark:border-surface-darkBorder text-[11px] font-mono text-brand-slate dark:text-gray-400">
                  vansh@umass: ~/systems
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" title="System operational" />
              </div>

              {/* Character Illustration Area */}
              <div className="py-2">
                <BugsterHeroMascot className="w-full" />
              </div>

              {/* Bottom Test & Deploy Verification Pill */}
              <div className="mt-2 pt-3 border-t border-surface-lightBorder dark:border-surface-darkBorder flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-brand-navy dark:text-gray-300">
                  <Terminal className="w-3.5 h-3.5 text-brand-blue" />
                  <span>IaC pipeline: <strong>verified</strong></span>
                </div>
                <span className="px-2 py-0.5 rounded bg-brand-lightLime text-brand-navy font-bold text-[10px]">
                  0 FAILURES
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
