/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0891b2',
          light: '#22d3ee',
        },
        secondary: '#64748b',
        accent: '#f59e0b',
        sand: {
          DEFAULT: '#f3e8c8',
          dark: '#e6d5a5',
        },
        water: {
          light: '#38bdf8',
          DEFAULT: '#0ea5e9',
          dark: '#0369a1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'float': 'floating 6s ease-in-out infinite',
        'wave': 'wave 25s linear infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        wave: {
          '0%': { transform: 'translateX(0) translateZ(0) scaleY(1)' },
          '50%': { transform: 'translateX(-25%) translateZ(0) scaleY(0.8)' },
          '100%': { transform: 'translateX(-50%) translateZ(0) scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
};