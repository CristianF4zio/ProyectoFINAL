import { nextui } from "@nextui-org/react";
import daisyui from "daisyui"; // Assuming daisyui exports as default

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui, nextui()],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  darkMode: "class",
};
