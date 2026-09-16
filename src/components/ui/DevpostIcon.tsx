import React from "react";

export function DevpostIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Devpost"
    >
      <path d="M6.002 1.61 0 12.016 6.002 22.39h11.996L24 12.016 17.998 1.61zm1.593 4.084h3.947c2.757 0 4.75 1.573 4.75 4.312 0 2.766-2.02 4.34-4.75 4.34H7.595zm2.502 2.45v3.742h1.445c1.428 0 2.373-.772 2.373-1.871 0-1.1-.945-1.871-2.373-1.871z" />
    </svg>
  );
}
