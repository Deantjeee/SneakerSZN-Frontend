/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/Root.jsx"
  ],
  theme: {
    extend: {
      colors: {
        main: "#77D4FC",
        secondary: "#03335D",
        secondaryHover: "#065196",
        backgroundLight: "#F6F6F6"
      },
      fontFamily: {
        logo: ['"Fugaz One"', 'sans-serif']
      }
    },
  },
  plugins: [],
}

