"use client";

import React, { useState, useRef } from "react";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Copy, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from "@/data/portfolioData";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export function TerminalCard() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-accent-cyan font-semibold">
            ⚡ Welcome to Vansh&apos;s interactive developer terminal!
          </p>
          <p className="text-text-muted">
            Type <span className="text-accent-violet font-mono font-bold">help</span> or <span className="text-accent-cyan font-mono font-bold">recruiter</span> to view executive overview, systems architecture, and contact links.
          </p>
        </div>
      ),
      timestamp: "12:00:00",
    },
  ]);
  const [copied, setCopied] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const now = new Date().toLocaleTimeString();

    let output: React.ReactNode;

    switch (trimmed) {
      case "help":
      case "commands":
        output = (
          <div className="space-y-1.5 text-xs text-text-secondary font-mono">
            <p className="text-white font-semibold">Available system commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-accent-cyan font-semibold">recruiter</span> - 10-second candidate executive brief</div>
              <div><span className="text-accent-cyan font-semibold">whoami</span> - Background & UMass Amherst details</div>
              <div><span className="text-accent-cyan font-semibold">projects</span> - List engineering case studies</div>
              <div><span className="text-accent-cyan font-semibold">skills</span> - Technical skills matrix</div>
              <div><span className="text-accent-cyan font-semibold">resume</span> - Download PDF resume</div>
              <div><span className="text-accent-cyan font-semibold">linkedin</span> - View LinkedIn profile</div>
              <div><span className="text-accent-cyan font-semibold">cloud</span> - View cloud IaC architecture specs</div>
              <div><span className="text-accent-cyan font-semibold">hacktheherd</span> - WasteLess edge AI project</div>
              <div><span className="text-accent-cyan font-semibold">contact</span> - Get email, phone, & socials</div>
              <div><span className="text-accent-cyan font-semibold">hire</span> - Trigger celebration & hiring link</div>
              <div><span className="text-accent-cyan font-semibold">clear</span> - Flush terminal buffer</div>
            </div>
          </div>
        );
        break;

      case "whoami":
      case "bio":
        output = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-white font-bold">{PERSONAL_INFO.name}</p>
            <p className="text-text-secondary">{PERSONAL_INFO.title}</p>
            <p className="text-text-muted mt-1">{PERSONAL_INFO.bio}</p>
            <div className="pt-2 text-accent-cyan flex flex-wrap gap-2">
              <span>🎓 BS Computer Engineering &apos;26</span>
              <span>•</span>
              <span>📈 MS Business Analytics &apos;27</span>
              <span>•</span>
              <span>📍 {PERSONAL_INFO.locations.join(" / ")}</span>
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-accent-cyan font-semibold">Featured Projects:</p>
            {PROJECTS.map((p, i) => (
              <div key={p.id} className="pl-2 border-l border-white/10 space-y-0.5">
                <span className="text-white font-semibold">[{i + 1}] {p.title}</span>
                <span className="text-accent-violet ml-2">({p.category})</span>
                <p className="text-text-muted text-[11px]">{p.summary}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-xs font-mono">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.title}>
                <span className="text-accent-cyan font-semibold">{cat.title}: </span>
                <span className="text-text-secondary">
                  {cat.skills.map((s) => s.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case "hacktheherd":
      case "wasteless":
        output = (
          <div className="space-y-1.5 text-xs font-mono text-emerald-300">
            <p className="font-bold text-accent-emerald">🌱 WasteLess (Frutiger Eco) - Hack the Herd Fall 2025:</p>
            <p className="text-text-secondary text-[11px]">
              Edge neural network with camera inference to log food waste and stream analytics with 60s plate deduplication caching.
            </p>
            <div className="pt-1 flex flex-wrap gap-3 text-[11px]">
              <a href="https://devpost.com/software/wasteless-lkvgnz" target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline">↗ Devpost Submission</a>
              <a href="https://github.com/vsingh2005/HackTheHerd2025" target="_blank" rel="noopener noreferrer" className="text-accent-violet hover:underline">↗ GitHub Repo</a>
            </div>
          </div>
        );
        break;

      case "cloud":
        output = (
          <div className="space-y-1 text-xs font-mono text-text-secondary">
            <p className="text-white font-bold">☁️ Multi-Tenant Cloud IaC Blueprint:</p>
            <p className="text-accent-emerald">✓ AWS Terraform provider initialized</p>
            <p className="text-accent-emerald">✓ 6 Microservice deployment modules provisioned</p>
            <p className="text-accent-emerald">✓ Automated monitoring daemons active (40% time cut)</p>
          </div>
        );
        break;

      case "recruiter":
      case "brief":
      case "summary":
        output = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-cyan-300 font-bold">⚡ 10-Second Candidate Summary:</p>
            <p className="text-white">🎓 B.S. CompE &apos;26 • M.S. Business Analytics &apos;27 @ UMass Amherst</p>
            <p className="text-emerald-300">🛡️ {PERSONAL_INFO.recruiterBrief.workAuth}</p>
            <p className="text-text-secondary">🕒 {PERSONAL_INFO.recruiterBrief.availability}</p>
            <div className="pt-1 text-text-muted space-y-0.5 text-[11px]">
              <p className="text-white font-medium">🎯 Target Roles:</p>
              {PERSONAL_INFO.recruiterBrief.targetRoles.map((r, i) => (
                <p key={i} className="pl-2 text-cyan-300">• {r}</p>
              ))}
            </div>
            <div className="pt-1.5 flex flex-wrap gap-2 text-[11px]">
              <a href={PERSONAL_INFO.resumePdf} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">📄 View Resume (PDF)</a>
              <span>•</span>
              {PERSONAL_INFO.linkedin && (
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">👔 LinkedIn Profile</a>
              )}
              <span>•</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-violet-300 hover:underline">📧 Email Direct</a>
            </div>
          </div>
        );
        break;

      case "resume":
      case "cv":
        output = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-white font-semibold">📄 Official Resume (PDF):</p>
            <p className="text-cyan-300">
              <a href={PERSONAL_INFO.resumePdf} target="_blank" rel="noopener noreferrer" className="hover:underline">
                ↗ Click here to open and download 1-page PDF
              </a>
            </p>
          </div>
        );
        break;

      case "linkedin":
        output = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-white font-semibold">👔 LinkedIn Profile:</p>
            <p className="text-blue-300">
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                ↗ {PERSONAL_INFO.linkedin}
              </a>
            </p>
          </div>
        );
        break;

      case "hire":
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
        output = (
          <div className="space-y-1.5 text-xs font-mono text-emerald-300">
            <p className="font-bold text-white text-sm">🎉 Let&apos;s build together!</p>
            <p className="text-text-secondary">
              Direct inbox link: <a href={`mailto:${PERSONAL_INFO.email}?subject=Opportunity%20Discussion%20with%20Vansh`} className="text-cyan-300 underline font-semibold">Send email to {PERSONAL_INFO.email}</a>
            </p>
            <p className="text-text-muted text-[11px]">Looking forward to discussing systems, cloud, and engineering roles.</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-white font-semibold">Contact & Links:</p>
            <p>📧 Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-accent-cyan hover:underline">{PERSONAL_INFO.email}</a></p>
            {PERSONAL_INFO.linkedin && (
              <p>👔 LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">{PERSONAL_INFO.linkedin}</a></p>
            )}
            <p>💻 GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-accent-violet hover:underline">{PERSONAL_INFO.github}</a></p>
            <p>🏆 Devpost: <a href={PERSONAL_INFO.devpost} target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline">{PERSONAL_INFO.devpost}</a></p>
            <p>📍 Location: Chicago, IL / Amherst, MA</p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      case "":
        return;

      default:
        output = (
          <p className="text-rose-400 text-xs font-mono">
            Command not recognized: &quot;{cmd}&quot;. Type <span className="text-accent-cyan font-bold">help</span> to view available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output, timestamp: now }]);

    // Only scroll the internal terminal box, never the whole window
    setTimeout(() => {
      if (terminalBodyRef.current) {
        terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
      }
    }, 10);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(`ssh vansh@${PERSONAL_INFO.githubHandle}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-2xl glass-panel-glow border border-white/10 overflow-hidden shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-background-deep/90 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-mono text-text-muted flex items-center gap-1">
            <TerminalIcon className="w-3.5 h-3.5 text-accent-cyan" />
            <span>ringularity0@umass-box: ~</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyPrompt}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-text-muted hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-all"
            title="Copy command"
          >
            {copied ? <Check className="w-3 h-3 text-accent-emerald" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Quick SSH"}</span>
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalBodyRef}
        onClick={() => inputRef.current?.focus()}
        className="p-4 sm:p-5 max-h-[320px] overflow-y-auto space-y-3 font-mono text-sm bg-background-deep/60 scanline cursor-text"
      >
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span className="text-accent-cyan">ringularity0@portfolio</span>
              <span className="text-white/40">:</span>
              <span className="text-accent-violet">~</span>
              <span className="text-white/40">$</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}

        {/* Input prompt */}
        <form onSubmit={onSubmit} className="flex items-center gap-2 text-xs pt-1">
          <span className="text-accent-cyan">ringularity0@portfolio</span>
          <span className="text-white/40">:</span>
          <span className="text-accent-violet">~</span>
          <span className="text-white/40">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-text-muted/40 text-xs"
            placeholder="Type 'help', 'whoami', 'projects', 'skills'..."
            autoComplete="off"
            spellCheck="false"
          />
          <button type="submit" className="text-text-muted hover:text-accent-cyan transition-colors">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
