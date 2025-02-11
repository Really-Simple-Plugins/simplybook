/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    "bg-[#2E1A47]",
    "bg-[#FFFFFF]",
    "bg-[#333333]",
    "bg-[#B07D50]",
    "bg-[#2E5BB6]",
    "bg-[#0D1635]",
    "bg-[#D04950]",
    "bg-[#D9A441]",//used in the palettes, dynamically
    'rounded-md',
    'border',
    'border-gray-300',
    'bg-white',
    'shadow-lg',
      'after:top-1',//used in checkboxinput in dymamic css, not detected by tailwind
      'after:top-0.5',//used in checkboxinput in dymamic css, not detected by tailwind
  ],
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
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
  important: "#simplybook_app",
};
