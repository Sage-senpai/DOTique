// tailwind.config.js
import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#60519B",   // Vibrant Purple
        secondary: "#1E202C", // Dark Base
        accent: "#BFC0D1",    // Soft Lilac
        neutral: "#31323E",   // Deep Neutral
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
});
