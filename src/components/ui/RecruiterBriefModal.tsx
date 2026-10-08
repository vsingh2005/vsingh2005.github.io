"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileDown,
  Mail,
  Linkedin,
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl my-auto rounded-3xl bg-background-card/95 border border-white/15 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Top Close Button & Eyebrow */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono text-cyan-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Executive Recruiter Brief • 10-Second Overview</span>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-text-muted hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-all"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Candidate Header */}
            <div className="pt-6 pb-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                    {PERSONAL_INFO.name}
                  </h2>
                  <p className="text-sm font-medium text-cyan-300">
                    B.S. Computer Engineering &apos;26 • M.S. Business Analytics &apos;27 @ UMass Amherst
                  </p>
                </div>

                {/* Primary Quick CTAs */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={PERSONAL_INFO.resumePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>1-Page Resume (PDF)</span>
                  </a>

                  {PERSONAL_INFO.linkedin && (
                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-mono transition-all"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  )}

                  <button
                    onClick={copyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white text-xs font-mono transition-all"
                    title="Copy email address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Email"}</span>
                  </button>
                </div>
              </div>

              {/* Status and Work Authorization Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{brief.workAuth}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-text-secondary">
                  <Clock className="w-4 h-4 shrink-0 text-cyan-400" />
                  <span>{brief.availability}</span>
                </div>
              </div>
            </div>

            {/* Target Job Roles */}
            <div className="py-4 border-t border-white/[0.08] space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                Target Opportunities &amp; Roles
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {brief.targetRoles.map((role, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-medium text-white flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flagship Quantified Engineering Wins */}
            <div className="py-4 border-t border-white/[0.08] space-y-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Flagship Quantified Achievements
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {brief.flagshipWins.map((win, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] space-y-1.5 flex flex-col justify-between"
                  >
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {win.metric}
                      </span>
                      <h4 className="text-xs font-semibold text-white mt-1.5 leading-snug">
                        {win.headline}
                      </h4>
                    </div>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      {win.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Tech Stack Matrix */}
            <div className="py-4 border-t border-white/[0.08] space-y-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                Core Technical Toolchain
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {brief.coreStack.map((group, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5"
                  >
                    <span className="text-[11px] font-mono text-cyan-300/80 font-semibold">
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.04] text-text-primary border border-white/[0.06]"
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
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-text-muted">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{brief.relocation}</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-text-secondary hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                </a>
                <span>•</span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-1 text-cyan-300 hover:underline"
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
