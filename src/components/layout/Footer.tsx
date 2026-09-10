"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp, Github, Mail, FileDown, MapPin } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export function Footer() {
  const [amherstTime, setAmherstTime] = useState<string>("");
  const [chicagoTime, setChicagoTime] = useState<string>("");

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setAmherstTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setChicagoTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "America/Chicago",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-background-deep/90 backdrop-blur-xl pt-16 pb-12 overflow-hidden">
      {/* Top subtle cyan line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand & Summary */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-violet-600/30 border border-cyan-400/40 flex items-center justify-center font-display font-bold text-cyan-300 shadow-inner">
                V
              </div>
              <span className="font-display font-bold text-lg text-white uppercase tracking-wider">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-text-secondary text-sm max-w-md leading-relaxed">
              Computer Engineering and Business Analytics student at UMass Amherst. Working on cloud automation, quantum ML, and embedded systems.
            </p>

            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{PERSONAL_INFO.status}</span>
            </div>
          </div>

          {/* Dual Timezones & Locations */}
          <div className="md:col-span-4 space-y-3 font-mono">
            <span className="text-xs uppercase tracking-wider text-text-muted font-semibold">
              Timezones
            </span>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-text-secondary">
                  <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
                  <span>Amherst, MA (EST)</span>
                </div>
                <span className="text-white font-medium">{amherstTime || "12:00:00 PM"}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-text-secondary">
                  <MapPin className="w-3.5 h-3.5 text-accent-violet" />
                  <span>Chicago, IL (CST)</span>
                </div>
                <span className="text-white font-medium">{chicagoTime || "11:00:00 AM"}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
              Navigation
            </span>
            <ul className="grid grid-cols-2 gap-2 text-xs font-medium text-text-secondary">
              <li>
                <Link href="/" className="hover:text-accent-cyan transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent-cyan transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-accent-cyan transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-accent-cyan transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-accent-cyan transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent-cyan transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-accent-cyan" />
              <span>GitHub</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-accent-violet" />
              <span>Email</span>
            </a>
            <a
              href="/Vansh_Singh_Portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <FileDown className="w-3.5 h-3.5 text-accent-cyan" />
              <span>Portfolio PDF</span>
            </a>
            <a
              href="/Vansh_Singh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <FileDown className="w-3.5 h-3.5 text-accent-magenta" />
              <span>Resume PDF</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
            <span>•</span>
            <span>Built with Next.js & Tailwind</span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white hover:text-accent-cyan border border-white/[0.08] transition-all ml-2"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
