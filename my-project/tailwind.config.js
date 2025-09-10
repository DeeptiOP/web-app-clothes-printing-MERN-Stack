/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        libre: ['"Libre Baskerville"', 'serif'],
        bodoni: ['"Bodoni Moda"', 'serif']
      },
    },
  },
  plugins: [],
}
