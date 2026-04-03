/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
        success: '#28a745',
        danger: '#dc3545'
      }
    }
  },
  plugins: []
}
