module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: {
          blood: "rgb(219, 11, 21)",
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
