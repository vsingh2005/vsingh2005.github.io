"use client";

import React from "react";
import { Award, Zap, Users, Shield } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export function MetricsBar() {
  const stats = [
    {
      value: "2nd Global",
      label: "ASME IAM3D Mechatronics",
      subtext: "Among 40+ international university teams",
      icon: Award,
      badgeColor: "bg-brand-ember/15 text-brand-ember border-brand-ember/30",
    },
    {
      value: "40% Faster",
      label: "AWS IaC Provisioning",
      subtext: "Automated modular Terraform architecture",
      icon: Zap,
      badgeColor: "bg-brand-cobalt/15 text-brand-cobalt border-brand-cobalt/30",
    },
    {
      value: "6 Engineers",
      label: "Drivetrain Subteam Led",
      subtext: "U.S. Department of Energy Collegiate Wind",
      icon: Users,
      badgeColor: "bg-brand-amber/20 text-brand-navy dark:text-brand-amber border-brand-amber/40",
    },
    {
      value: "150+ Taught",
      label: "Embedded & Robotics",
      subtext: "Engineering mentor & lab instructor",
      icon: Shield,
      badgeColor: "bg-brand-cream text-brand-navy border-brand-amber/30",
    },
  ];

  return (
    <section className="py-10 border-y border-surface-lightBorder dark:border-surface-darkBorder bg-white/70 dark:bg-surface-darkCard/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center sm:text-left mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-slate dark:text-gray-400 font-semibold">
            Track Record &amp; Measurable Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-brand-navy dark:text-white tracking-tight mt-1">
            Proven execution across hardware, cloud &amp; leadership
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="neo-card p-5 sm:p-6 rounded-3xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-surface-darkBorder shadow-solid-sm dark:shadow-none flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl sm:text-4xl font-display font-black text-brand-navy dark:text-white tracking-tight">
                      {stat.value}
                    </span>
                    <div className={`p-2 rounded-xl border ${stat.badgeColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-brand-navy dark:text-white leading-snug">
                    {stat.label}
                  </h3>
                </div>
                <p className="text-xs text-brand-slate dark:text-gray-400 mt-2 font-mono">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
