/** @type {import('tailwindcss').Config} */
module.exports = {
  important: "#simplybook_app",
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
  theme: {
    extend: {
      fontSize: {
        '1xl': '1.25rem',
        '2xl': '1.75rem',
        '3xl': '2.25rem',

      },
      colors: {
        primary: {
          light: "#b3e4f9",
          DEFAULT: "#06adef",
          dark: "#055b78",
        },
        secondary: {
          light: "#ffb3c1",
          DEFAULT: "#ff3259",
          dark: "#950c28",
        },
        tertiary: {
          light: "#f0f4fe",
          DEFAULT: "#0c3052",
          dark: "#061f32",
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
  // important: "#simplybook_app",
};