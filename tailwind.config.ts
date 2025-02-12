import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        CSky: "#C3EBFA",
        CSkyLight: "EDF9FD",
        CPurple: "#CFCEFF",
        CPurpleLight: "#F1F0FF",
        CYellow: "#FAE27C",
        CYellowLight: "#FEFCE8",
      },
    },
  },
  plugins: [],
} satisfies Config;
