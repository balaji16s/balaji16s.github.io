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
        hand: ['Caveat', 'cursive'],
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
