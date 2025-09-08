/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-reverse': 'float-reverse 6s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'shooting-star': 'shooting-star 3s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'spin-reverse': 'spin-reverse 15s linear infinite',
        'orbit': 'orbit 4s linear infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'blink': 'blink 1s infinite',
      },
      colors: {
        'space-dark': '#0f172a',
        'space-light': '#f8fafc',
      }
    },
  },
  plugins: [],
};