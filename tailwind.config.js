const { colors } = require(`tailwindcss/defaultTheme`);

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  experimental: {
    applyComplexClasses: true,
  },
  theme: {
    extend: {
      colors: {},
      fontFamily: {},
      container: {
        center: true,
        padding: {
          DEFAULT: "1.5rem",
          md: "2rem",
        },
      },
    },
  },
};
