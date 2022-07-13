const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        guide: "url('../assets/body.jpg')"
      },
      screens: {
        ...defaultTheme.screens,
        xlg: '1200px',
        lg: '992px',
        md: '768px',
        sm: '412px',
        xs: '375px'
      },
      maxWidth: {
        'main-container': '120rem'
      },
      zIndex: {
        '9999': '9999',
        '9998': '9998',
        '9997': '9997',
        '9996': '9996',
        '9995': '9995'
      },
      colors: {
        'primary-color': '#ff9292',
        'secondary-color': '#ffdd67',
        'tertiary-color': '#403f3f',
        'quaternary-color': 'white',
        'dim-modal': '#403f3fcc'
      },
      boxShadow: {
        'primary': '0rem 1.7rem 2.016rem 0.384rem rgba(0, 0, 0, 0.21)'
      },
      fontFamily: {
        mont: ['Montserrat'],
        hmPop: ['Hachi Maru Pop']
      },
      fontWeight: {
        thin: 100,
        'extra-light': 200,
        light: 300,
        regular: 400,
        medium: 500,
        bold: 700,
        black: 900
      }
    },
  },
  plugins: [],
}