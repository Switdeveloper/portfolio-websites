/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        verdant: {
          50: '#E8F5E3',
          100: '#D4EDCC',
          200: '#A8DBA0',
          300: '#6BBF59',
          400: '#3D9E2F',
          500: '#2D5A27',
          600: '#234820',
          700: '#1A3619',
          800: '#122413',
          900: '#0B170D',
        },
        amber: {
          400: '#D4A017',
          500: '#8B6914',
          600: '#6B5210',
        },
        cream: '#FAFAF7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}