/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      fontFamily:{
        'sg': ['"Space Grotesk"'],
        'in': ['"Inter"'],
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}