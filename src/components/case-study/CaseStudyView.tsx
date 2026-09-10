"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  Award,
  Copy,
  Check,
  CheckCircle2,
  Calendar,
  UserCheck,
  Building
} from "lucide-react";
import { ProjectCaseStudy } from "@/data/portfolioData";

export function CaseStudyView({
  project,
  prevProject,
  nextProject,
}: {
  project: ProjectCaseStudy;
  prevProject: ProjectCaseStudy | null;
  nextProject: ProjectCaseStudy | null;
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Back Button & Category */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-text-secondary hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-all group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-accent-cyan group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Projects</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-accent-blue/10 text-cyan-300 border border-accent-blue/30">
            {project.category}
          </span>
          {project.award && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{project.award}</span>
            </span>
          )}
        </div>
      </div>

      {/* Case Study Header */}
      <div className="space-y-4 border-b border-white/[0.08] pb-10">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-tight">
          {project.title}
        </h1>
        <p className="text-lg sm:text-xl font-display text-accent-cyan/90 font-medium">
          {project.subtitle}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-text-muted flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Role / Contribution</span>
            </span>
            <p className="text-white font-medium">{project.role}</p>
          </div>

          <div className="space-y-1">
            <span className="text-text-muted flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Timeline</span>
            </span>
            <p className="text-white font-medium">{project.period}</p>
          </div>

          {project.organization && (
            <div className="space-y-1">
              <span className="text-text-muted flex items-center gap-1">
                <Building className="w-3.5 h-3.5" />
                <span>Organization</span>
              </span>
              <p className="text-white font-medium">{project.organization}</p>
            </div>
          )}
        </div>
      </div>

      {/* Metrics */}
      {project.metrics && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {project.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-panel-glow border border-white/10 flex flex-col justify-between"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                {m.label}
              </span>
              <div className="text-3xl sm:text-4xl font-display font-black text-white my-2">
                {m.value}
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Problem & Context */}
      <div className="p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
          <span>Problem & Context</span>
        </h2>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
          {project.problem}
        </p>
      </div>

      {/* Technical Architecture */}
      <div className="p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan font-semibold">
            System Architecture
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
            {project.architecture.title}
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            {project.architecture.description}
          </p>
        </div>

        <ul className="space-y-3 pt-2">
          {project.architecture.points.map((pt, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
              <div className="w-5 h-5 rounded-md bg-accent-blue/15 border border-accent-blue/30 flex items-center justify-center text-[11px] font-mono text-accent-cyan shrink-0 mt-0.5">
                {i + 1}
              </div>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Code Snippet (if available) */}
      {project.codeSnippet && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-text-muted">
              Implementation Code ({project.codeSnippet.filename})
            </span>
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-text-secondary hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-accent-emerald" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Code"}</span>
            </button>
          </div>

          <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden bg-background-deep/90 shadow-2xl">
            <pre className="p-5 overflow-x-auto font-mono text-xs text-text-primary leading-relaxed">
              <code>{project.codeSnippet.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Key Highlights & Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-4">
          <h3 className="text-lg font-display font-bold text-white">
            Key Technical Features
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary">
            {project.keyFeatures.map((kf, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>{kf}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-4">
          <h3 className="text-lg font-display font-bold text-white">
            Results & Verification
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary">
            {project.results.map((res, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" />
                <span>{res}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tech Stack & GitHub */}
      <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 w-full sm:w-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
            Tech Stack
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.05] text-text-secondary border border-white/[0.06]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repo</span>
            </a>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="p-5 rounded-2xl glass-panel border border-white/[0.06] hover:border-white/20 transition-all group flex flex-col"
          >
            <span className="text-xs font-mono text-text-muted flex items-center gap-1 mb-1">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Previous Project</span>
            </span>
            <span className="text-sm font-display font-bold text-white group-hover:text-accent-cyan transition-colors">
              {prevProject.title}
            </span>
          </Link>
        ) : <div />}

        {nextProject && (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="p-5 rounded-2xl glass-panel border border-white/[0.06] hover:border-white/20 transition-all group flex flex-col items-end text-right"
          >
            <span className="text-xs font-mono text-text-muted flex items-center gap-1 mb-1">
              <span>Next Project</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-sm font-display font-bold text-white group-hover:text-accent-cyan transition-colors">
              {nextProject.title}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
