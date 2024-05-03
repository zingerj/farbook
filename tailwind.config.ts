import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        // facebook colors
        fb: {
          blue: "#4267B2",
          grey: "#898F9C",
          black: "#000000",
          dgrey: "#24325D",
          green: "#75A356",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
