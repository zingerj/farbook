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
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
