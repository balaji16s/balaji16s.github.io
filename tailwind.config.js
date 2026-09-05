/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './gym/**/*.html',
    './kuralverse/**/*.html',
    './my-thailapuram/**/*.html',
    './prompt-lib/**/*.html',
    './win-your-week/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        hand: ['Montserrat', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
        mono: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
