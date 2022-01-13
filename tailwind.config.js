module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      xs: ['6px', '12px'],
      sm: ['12px', '14px'],
      base: ['16px', '22px'],
      lg: ['28px', '34px'],
      xl: ['96px', '102px']
    },
    fontFamily: {
      'heading': ['IBM Plex Sans Condensed', 'sans-serif'],
      'body': ['PT Sans', 'sans-serif']

    }
  },
  variants: {
    extend: {},
  },
  plugins: [ 
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
}
