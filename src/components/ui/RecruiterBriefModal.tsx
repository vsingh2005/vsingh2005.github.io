"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileDown,
  Mail,
  Github,
  Check,
  Copy,
  Briefcase,
  Award,
  Layers,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface RecruiterBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecruiterBriefModal({ isOpen, onClose }: RecruiterBriefModalProps) {
  const [copied, setCopied] = useState(false);
  const brief = PERSONAL_INFO.recruiterBrief;

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-navy/60 dark:bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl my-auto rounded-3xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-brand-blue p-6 sm:p-8 shadow-solid-lg z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Top Close Button & Eyebrow */}
            <div className="flex items-center justify-between pb-4 border-b border-surface-lightBorder dark:border-surface-darkBorder">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lightLime text-brand-navy border border-brand-lime text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5 text-brand-navy" />
                <span>Executive Recruiter Brief • 10-Second Candidate Profile</span>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-brand-slate hover:text-brand-navy dark:hover:text-white bg-surface-light dark:bg-surface-dark border border-surface-lightBorder dark:border-surface-darkBorder transition-all"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Candidate Header */}
            <div className="pt-6 pb-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-brand-navy dark:text-white tracking-tight">
                    {PERSONAL_INFO.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-mono text-brand-blue font-bold mt-0.5">
                    BS Computer Engineering &apos;26 • MS Business Analytics &apos;27 @ UMass Amherst
                  </p>
                </div>

                {/* Primary Quick CTAs */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={PERSONAL_INFO.resumePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-blue text-white text-xs font-mono font-bold border border-brand-navy shadow-solid-sm"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Resume (PDF)</span>
                  </a>

                  <button
                    onClick={copyEmail}
                    className="neo-btn inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-lime text-brand-navy text-xs font-mono font-bold border border-brand-navy shadow-solid-sm"
                    title="Copy email address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Email"}</span>
                  </button>
                </div>
              </div>

              {/* Status and Work Authorization Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-mono">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-lightLime border border-brand-lime text-brand-navy font-bold">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-700" />
                  <span>{brief.workAuth}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-surface-lightBorder dark:border-surface-darkBorder text-brand-slate dark:text-gray-300">
                  <Clock className="w-4 h-4 shrink-0 text-brand-blue" />
                  <span>{brief.availability}</span>
                </div>
              </div>
            </div>

            {/* Target Job Roles */}
            <div className="py-4 border-t border-surface-lightBorder dark:border-surface-darkBorder space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-slate dark:text-gray-400 font-bold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-brand-blue" />
                Target Opportunities &amp; Roles
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {brief.targetRoles.map((role, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-surface-lightBorder dark:border-surface-darkBorder text-xs font-medium text-brand-navy dark:text-gray-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flagship Quantified Engineering Wins */}
            <div className="py-4 border-t border-surface-lightBorder dark:border-surface-darkBorder space-y-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-slate dark:text-gray-400 font-bold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-brand-coral" />
                Flagship Quantified Achievements
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {brief.flagshipWins.map((win, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-surface-lightBorder dark:border-surface-darkBorder space-y-1.5 flex flex-col justify-between"
                  >
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-brand-coral/15 text-brand-coral border border-brand-coral/30">
                        {win.metric}
                      </span>
                      <h4 className="text-xs font-bold text-brand-navy dark:text-white mt-1.5 leading-snug">
                        {win.headline}
                      </h4>
                    </div>
                    <p className="text-[11px] text-brand-slate dark:text-gray-400 leading-relaxed font-normal">
                      {win.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Tech Stack Matrix */}
            <div className="py-4 border-t border-surface-lightBorder dark:border-surface-darkBorder space-y-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-slate dark:text-gray-400 font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-brand-blue" />
                Core Technical Toolchain
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {brief.coreStack.map((group, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-surface-light dark:bg-surface-dark border border-surface-lightBorder dark:border-surface-darkBorder space-y-1.5"
                  >
                    <span className="text-[11px] font-mono text-brand-blue font-bold">
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-white dark:bg-surface-darkCard text-brand-navy dark:text-gray-200 border border-surface-lightBorder dark:border-surface-darkBorder"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-surface-lightBorder dark:border-surface-darkBorder flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-brand-slate dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-coral" />
                <span>{brief.relocation}</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-brand-navy dark:text-white hover:underline"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <span>•</span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-1 text-brand-blue hover:underline font-semibold"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
