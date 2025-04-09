/** @type {import('tailwindcss').Config} */
import fluid, { extract, fontSize } from "fluid-tailwind";

export default {
  content: {
    files: [
      /* scan all files (of specified types below) for their use of Tailwind classes.
    Only the styles actually used will be included the final CSS output */
      "./client/src/**/*.{html,js,jsx}", // scan all html, js, and jsx files in src folder
    ],
    extract,
  },
  theme: {
    fontSize,
    extend: {
      fontFamily: {
        machine: ['ITC Machine Bold', 'sans-serif'],
      },
      colors: {
        primaryTheme: "rgba(var(--primary))",
        secondaryTheme: "rgba(var(--secondary))",
        tertiaryTheme: "rgba(var(--tertiary))",
        quaternaryTheme: "rgba(var(--quaternary))",
      },
      // screens' units have to be in REM (as opposed to px) to integrate Fluid-Tailwind package
      screens: {
        // 640px
        sm: "40rem",
        // 768px
        md: "48rem",
        // 1024px
        lg: "64rem",
        // 1280px
        xl: "80rem",
        // 1536px
        "2xl": "96rem",
        // 1792px
        "3xl": "112rem",
      },
    },
  },
  plugins: [
    require("@designbycode/tailwindcss-text-shadow"),
    require("fluid-tailwind"),
  ],
};
