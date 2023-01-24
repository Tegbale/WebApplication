/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "tegbale-blue": "#408ED5",
        "tegbale-purple": "#6A10DD",
        "tegbale-green": "#18A40C",
        "tegbale-text-gray": "#A9A9A9",
        "tegbale-navy-blue": "#171D53",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        md: "0 px 0 px 40 px 2 px rgba(0, 0, 0, 0.54)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("@shrutibalasa/tailwind-grid-auto-fit"),
  ],
};
