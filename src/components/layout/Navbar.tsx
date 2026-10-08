"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileDown, Sparkles, Menu, X, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { PERSONAL_INFO } from "@/data/portfolioData";

export function Navbar({ onOpenRecruiter }: { onOpenRecruiter?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenRecruiter = () => {
    if (onOpenRecruiter) {
      onOpenRecruiter();
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-recruiter-brief"));
    }
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-surface-lightBorder dark:border-surface-darkBorder transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-brand-blue flex items-center justify-center text-white font-display font-black text-lg border border-brand-navy shadow-solid-sm group-hover:scale-105 transition-transform">
            V
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base tracking-tight text-brand-navy dark:text-white leading-none">
              Vansh
            </span>
            <span className="text-[11px] font-mono text-brand-slate dark:text-gray-400 mt-0.5">
              Systems &amp; Cloud
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-surface-darkCard border border-surface-lightBorder dark:border-surface-darkBorder">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium text-brand-navy dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-blue hover:bg-surface-light dark:hover:bg-surface-darkCardHover transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Right CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Recruiter 10s Pill Button */}
          <button
            onClick={handleOpenRecruiter}
            className="neo-btn inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-brand-lime text-brand-navy border border-brand-navy shadow-solid-sm hover:shadow-solid"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-navy" />
            <span>Recruiter (10s)</span>
          </button>

          {/* Resume PDF */}
          <a
            href={PERSONAL_INFO.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium text-brand-navy dark:text-white bg-white dark:bg-surface-darkCard border border-surface-lightBorder dark:border-surface-darkBorder shadow-solid-sm dark:shadow-none hover:border-brand-blue"
          >
            <FileDown className="w-3.5 h-3.5 text-brand-blue" />
            <span>Resume</span>
          </a>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white dark:bg-surface-darkCard border border-surface-lightBorder dark:border-surface-darkBorder text-brand-navy dark:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-surface-lightBorder dark:border-surface-darkBorder bg-surface-lightCard dark:bg-surface-darkCard p-4 space-y-3">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-brand-navy dark:text-white hover:bg-surface-light dark:hover:bg-surface-darkCardHover"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-surface-lightBorder dark:border-surface-darkBorder flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenRecruiter();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-mono text-xs font-bold bg-brand-lime text-brand-navy border border-brand-navy shadow-solid-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Executive Recruiter Brief (10s)</span>
            </button>
            <a
              href={PERSONAL_INFO.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-mono text-xs font-medium bg-white dark:bg-surface-darkCard text-brand-navy dark:text-white border border-surface-lightBorder dark:border-surface-darkBorder"
            >
              <FileDown className="w-4 h-4 text-brand-blue" />
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
