const colors = require('tailwindcss/colors')


module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
