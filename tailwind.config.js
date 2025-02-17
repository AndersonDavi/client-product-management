/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          200: "#545454",
          500: "#1a1919",
          800: "#141414",
        },
      },
    },
  },
  plugins: [],
};
