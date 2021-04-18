module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: {
          blood: "rgb(219, 11, 21)",
        },

        azure: "#f0ffff",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
