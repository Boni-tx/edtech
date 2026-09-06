import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Azul-marinho profissional — cor primária (confiança/educação)
        navy: {
          50: "#EEF2F8",
          100: "#D6E0EE",
          300: "#7C93BE",
          500: "#2C4573",
          700: "#182D52",
          900: "#0B1730", // primária principal
          950: "#070F20",
        },
        // Verde de sucesso/confirmação — usar com moderação
        confirm: {
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
        },
        // Fundo off-white sutil
        canvas: "#FCFCFD",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,23,48,0.04), 0 12px 32px -12px rgba(11,23,48,0.18)",
        "card-hover": "0 4px 8px rgba(11,23,48,0.06), 0 24px 48px -12px rgba(11,23,48,0.26)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(11,23,48,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(11,23,48,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
