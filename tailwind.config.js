/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        fkcBlack: '#0A0A0A',
        fkcBlue: '#1E3A8A',
        fkcGold: '#C5A059',
        fkcDarkGold: '#9A7B38',
      },
    },
  },
  plugins: [],
}