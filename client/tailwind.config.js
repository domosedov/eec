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
        gray: colors.blueGray
        
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
