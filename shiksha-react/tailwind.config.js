/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'navy-blue': '#0164ae',
        'custom-color': '#263238',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem', // Default padding for mobile and small screens
          sm: '1rem',
          md: '1rem',
          lg: '3rem', // Increased padding for larger screens
          xl: '3rem',
          '2xl': '3rem',
        },
      },
      fontSize: {
        '30px': '30px',
        '36px': '36px',
      },
      spacing: {
        '30': '30px',
        '15': '15px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: '18px', // Increase base text size
            lineHeight: '1.4', // Decrease line height
            p: {
              marginTop: '0',
              marginBottom: '0', // Reduce paragraph spacing
            },
            h1: {
              marginTop: '0',
              marginBottom: '0.5em', // Adjust heading spacing if needed
            },
            // Additional customizations if needed
          },
        },
      },
    },
  },
  plugins: [function({ addUtilities }) {
    const newUtilities = {
      '.line-with-image::before': {
        content: '""',
        position: 'absolute',
        bottom: '50%',
        width: 'calc(50% - 30px)', // Adjust the width as needed
        left: '0',
        height: '1px',
        backgroundColor: '#f9a123',
      },
      '.line-with-image::after': {
        content: '""',
        position: 'absolute',
        bottom: '50%',
        width: 'calc(50% - 30px)', // Adjust the width as needed
        right: '0',
        height: '1px',
        backgroundColor: '#f9a123',
      },
    };
    addUtilities(newUtilities, ['before', 'after']);
  },
  require('@tailwindcss/typography'),
],

}
