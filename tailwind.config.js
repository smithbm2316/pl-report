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
    screens: {
      xs: '350px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        emerald: colors.emerald,
        violet: colors.violet,
        fuchsia: colors.fuchsia,
        laserwave: {
          dark: '#27212e',
          blackout: '#171521',
          midnight: '#231b30',
          night: '#312942',
          evening: '#4e3d69',
          blue: '#40b4c4',
          green: '#74dfc4',
          gray: '#716385',
          magenta: '#b381c5',
          hotPink: '#eb64b9',
          white: '#e0dfe1',
        },
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
      width: {
        1024: '1024px',
        1280: '1280px',
        1420: '1420px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
