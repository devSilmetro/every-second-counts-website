import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-soft": "var(--ink-soft)",
        muted: "var(--muted)",
        rule: "var(--rule)",
        "rule-soft": "var(--rule-soft)",
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        "paper-deep": "var(--paper-deep)",
        amber: "var(--amber)",
        "amber-soft": "var(--amber-soft)",
        crimson: "var(--crimson)",
        "crimson-deep": "var(--crimson-deep)",
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
