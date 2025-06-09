/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        text: '#000000',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      transitionProperty: {
        'width': 'width',
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'spin-pause': {
          'from': { transform: 'rotate(var(--rotation, 0deg))' },
          'to': { transform: 'rotate(calc(var(--rotation, 0deg) + 360deg))' }
        }
      },
      animation: {
        'spin-slow': 'spin-pause 8s linear infinite',
      },
    },
  },
  plugins: [],
  important: true,
} 