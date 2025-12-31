/** @type {import('tailwindcss').Config} */
const {COLORS,SIZES} = require("./src/constants/THEME")
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{...COLORS},
      
    },
  },
  plugins: [],
}