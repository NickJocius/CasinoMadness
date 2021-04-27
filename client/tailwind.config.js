const { urlencoded } = require("express");

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: {
          blood: "rgb(219, 11, 21)",
        },

        gTitle: "rgb(230, 230, 230)",

        azure: "#f0ffff",
      },

      fontFamily: {
        'bangers': ['Bangers', 'cursive'],
        'nosifer': ['Nosifer', 'cursive']
      },

      backgroundImage: theme => ({
        'cFloor': "url('/src/assets/images/cainoFloor.jpg')",
        'harley': "url('/src/assets/images/harley.png')",
        'cardspread': "url('/src/assets/images/cards-spread.png')",
        'lex': "url('/src/assets/images/lex.png')",
        'superman': "url('/src/assets/images/superman.png')",
        'blood1': "url('/src/assets/images/blood1.png')"
      }),

      backgroundSize: {
        '50': '50%',
        '75': '75%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
