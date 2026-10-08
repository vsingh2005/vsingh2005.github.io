import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Silicon & Ember Palette Tokens
        brand: {
          ember: "#FF5722",      // Primary Electric Ember (Hardware warmth, matches Mii jacket)
          amber: "#FFB020",      // Secondary Amber Gold (Logic & energy)
          cobalt: "#2563EB",     // Cool Steel Cobalt (Systems & cloud)
          charcoal: "#18181B",   // Deep Obsidian Charcoal (Ink, borders & shadows)
          slate: "#52525B",      // Balanced Secondary Slate
          cream: "#FEF3C7",      // Warm Cream for tags & chip fills
          lightAmber: "#FFFBEB", // Soft Warm Tint
          
          // Semantic & Backwards-Compatible Aliases
          blue: "#2563EB",       // Steel Cobalt replaces electric blue
          navy: "#18181B",       // Obsidian Charcoal replaces navy
          coral: "#FF5722",      // Electric Ember replaces coral
          olive: "#D97706",      // Warm Amber replaces olive
          lime: "#FFB020",       // Amber Gold replaces lime
          lightLime: "#FEF3C7",  // Warm Cream replaces lightLime
        },
        surface: {
          light: "#FBFBF9",
          lightCard: "#FFFFFF",
          lightBorder: "#E4E4E7",
          dark: "#0E0F12",
          darkCard: "#18181B",
          darkCardHover: "#27272A",
          darkBorder: "#27272A",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "var(--font-syne)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        solid: "3px 3px 0px 0px rgba(24, 24, 27, 1)",
        "solid-lg": "5px 5px 0px 0px rgba(24, 24, 27, 1)",
        "solid-sm": "2px 2px 0px 0px rgba(24, 24, 27, 1)",
        "solid-dark": "3px 3px 0px 0px rgba(255, 87, 34, 0.35)",
        "solid-ember": "3px 3px 0px 0px rgba(255, 87, 34, 0.8)",
        "solid-amber": "3px 3px 0px 0px rgba(255, 176, 32, 0.8)",
        "solid-cobalt": "3px 3px 0px 0px rgba(37, 99, 235, 0.8)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "bounce-subtle": "bounceSubtle 3s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
