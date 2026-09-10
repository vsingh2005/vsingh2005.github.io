"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Mail,
  Github,
  FileDown,
  Send,
  Check,
  Copy,
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "Full-Time / Engineering Role",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00F2FE", "#3877FF", "#8A4FFF", "#10B981"],
        });
      } catch (err) {
        // Confetti fallback
      }
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-xs font-mono text-accent-cyan">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight">
          Contact <span className="text-gradient-purple">{PERSONAL_INFO.name}</span>
        </h1>
        <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
          I am currently looking for software engineering, cloud infrastructure, and embedded systems opportunities. Feel free to reach out directly via email or the form below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl glass-panel-glow border border-white/10 relative overflow-hidden">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Message Sent!
                </h3>
                <p className="text-text-secondary text-sm max-w-md mx-auto">
                  Thanks for getting in touch. I will get back to you at <span className="text-white font-medium">{formState.email}</span> as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl text-xs font-mono text-accent-cyan bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-display font-bold text-white mb-6">
                  Send a Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-text-secondary">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-text-muted/50 focus:outline-none focus:border-accent-cyan/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-text-secondary">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-text-muted/50 focus:outline-none focus:border-accent-cyan/50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-text-secondary">
                    Topic
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background-deep border border-white/[0.08] text-sm text-white focus:outline-none focus:border-accent-cyan/50"
                  >
                    <option value="Full-Time / Engineering Role">Full-Time / Engineering Role</option>
                    <option value="Internship / Co-op Opportunity">Internship / Co-op Opportunity</option>
                    <option value="Quantum ML / Research">Quantum ML / Research</option>
                    <option value="Embedded Systems / Hardware">Embedded Systems / Hardware</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-text-secondary">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-text-muted/50 focus:outline-none focus:border-accent-cyan/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-accent-blue via-accent-violet to-accent-magenta shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/40 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 font-mono text-xs">
                      <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Direct Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Email Card */}
          <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-blue/15 border border-accent-blue/30 flex items-center justify-center text-accent-cyan">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold text-white">Direct Email</h4>
                  <p className="text-xs text-text-muted font-mono">{PERSONAL_INFO.email}</p>
                </div>
              </div>

              <button
                onClick={copyEmailToClipboard}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-text-secondary hover:text-white border border-white/[0.06] transition-all"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-accent-emerald" /> : <Copy className="w-4 h-4 text-text-muted" />}
              </button>
            </div>

            <div className="pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="w-full py-2.5 rounded-xl text-xs font-mono font-medium text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center gap-2 transition-all"
              >
                <span>Open Mail Client</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* GitHub Card */}
          <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-violet/15 border border-accent-violet/30 flex items-center justify-center text-accent-violet">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-display font-bold text-white">GitHub</h4>
                <p className="text-xs text-text-muted font-mono">{PERSONAL_INFO.githubHandle}</p>
              </div>
            </div>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl text-xs font-mono font-medium text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center gap-2 transition-all"
            >
              <span>Visit github.com/vsingh2005</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Download Resume Card */}
          <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <FileDown className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-display font-bold text-white">Resume</h4>
                <p className="text-xs text-text-muted font-mono">PDF Format</p>
              </div>
            </div>

            <a
              href="/Vansh_Singh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl text-xs font-mono font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Download Resume (PDF)</span>
              <FileDown className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
