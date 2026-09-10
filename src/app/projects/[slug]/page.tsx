import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS } from "@/data/portfolioData";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) {
    return {
      title: "Case Study Not Found | Vansh Portfolio",
    };
  }

  return {
    title: `${project.title} | Case Study by Vansh`,
    description: project.summary,
  };
}

export default function ProjectCaseStudyPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const currentIndex = PROJECTS.findIndex((p) => p.slug === params.slug);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  return (
    <CaseStudyView
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
