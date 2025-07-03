/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e293b",         // Change to your desired color
        "primary-light": "#64748b", // Change to your desired color
        "primary-dark": "#0f172a",  // Change to your desired color
        accent: "#fbbf24",          // Change to your desired color
        "accent-light": "#fde68a",  // Change to your desired color
        light: "#f3f4f6",           // Change to your desired color
      },
    },
  },
  plugins: [],
}