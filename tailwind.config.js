// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1b365d",
        accent:  "#f7931e",
      },
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
