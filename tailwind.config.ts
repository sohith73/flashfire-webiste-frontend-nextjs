import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ff4c00",
          dark: "#e64400",
          light: "#ff6b33",
        },
        background: {
          DEFAULT: "#fff6f4",
          secondary: "#f9e8e0",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        "orange-bottom": "0 3px 0 #ff4c00",
        "orange-bottom-hover": "0 4px 0 #ff4c00",
      },
      keyframes: {
        "block-1": {
          "0%": {
            transform: "translate(0, 0) rotate(12deg)",
          },
          "25%": {
            transform: "translate(80px, 60px) rotate(22deg)",
          },
          "50%": {
            transform: "translate(150px, 100px) rotate(32deg)",
          },
          "75%": {
            transform: "translate(80px, 60px) rotate(22deg)",
          },
          "100%": {
            transform: "translate(0, 0) rotate(12deg)",
          },
        },
        "block-2": {
          "0%": {
            transform: "translate(0, 0) rotate(-12deg)",
          },
          "25%": {
            transform: "translate(-60px, 80px) rotate(-22deg)",
          },
          "50%": {
            transform: "translate(-120px, 150px) rotate(-32deg)",
          },
          "75%": {
            transform: "translate(-60px, 80px) rotate(-22deg)",
          },
          "100%": {
            transform: "translate(0, 0) rotate(-12deg)",
          },
        },
        "block-3": {
          "0%": {
            transform: "translate(0, 0) rotate(45deg)",
          },
          "25%": {
            transform: "translate(100px, -40px) rotate(55deg)",
          },
          "50%": {
            transform: "translate(200px, -80px) rotate(65deg)",
          },
          "75%": {
            transform: "translate(100px, -40px) rotate(55deg)",
          },
          "100%": {
            transform: "translate(0, 0) rotate(45deg)",
          },
        },
        "block-4": {
          "0%": {
            transform: "translate(0, 0) rotate(-45deg)",
          },
          "25%": {
            transform: "translate(-90px, -50px) rotate(-55deg)",
          },
          "50%": {
            transform: "translate(-180px, -100px) rotate(-65deg)",
          },
          "75%": {
            transform: "translate(-90px, -50px) rotate(-55deg)",
          },
          "100%": {
            transform: "translate(0, 0) rotate(-45deg)",
          },
        },
        "block-5": {
          "0%": {
            transform: "translate(0, 0) rotate(12deg)",
          },
          "25%": {
            transform: "translate(50px, -60px) rotate(22deg)",
          },
          "50%": {
            transform: "translate(100px, -120px) rotate(32deg)",
          },
          "75%": {
            transform: "translate(50px, -60px) rotate(22deg)",
          },
          "100%": {
            transform: "translate(0, 0) rotate(12deg)",
          },
        },
        "block-6": {
          "0%": {
            transform: "translate(0, 0) rotate(-12deg)",
          },
          "25%": {
            transform: "translate(-75px, -40px) rotate(-22deg)",
          },
          "50%": {
            transform: "translate(-150px, -80px) rotate(-32deg)",
          },
          "75%": {
            transform: "translate(-75px, -40px) rotate(-22deg)",
          },
          "100%": {
            transform: "translate(0, 0) rotate(-12deg)",
          },
        },
        "block-7": {
          "0%": {
            transform: "translate(0, 0) rotate(45deg)",
          },
          "25%": {
            transform: "translate(60px, 60px) rotate(55deg)",
          },
          "50%": {
            transform: "translate(120px, 120px) rotate(65deg)",
          },
          "75%": {
            transform: "translate(60px, 60px) rotate(55deg)",
          },
          "100%": {
            transform: "translate(0, 0) rotate(45deg)",
          },
        },
        "block-8": {
          "0%": {
            transform: "translate(0, 0) rotate(-45deg)",
          },
          "25%": {
            transform: "translate(-50px, 50px) rotate(-55deg)",
          },
          "50%": {
            transform: "translate(-100px, 100px) rotate(-65deg)",
          },
          "75%": {
            transform: "translate(-50px, 50px) rotate(-55deg)",
          },
          "100%": {
            transform: "translate(0, 0) rotate(-45deg)",
          },
        },
      },
      animation: {
        "block-1": "block-1 15s ease-in-out infinite",
        "block-2": "block-2 18s ease-in-out infinite",
        "block-3": "block-3 20s ease-in-out infinite",
        "block-4": "block-4 16s ease-in-out infinite",
        "block-5": "block-5 22s ease-in-out infinite",
        "block-6": "block-6 19s ease-in-out infinite",
        "block-7": "block-7 17s ease-in-out infinite",
        "block-8": "block-8 21s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
