const defaultTheme = require("tailwindcss/defaultTheme");

const fromVariable = (variableName) => `var(${variableName})`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        border: fromVariable("--border"),
        input: fromVariable("--input"),
        ring: fromVariable("--ring"),
        background: fromVariable("--background"),
        foreground: fromVariable("--foreground"),
        card: {
          DEFAULT: fromVariable("--card"),
          foreground: fromVariable("--card-foreground"),
        },
        popover: {
          DEFAULT: fromVariable("--popover"),
          foreground: fromVariable("--popover-foreground"),
        },
        primary: {
          DEFAULT: fromVariable("--primary"),
          foreground: fromVariable("--primary-foreground"),
        },
        secondary: {
          DEFAULT: fromVariable("--secondary"),
          foreground: fromVariable("--secondary-foreground"),
        },
        muted: {
          DEFAULT: fromVariable("--muted"),
          foreground: fromVariable("--muted-foreground"),
        },
        accent: {
          DEFAULT: fromVariable("--accent"),
          foreground: fromVariable("--accent-foreground"),
        },
        destructive: {
          DEFAULT: fromVariable("--destructive"),
          foreground: fromVariable("--destructive-foreground"),
        },
        chart: {
          1: fromVariable("--chart-1"),
          2: fromVariable("--chart-2"),
          3: fromVariable("--chart-3"),
          4: fromVariable("--chart-4"),
          5: fromVariable("--chart-5"),
        },
        sidebar: {
          DEFAULT: fromVariable("--sidebar"),
          foreground: fromVariable("--sidebar-foreground"),
          primary: fromVariable("--sidebar-primary"),
          "primary-foreground": fromVariable("--sidebar-primary-foreground"),
          accent: fromVariable("--sidebar-accent"),
          "accent-foreground": fromVariable("--sidebar-accent-foreground"),
          border: fromVariable("--sidebar-border"),
          ring: fromVariable("--sidebar-ring"),
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        heading: ["var(--font-heading)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "border-beam": "border-beam calc(var(--duration) * 1s) infinite linear",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
