/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0f1115",
          card: "#181b20",
          border: "#2a2d34",
          text: "#eceef2",
          muted: "#9ca3af",
        },
      },
    },
  },

  plugins: [],
};
