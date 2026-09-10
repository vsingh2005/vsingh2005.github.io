"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Award, Cpu, BrainCircuit, Cloud, Layers, ExternalLink, Github } from "lucide-react";
import { ProjectCaseStudy } from "@/data/portfolioData";

export function ProjectCard({ project }: { project: ProjectCaseStudy }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Quantum & AI":
        return <BrainCircuit className="w-4 h-4 text-cyan-400" />;
      case "Embedded & Hardware":
        return <Cpu className="w-4 h-4 text-violet-400" />;
      case "Cloud & Systems":
        return <Cloud className="w-4 h-4 text-blue-400" />;
      default:
        return <Layers className="w-4 h-4 text-pink-400" />;
    }
  };

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case "Quantum & AI":
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/20";
      case "Embedded & Hardware":
        return "bg-violet-500/10 text-violet-300 border-violet-500/20";
      case "Cloud & Systems":
        return "bg-blue-500/10 text-blue-300 border-blue-500/20";
      default:
        return "bg-pink-500/10 text-pink-300 border-pink-500/20";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl glass-panel border border-white/[0.08] hover:border-white/20 p-6 sm:p-8 transition-all duration-300 overflow-hidden flex flex-col justify-between"
    >
      {/* Dynamic Hover Spotlight */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-quantum-glow" />

      <div>
        {/* Top Header: Category & Award */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border ${getCategoryBadgeClass(project.category)}`}>
            {getCategoryIcon(project.category)}
            <span>{project.category}</span>
          </span>

          {project.award && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{project.award}</span>
            </span>
          )}

          {!project.award && (
            <span className="text-xs font-mono text-text-muted">{project.period}</span>
          )}
        </div>

        {/* Title & Subtitle */}
        <Link href={`/projects/${project.slug}`} className="block group-hover:text-accent-cyan transition-colors">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight leading-snug group-hover:text-accent-cyan transition-colors">
            {project.title}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm font-mono text-accent-cyan/90 mt-1 mb-3">
          {project.subtitle}
        </p>

        {/* Summary */}
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {project.summary}
        </p>

        {/* Key Metrics Chips */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-background-deep/80 border border-white/[0.06] flex flex-col"
              >
                <span className="text-xs font-mono text-text-muted">{m.label}</span>
                <span className="text-base sm:text-lg font-bold font-display text-white mt-0.5">
                  {m.value}
                </span>
                <span className="text-[10px] text-text-muted line-clamp-1 mt-0.5">
                  {m.description}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Technology Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-text-secondary border border-white/[0.05]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 6 && (
            <span className="px-2 py-1 rounded-lg text-xs font-mono bg-white/[0.02] text-text-muted">
              +{project.technologies.length - 6} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-3">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent-cyan hover:text-cyan-300 group-hover:translate-x-0.5 transition-all"
        >
          <span>Explore Case Study</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
