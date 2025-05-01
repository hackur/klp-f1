/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "system-ui", "sans-serif"],
        "nunito-sans": ["Nunito Sans", "system-ui", "sans-serif"],
        lato: ["Lato", "system-ui", "sans-serif"],
        figtree: ["Figtree", "system-ui", "sans-serif"],
        manrope: ["Manrope", "system-ui", "sans-serif"],
        roboto: ["Roboto", "system-ui", "sans-serif"],
        "open-sans": ["Open Sans", "system-ui", "sans-serif"],
        "noto-sans": ["Noto Sans", "system-ui", "sans-serif"],
        sen: ["Sen", "system-ui", "sans-serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
        heading: ["Built Titling", "Montserrat", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        kasher: {
          green: "#9aca3c",
          darkGreen: "#8bbb36",
          deepGreen: "#699029",
          black: "#000005",
          white: "#ffffff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        hue: {
          "0%": {
            filter:
              "Saturate(var(--saturate, 6)) Sepia(var(--sepia, 1)) hue-rotate(0deg)",
          },
          "100%": {
            filter:
              "Saturate(var(--saturate, 6)) Sepia(var(--sepia, 1)) hue-rotate(var(--hue, 360deg))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spin: "spin 1s linear infinite",
        hue: "hue 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
