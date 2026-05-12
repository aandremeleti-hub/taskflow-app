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
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#ced9fd',
          300: '#b1c2fb',
          400: '#7694f9',
          500: '#3b66f7',
          600: '#355ce6',
          700: '#2c4dbf',
          800: '#233d99',
          900: '#1d327d',
        },
      },
    },
  },
  plugins: [],
}
