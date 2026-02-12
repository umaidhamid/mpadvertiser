/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#681CA1",
          secondary: "#AA31E4",
          accent: "#FF4081",
          highlight: "#FFC107",
          dark: "#0F0F1B",
          light: "#F8F9FA",
        },
      },
      boxShadow: {
        brand: "0 10px 30px rgba(104, 28, 161, 0.35)",
        glow: "0 0 20px rgba(255, 64, 129, 0.4)",
      },
      borderRadius: {
        brand: "16px",
      },
    },
  },
  plugins: [],
};