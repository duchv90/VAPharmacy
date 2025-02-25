/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    screens: {
      sm: '580px',
      md: '767px',
      lg: '1024px',
      xl: '1200px',
      '2xl': '1432px', // Override the max-width for '2xl'
    },
    fontFamily: {
      sans: ['Jost', 'sans-serif'],
      serif: ['Jost', 'serif'],
    },
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
};
