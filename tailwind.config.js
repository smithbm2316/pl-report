const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './pages/**/*.jsx',
    './pages/**/*.tsx',
    './pages/**/*.js',
    './pages/**/*.ts',
    './components/**/*.jsx',
    './components/**/*.tsx',
    './components/**/*.js',
    './components/**/*.ts',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        emerald: colors.emerald,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
