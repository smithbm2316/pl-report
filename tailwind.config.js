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
      colors: {
        emerald: colors.emerald,
      },
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
      gridTemplateRows: {
        mobile: '80px auto',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
