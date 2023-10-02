/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        'sg': ['"Space Grotesk"'],
        'in': ['"Inter"'],
      },
    },
  },
  plugins: [],
}