/** @type {import('tailwindcss').Config} */
import {COLORS} from "./src/constants/THEME"
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'health-green': '#2e7d32',
      },
    },
  },
  plugins: [],
}