"use client";

import React, { useState } from "react";
import { Mail, Send, Check, Copy, Github, MessageSquare, AlertCircle } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Please enter your name (min 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = "Please enter a subject (min 3 characters).";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Direct email client dispatch
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const body = encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;

    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 scroll-mt-20 border-t border-surface-lightBorder dark:border-surface-darkBorder">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Outreach & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-ember/10 border border-brand-ember/30 text-xs font-mono font-bold text-brand-ember">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Get in Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-navy dark:text-white tracking-tight">
                Let&apos;s build scalable systems together.
              </h2>
              <p className="text-sm sm:text-base text-brand-slate dark:text-gray-300 leading-relaxed font-normal">
                I am actively considering opportunities in Cloud Infrastructure, Embedded Software, and Systems Engineering for Spring 2027 internships and May 2027 full-time roles.
              </p>
            </div>

            {/* Quick Email Copy Box */}
            <div className="neo-card p-5 rounded-3xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-surface-darkBorder shadow-solid-sm dark:shadow-none space-y-2">
              <span className="text-xs font-mono text-brand-slate dark:text-gray-400 block font-semibold">
                Direct Email:
              </span>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm sm:text-base font-bold text-brand-navy dark:text-white select-all">
                  {PERSONAL_INFO.email}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="neo-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-brand-amber text-brand-navy border border-brand-navy shadow-solid-sm"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl font-mono text-xs font-bold text-brand-navy dark:text-white bg-white dark:bg-surface-darkCard border border-surface-lightBorder dark:border-surface-darkBorder shadow-solid-sm hover:border-brand-blue"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository ↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="neo-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface-darkCard border-2 border-brand-navy dark:border-surface-darkBorder shadow-solid dark:shadow-none">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-brand-lightLime border-2 border-brand-navy flex items-center justify-center mx-auto text-brand-navy">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-brand-navy dark:text-white">
                    Email Client Dispatched!
                  </h3>
                  <p className="text-sm text-brand-slate dark:text-gray-300 max-w-md mx-auto">
                    Your message draft has been initiated in your default email client. You can also reach me directly at <strong>{PERSONAL_INFO.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="neo-btn px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-brand-blue text-white border border-brand-navy shadow-solid-sm"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-lightBorder dark:border-surface-darkBorder">
                    <h3 className="text-base font-bold font-display text-brand-navy dark:text-white">
                      Send a Direct Message
                    </h3>
                    <span className="text-xs font-mono text-brand-slate dark:text-gray-400">
                      Response within 24h
                    </span>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-brand-navy dark:text-gray-300 block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        placeholder="e.g. Alex Chen"
                        className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-surface-light dark:bg-surface-dark text-brand-navy dark:text-white border border-surface-lightBorder dark:border-surface-darkBorder focus:outline-none focus:border-brand-blue transition-colors font-sans"
                      />
                      {errors.name && (
                        <p className="text-[11px] font-mono text-rose-500 flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-brand-navy dark:text-gray-300 block">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-surface-light dark:bg-surface-dark text-brand-navy dark:text-white border border-surface-lightBorder dark:border-surface-darkBorder focus:outline-none focus:border-brand-blue transition-colors font-sans"
                      />
                      {errors.email && (
                        <p className="text-[11px] font-mono text-rose-500 flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-brand-navy dark:text-gray-300 block">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (errors.subject) setErrors({ ...errors, subject: "" });
                      }}
                      placeholder="e.g. Systems Engineering Role / Collaboration"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-surface-light dark:bg-surface-dark text-brand-navy dark:text-white border border-surface-lightBorder dark:border-surface-darkBorder focus:outline-none focus:border-brand-blue transition-colors font-sans"
                    />
                    {errors.subject && (
                      <p className="text-[11px] font-mono text-rose-500 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-brand-navy dark:text-gray-300 block">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: "" });
                      }}
                      placeholder="Describe the opportunity, technical stack, or project discussion..."
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-surface-light dark:bg-surface-dark text-brand-navy dark:text-white border border-surface-lightBorder dark:border-surface-darkBorder focus:outline-none focus:border-brand-blue transition-colors font-sans resize-none"
                    />
                    {errors.message && (
                      <p className="text-[11px] font-mono text-rose-500 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="neo-btn w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-mono text-sm font-bold text-white bg-brand-ember border-2 border-brand-navy shadow-solid hover:shadow-solid-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message (Direct Email)</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
