/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // add this line
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // Override the default 'sans' font family
      },
      borderWidth: {
        12: '12px',
        14: '14px',
        16: '16px',
        24: '24px'
      },
    },
  },
  plugins: [],
}