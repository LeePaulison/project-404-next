import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import * as radixColors from "@radix-ui/colors";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Light and Dark Palettes
        light: {
          primary: "#5D7371",
          secondary: "#B4BEBF",
          background: "#F0F2F2",
          text: "#011C26",
          accent: "#052326",
          aside: "#F4F9F2",
        },
        dark: {
          primary: "#5D7371",
          secondary: "#B4BEBF",
          background: "#011C26",
          text: "#F0F2F2",
          accent: "#2BB5BF",
          aside: "#052326",
        },
        // Radix Colors Integration
        ...Object.fromEntries(Object.entries(radixColors).map(([key, value]) => [key, value])),
      },
      typography: {
        DEFAULT: {
          css: {
            code: {
              color: "#5D7371",
              backgroundColor: "#F0F2F2",
              borderRadius: "0.25rem",
              padding: "0.2rem 0.4rem",
            },
          },
        },
        dark: {
          css: {
            code: {
              color: "#B4BEBF",
              backgroundColor: "#011C26",
            },
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [typography],
} satisfies Config;
