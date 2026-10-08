"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="inline-flex items-center justify-center p-2 rounded-xl border border-surface-lightBorder dark:border-surface-darkBorder bg-surface-lightCard dark:bg-surface-darkCard text-brand-navy dark:text-white hover:border-brand-blue/60 transition-all shadow-solid-sm dark:shadow-none"
      aria-label="Toggle dark/light theme"
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 text-brand-slate" />
      ) : (
        <Sun className="w-4 h-4 text-amber-400" />
      )}
    </button>
  );
}
