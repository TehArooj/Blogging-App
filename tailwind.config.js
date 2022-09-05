/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.tsx",
    "./src/pages/Signup.tsx",
    "./src/pages/Login.tsx",
    "./src/pages/Home.tsx",
    "./src/components/CustomInput.component.tsx",
    "./src/components/LoaderSpinner.component.tsx",
    "./src/pages/MyBlogs.tsx",
    "./src/pages/ViewBlog.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#56CC6A",
        secondary: "#A5A5A5",
        white: "#FFFFFF",
        darkGrey: "#272727",
        errorMsg: "#dc2626",
        successMsg: "#097969",
        darkerGrey: "#070707",
      },
      backgroundImage: {
        "pawel-pattern": "url('/src/assests/sideImage.jpeg')",
      },
      rotate: {
        270: "270deg",
      },
      lineHeight: {
        80: "80px",
      },
      width: {
        767: "800px",
        680: "680px",
        600: "600px",
        850: "850px",
        480: "480px",
        512: "512px",
        960: "960px",
      },
      screens: {
        m: { min: "320px", max: "480px" },

        tb: { min: "481px", max: "767px" },

        md: { min: "768px", max: "1023px" },

        lg: { min: "1024px", max: "1279px" },

        xl: { min: "1280px", max: "1535px" },

        "2xl": { min: "1536px" },
        // => @media (min-width: 1536px) { ... }
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        full: "9999px",
        large: "12px",
        50: "50%",
      },
    },
    fontFamily: {
      lexend: ["Lexend Deca", "sans-serif"],
      dm: ["DM Serif Display", "serif"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
