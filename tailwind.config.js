/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        foreground: "rgba(var(--foreground-rgb), <alpha-value>)",
        background: "rgba(var(--background-rgb), <alpha-value>)",
        "background-alt": "rgba(var(--background-alt-rgb), <alpha-value>)",
        "dull-blue": "rgba(var(--dull-blue-rgb), <alpha-value>)",
        grey: "rgba(var(--grey-rgb), <alpha-value>)",
        red: "rgba(var(--red-rgb), <alpha-value>)",
      },
    },
  },
  plugins: [],
};
