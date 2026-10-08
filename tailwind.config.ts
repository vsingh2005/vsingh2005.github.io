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
        // Bugster Palette Swatch
        brand: {
          blue: "#048AF8",
          navy: "#062844",
          coral: "#F9857D",
          olive: "#9B8E5C",
          slate: "#486073",
          lime: "#C9D4A3",
          lightLime: "#E4ECC9",
        },
        surface: {
          light: "#F7F7F2",
          lightCard: "#FFFFFF",
          lightBorder: "#E2E5DC",
          dark: "#060D17",
          darkCard: "#0C1829",
          darkCardHover: "#11223A",
          darkBorder: "#1B2F4C",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "var(--font-syne)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        solid: "3px 3px 0px 0px rgba(6, 40, 68, 1)",
        "solid-lg": "5px 5px 0px 0px rgba(6, 40, 68, 1)",
        "solid-sm": "2px 2px 0px 0px rgba(6, 40, 68, 1)",
        "solid-dark": "3px 3px 0px 0px rgba(4, 138, 248, 0.4)",
        "solid-coral": "3px 3px 0px 0px rgba(249, 133, 125, 0.6)",
        "solid-lime": "3px 3px 0px 0px rgba(6, 40, 68, 0.9)",
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
