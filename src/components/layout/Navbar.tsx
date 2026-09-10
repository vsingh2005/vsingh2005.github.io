"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileDown,
  Menu,
  X,
  ArrowUpRight,
  Layers,
  Briefcase,
  User,
  Wrench,
  Mail,
  Home
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

const NAV_LINKS = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: Layers },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "Skills", href: "/skills", icon: Wrench },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4 pb-2 ${
          isScrolled ? "backdrop-blur-xl bg-background-deep/80 border-b border-white/[0.06] shadow-lg shadow-black/40" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Redesigned Premium Logo & Brand */}
          <Link
            href="/"
            className="group flex items-center gap-3.5 py-1 px-1 rounded-xl transition-all"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-400 border border-yellow-300/60 group-hover:border-yellow-200 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] transition-all duration-300 overflow-hidden">
              <Image
                src="/avatar.jpg"
                alt="ringularity0"
                width={40}
                height={40}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                priority
              />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00F2FE] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-base tracking-wider text-white group-hover:text-cyan-300 transition-colors uppercase">
                  ringularity0
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]" />
              </div>
              <span className="text-[11px] font-mono text-text-muted flex items-center gap-1">
                <span>UMass Amherst</span>
                <span className="text-cyan-400">/</span>
                <span className="text-cyan-400">Systems</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-background-card/85 border border-white/[0.08] backdrop-blur-md shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-text-secondary hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue/25 to-accent-violet/30 border border-accent-cyan/40 shadow-[0_0_12px_rgba(0,242,254,0.2)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? "text-accent-cyan" : "opacity-70"}`} />
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href="/Vansh_Singh_Portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 hover:border-cyan-300 transition-all group"
            >
              <FileDown className="w-3.5 h-3.5 text-accent-cyan group-hover:scale-110 transition-transform" />
              <span>Portfolio PDF</span>
            </a>

            <a
              href="/Vansh_Singh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-text-secondary hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 transition-all group"
            >
              <FileDown className="w-3.5 h-3.5 text-text-muted group-hover:scale-110 transition-transform" />
              <span>Resume</span>
            </a>

            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden rounded-full font-medium transition-all group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-magenta opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-background-deep text-xs font-medium text-white transition-all duration-300 group-hover:bg-transparent">
                <span>Contact</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-accent-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-background-card border border-white/10 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-30 p-4 md:hidden"
          >
            <div className="rounded-2xl bg-background-card/95 border border-white/10 backdrop-blur-2xl p-5 shadow-2xl space-y-4">
              <nav className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-accent-blue/15 text-accent-cyan border border-accent-cyan/30"
                          : "text-text-secondary hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="/Vansh_Singh_Portfolio.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-400/30"
                >
                  <FileDown className="w-4 h-4 text-accent-cyan" />
                  <span>Download Portfolio (PDF)</span>
                </a>
                <a
                  href="/Vansh_Singh_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white bg-white/5 border border-white/10"
                >
                  <FileDown className="w-4 h-4 text-text-muted" />
                  <span>Download Resume (PDF)</span>
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-accent-blue to-accent-violet shadow-lg shadow-accent-blue/20"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
