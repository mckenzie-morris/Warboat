/** @type {import('tailwindcss').Config} */
import fluid, { extract, fontSize } from "fluid-tailwind";

export default {
  content: {
    files: [
      /* scan all files (of specified types below) for their use of Tailwind classes.
    Only the styles actually used will be included the final CSS output */
      "./src/**/*.{html,js,jsx}", // scan all html, js, and jsx files in src folder
    ],
    extract,
  },
  theme: {
    fontSize,
    extend: {
      colors: {
        primaryTheme: "rgba(var(--primary))",
        secondaryTheme: "rgba(var(--secondary))",
        tertiaryTheme: "rgba(var(--tertiary))",
        quaternaryTheme: "rgba(var(--quaternary))",
      },
      // screens' units have to be in REM (as opposed to px) to integrate Fluid-Tailwind package
      screens: {
        sm: "40rem",
        md: "48rem",
        lg: "64rem",
        xl: "80rem",
        "2xl": "96rem",
        "3xl": "112rem",
      },
    },
  },
  plugins: [
    require("@designbycode/tailwindcss-text-shadow"),
    require("fluid-tailwind"),
  ],
};
