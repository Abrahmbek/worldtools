/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "!./src/mui-styles.css",
    "!./src/tui-editor-styles.css",
  ],
  important: "#root",
  theme: {
    extend: {
      maxWidth: {
        container: "1440px",
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        bodyFont: ["DM Sans", "sans-serif"],
        titleFont: ["Poppins", "sans-serif"],
      },
      colors: {
        primeColor: "#262626",
        lightText: "#6D6D6D",
        delayedYellow: "#FCFE00",
        springGreen: "#39FF14",
        electricPurple: "#5501EE",
        card_bg_01: "#d6e5fb",
        card_bg_02: "#ceebe9",
        card_bg_03: "#e2f2b2",
        card_bg_04: "#fdefe6",
        purple: "#7F187F",
        vividPink: "#FF0F7A",
        primary: "#fea928",
        secondary: "#ed8900",
      },
      boxShadow: {
        testShadow: "0px 0px 54px -13px rgba(0,0,0,0.7)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
