const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: [
      "./components/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
      whitelist: [],
    },
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
        gray: colors.blueGray,
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ["focus-visible"],
      ringColor: ["focus-visible"],
      ringOpacity: ["focus-visible"],
      ringOffsetWidth: ["focus-visible"],
      ringOffsetColor: ["focus-visible"],
      outline: ["focus-visible"],
      textColor: ["focus-visible"],
      backgroundColor: ["focus-visible"],
      transform: ["focus-visible"],
      scale: ["focus-visible"],
    },
  },
  plugins: [],
};
