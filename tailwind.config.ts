import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { brand: { navy: "#012169", red: "#C8102E" } },
      fontFamily: { serif: ["Georgia", "serif"], sans: ["Arial", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
