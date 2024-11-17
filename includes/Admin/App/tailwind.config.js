/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#b3e4f9",
          DEFAULT: "#06adef",
          dark: "#055b78",
        },
        secondary: {
          light: "#ffb3c1",
          DEFAULT: "#ff3259",
          dark: "#7f192c",
        },
        tertiary: {
          light: "#f0f4fe",
          DEFAULT: "#8191bb",
          dark: "#0b3052",
        },
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
  important: "#simplybook_app",
};
