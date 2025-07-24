/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        sigap: {
          blue: "#297DD4",
          lightblue: "#4DB1EC",
          teal: "#7ED9F8",
          lightteal: "#D8F6F9",
          dark: "#0B0F2C",         
        }
      }
    },
  },
  plugins: [],
}