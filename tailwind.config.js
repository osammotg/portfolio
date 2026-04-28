/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#141414",
        fg: "#e6e8ee",
        muted: "#a5adcb",
        accent: {
          indigo: "#6366f1",
          cyan: "#06b6d4",
          fuchsia: "#d946ef",
          purple: "#8b5cf6",
        },
      },
      backgroundImage: {
        "gradient-indigo-cyan": "linear-gradient(135deg, #6366f1, #06b6d4)",
        "gradient-fuchsia-purple": "linear-gradient(135deg, #d946ef, #8b5cf6)",
      },
      boxShadow: {
        glow: "0 20px 60px -30px rgba(99,102,241,0.6), 0 40px 80px -40px rgba(8,145,178,0.45)",
        subtle: "0 20px 45px -35px rgba(0,0,0,0.4)",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
      spacing: {
        18: "4.5rem",
      },
      fontFamily: {
        sans: ["Netflix Sans", "Helvetica Neue", "Segoe UI", "Roboto", "Ubuntu", "sans-serif"],
        playfair: ["Playfair Display", "Georgia", "serif"],
        mono: ["JetBrains Mono", "source-code-pro", "Menlo", "Monaco", "Consolas", "Courier New", "monospace"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, -4px, 0)" },
          "50%": { transform: "translate3d(0, 6px, 0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        float: "float 16s ease-in-out infinite",
        "float-slow": "float 24s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        blink: "blink 0.9s step-end infinite",
      },
    },
  },
  plugins: [],
};
