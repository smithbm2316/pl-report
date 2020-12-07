const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './pages/**/*.js,*.jsx,*.ts,*.tsx,',
    './components/**/*.js,*.jsx,*.ts,*.tsx,',
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
