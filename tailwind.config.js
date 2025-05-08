/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "artwork-bg": "#0d0d0d",
        "artwork-text": "#f4f4f4",
        "artwork-highlight": "#c084fc",
        "team-bg": "#fef6f0",
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
