/** @type {import('tailwindcss').Config} */
import { colors } from "./src/theme/theme.js";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 기존 색상은 유지
        "artwork-bg": "#0d0d0d",
        "artwork-text": "#f4f4f4",
        "artwork-highlight": "#c084fc",
        "team-bg": "#fef6f0",

        // 테마 색상 추가
        brand: colors.brand,
        ui: colors.ui,
        state: colors.state,
        btn: colors.button,
        effect: colors.effects,
      },
      fontFamily: {
        "ibm-plex": ["IBM Plex Sans", "sans-serif"],
        noto: ["Noto Sans", "sans-serif"],
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.2 },
        },
      },
      animation: {
        twinkle: "twinkle var(--tw-animation-duration) ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
