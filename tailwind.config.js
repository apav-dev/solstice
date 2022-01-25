module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
