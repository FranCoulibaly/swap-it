/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  important: true,
}