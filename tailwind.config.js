/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFB6C1', // Warm Pink
          light: '#FFC0CB',
          dark: '#FF69B4',
        },
        cream: {
          DEFAULT: '#FFF8F3', // Cream White
        },
        mint: {
          DEFAULT: '#98FB98', // Mint Green
        },
        lavender: {
          DEFAULT: '#DDA0DD', // Lavender
        }
      },
      fontFamily: {
        sans: ['"Rounded Mplus 1c"', 'sans-serif'], // Example rounded font, might need import in index.css
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}
