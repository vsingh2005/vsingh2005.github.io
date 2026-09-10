"use client";

import React, { useState } from "react";
import { Search, Filter, Layers, BrainCircuit, Cpu, Cloud, Award } from "lucide-react";
import { PROJECTS, ProjectCaseStudy } from "@/data/portfolioData";
import { ProjectCard } from "@/components/ui/ProjectCard";

const CATEGORIES = [
  { id: "all", label: "All Projects", icon: Layers },
  { id: "Quantum & AI", label: "Quantum & AI", icon: BrainCircuit },
  { id: "Embedded & Hardware", label: "Embedded & Hardware", icon: Cpu },
  { id: "Cloud & Systems", label: "Cloud & Systems", icon: Cloud },
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-violet/20 text-xs font-mono text-accent-violet">
          <Award className="w-3.5 h-3.5" />
          <span>Case Study Portfolio</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight">
          Featured Engineering &{" "}
          <span className="text-gradient-cyan">Research Systems</span>
        </h1>
        <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
          Comprehensive case studies spanning quantum machine learning variational circuits, global robotics competitions, renewable energy simulations, and enterprise cloud IaC.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl glass-panel border border-white/[0.08]">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium font-mono transition-all ${
                  isSelected
                    ? "bg-accent-blue/20 text-accent-cyan border border-accent-cyan/40 shadow-sm"
                    : "text-text-secondary hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tech (PyTorch, AWS, C...)"
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white placeholder:text-text-muted/60 focus:outline-none focus:border-accent-cyan/50"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 p-8 rounded-3xl glass-panel border border-white/[0.06] space-y-3">
          <p className="text-text-secondary text-sm font-mono">
            No engineering projects matched your query &quot;{searchQuery}&quot;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-xs font-mono text-accent-cyan hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
