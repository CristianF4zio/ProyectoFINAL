/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors:{
      'orange': '#f55800',
      'white': '#ffffff', 
      'black': '#000000',
    },
    extend: {},
  },
  plugins: [require("daisyui"),nextui()],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  darkMode: "class",
}

