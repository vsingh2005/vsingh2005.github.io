"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Github, Mail, FileDown, MapPin, Sparkles, Heart } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { DevpostIcon } from "@/components/ui/DevpostIcon";

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
    <footer className="relative border-t-2 border-brand-navy/15 dark:border-white/15 bg-brand-parchment/60 dark:bg-brand-navy/60 backdrop-blur-md pt-16 pb-12 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b-2 border-brand-navy/10 dark:border-white/10">
          
          {/* Brand & Mini Avatar */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-lightLime/60 dark:bg-brand-navy border-2 border-brand-navy dark:border-white/20 overflow-hidden flex items-center justify-center shadow-solid-sm">
                <Image
                  src="/mii.png"
                  alt="Vansh Mii Avatar"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover object-top scale-110 translate-y-0.5"
                />
              </div>
              <div>
                <span className="font-heading font-black text-xl text-brand-navy dark:text-white tracking-tight">
                  {PERSONAL_INFO.name}
                </span>
                <span className="block text-xs font-mono text-brand-navy/60 dark:text-white/60">
                  {PERSONAL_INFO.title}
                </span>
              </div>
            </div>

            <p className="text-brand-slate dark:text-white/75 text-sm max-w-md leading-relaxed font-body">
              Computer Engineering and Business Analytics dual-degree student at UMass Amherst. Dedicated to robust cloud infrastructure, quantum computing algorithms, and high-performance engineering.
            </p>

            {/* Live Availability Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-lime/30 border border-brand-olive/40 text-xs font-mono font-bold text-brand-navy dark:text-brand-lime">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-ping" />
              <span>{PERSONAL_INFO.status}</span>
            </div>
          </div>

          {/* Dual Timezones & Locations */}
          <div className="md:col-span-4 space-y-3 font-mono">
            <span className="text-xs uppercase tracking-wider text-brand-navy/50 dark:text-white/50 font-bold block">
              Active Timezones
            </span>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-white dark:bg-brand-navy border-2 border-brand-navy/15 dark:border-white/15 shadow-solid-sm flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-brand-slate dark:text-white/70">
                  <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Amherst, MA (EST)</span>
                </div>
                <span className="text-brand-navy dark:text-white font-bold">{amherstTime || "12:00:00 PM"}</span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-brand-navy border-2 border-brand-navy/15 dark:border-white/15 shadow-solid-sm flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-brand-slate dark:text-white/70">
                  <MapPin className="w-3.5 h-3.5 text-brand-coral" />
                  <span>Chicago, IL (CST)</span>
                </div>
                <span className="text-brand-navy dark:text-white font-bold">{chicagoTime || "11:00:00 AM"}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-navy/50 dark:text-white/50 font-bold block">
              Sections
            </span>
            <ul className="grid grid-cols-2 gap-2 text-xs font-bold text-brand-slate dark:text-white/75">
              <li>
                <a href="#about" className="hover:text-brand-blue transition-colors">
                  → About
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-brand-blue transition-colors">
                  → Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-brand-blue transition-colors">
                  → Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brand-blue transition-colors">
                  → Contact
                </a>
              </li>
              <li>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">
                  → Resume (PDF)
                </a>
              </li>
              <li>
                <a href="/portfolio.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">
                  → Portfolio (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-brand-navy/60 dark:text-white/60">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-brand-blue transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            {PERSONAL_INFO.devpost && (
              <a
                href={PERSONAL_INFO.devpost}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-brand-blue transition-colors"
              >
                <DevpostIcon className="w-3.5 h-3.5" />
                <span>Devpost</span>
              </a>
            )}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-1.5 hover:text-brand-blue transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with Next.js & Tailwind
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white dark:bg-brand-navy hover:bg-brand-blue hover:text-white text-brand-navy dark:text-white border-2 border-brand-navy/20 dark:border-white/20 transition-all ml-2 shadow-solid-sm active:translate-x-0.5 active:translate-y-0.5"
              title="Scroll to Top"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

