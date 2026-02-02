/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fuliza-green': '#1BA039',
        'fuliza-dark': '#1a1a1a',
      }
    },
  },
  plugins: [],
}
