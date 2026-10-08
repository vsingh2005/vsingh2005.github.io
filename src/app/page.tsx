"use client";

import React, { useState, useEffect } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { MetricsBar } from "@/components/sections/MetricsBar";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { RecruiterBriefModal } from "@/components/ui/RecruiterBriefModal";

export default function HomePage() {
  const [recruiterModalOpen, setRecruiterModalOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setRecruiterModalOpen(true);
    window.addEventListener("open-recruiter-brief", handleOpen);
    return () => window.removeEventListener("open-recruiter-brief", handleOpen);
  }, []);

  return (
    <div className="relative bugster-grid min-h-screen">
      {/* 10-Second Executive Recruiter Brief Modal */}
      <RecruiterBriefModal
        isOpen={recruiterModalOpen}
        onClose={() => setRecruiterModalOpen(false)}
      />

      {/* 1. Hero Section: Animated Headline, Value Prop, CTAs & Bugster Mascot */}
      <HeroSection onOpenRecruiter={() => setRecruiterModalOpen(true)} />

      {/* Flagship Quantifiable Metrics Ribbon */}
      <MetricsBar />

      {/* 2. About Section: Story Narrative, Philosophy & Dual Degree */}
      <AboutSection />

      {/* 3. Skills & Tech Stack: Interactive Filterable Badges with Mascot */}
      <SkillsSection />

      {/* 4. Projects Section: STAR Methodology & Quantified Impact Cards */}
      <ProjectsSection />

      {/* 5. Contact Section: Validated Form & Instant Email Copy */}
      <ContactSection />
    </div>
  );
}

