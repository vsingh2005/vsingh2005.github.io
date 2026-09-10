"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Award,
  Layers,
  FileDown,
  Building
} from "lucide-react";
import { EXPERIENCES, PERSONAL_INFO } from "@/data/portfolioData";

export default function ExperiencePage() {
  const [filterType, setFilterType] = useState<string>("all");

  const filtered = EXPERIENCES.filter((exp) => {
    if (filterType === "all") return true;
    return exp.type === filterType;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-xs font-mono text-accent-cyan">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Professional Experience</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight">
          Engineering & Leadership{" "}
          <span className="text-gradient-purple">Timeline</span>
        </h1>
        <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
          Track record in multi-tenant cloud infrastructure automation, emergency cybersecurity incident response, and embedded systems mentorship.
        </p>
      </div>

      {/* Filter Tabs & Resume Quick Link */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl glass-panel border border-white/[0.08]">
        <div className="flex flex-wrap items-center gap-1.5">
          {["all", "Internship", "Leadership & Industry", "Mentorship"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                filterType === type
                  ? "bg-accent-blue/20 text-accent-cyan border border-accent-cyan/40"
                  : "text-text-secondary hover:text-white hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              {type === "all" ? "All Experience" : type}
            </button>
          ))}
        </div>

        <a
          href="/Vansh_Singh_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all"
        >
          <FileDown className="w-3.5 h-3.5 text-accent-cyan" />
          <span>Download Resume</span>
        </a>
      </div>

      {/* Timeline Section */}
      <div className="relative border-l border-white/10 pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-10">
        {filtered.map((exp, idx) => (
          <div key={exp.id} className="relative group">
            {/* Glowing Timeline Marker */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-background-deep border-2 border-accent-cyan group-hover:border-accent-magenta shadow-[0_0_12px_rgba(0,242,254,0.4)] group-hover:scale-125 transition-all duration-300" />

            {/* Experience Card */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow border border-white/[0.08] hover:border-white/20 transition-all duration-300 space-y-5">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-accent-cyan font-semibold">
                      {exp.type}
                    </span>
                    {exp.metricsBadge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {exp.metricsBadge}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                    {exp.role}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-text-secondary mt-1">
                    <span className="text-white font-medium flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-text-muted" />
                      <span>{exp.company}</span>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-text-muted" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] text-text-muted border border-white/[0.06] flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>{exp.period}</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed">
                {exp.description}
              </p>

              {/* Bullet Highlights */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>

              {/* Technology Tags */}
              <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                {exp.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-text-secondary border border-white/[0.05]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
