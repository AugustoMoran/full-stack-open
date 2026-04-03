/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#646cff',
        secondary: '#51cf66',
        danger: '#dc3545',
        dark: '#333',
      }
    },
  },
}
