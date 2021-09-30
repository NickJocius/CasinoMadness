const { urlencoded } = require("express");

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: {
          blood: "rgb(219, 11, 21)",
          bloodTrans: "rgba(219,11,21,.5)"
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
        'blood1': "url('/src/assets/images/blood1.png')",
        'moneypile': "url('/src/assets/images/moneypile.png')",
        'cardschips': "url('/src/assets/images/cardsChips.png')"
      }),

      backgroundSize: {
        '20': '20%',
        '30': '30%',
        '50': '50%',
        '75': '75%'
      },

      scale: {
        '10': '.10',
        '95': '.95'
      }
    },
  },
  variants: {
    extend: {

    },
  },
  plugins: [],
}
