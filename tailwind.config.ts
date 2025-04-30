const animate = require("tailwindcss-animate");
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
import { PluginAPI } from "tailwindcss/types/config";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",

  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border) / 0.2)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#9aca3c",
          foreground: "#000005",
        },
        secondary: {
          DEFAULT: "#8bbb836",
          foreground: "#ffffff",
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
          DEFAULT: "#699029",
          foreground: "#ffffff",
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
          "dark-green": "#8bbb836",
          "dark-green-2": "#699029",
          black: "#000005",
          white: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Avenir Next", ...defaultTheme.fontFamily.sans],
        heading: [
          "Built Titling",
          "Avenir Next",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: 0 },
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
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
        spin: "spin 1s linear infinite",
        hue: "hue 20s linear infinite",
      },
    },
  },
  plugins: [
    animate,
    plugin(function ({ addUtilities, theme }: PluginAPI) {
      addUtilities({
        ".drop-shadow-sharp-black": {
          filter:
            "drop-shadow(2px 2px 0 rgb(0 0 0 / 0.85)) drop-shadow(3px 3px 0 rgb(0 0 0 / 0.6))",
        },
      });
    }),
  ],
};
