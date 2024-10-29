/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      color: {
        primary: "#06adef",
        secondary: "#0b3052",
        tertiary: "#ff3259",
      },
      textColor: {
        black: "rgb(0 0 0 / 0.8)",
        white: "rgb(255 255 255 / 0.85)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: '#simplybook_app',
};
