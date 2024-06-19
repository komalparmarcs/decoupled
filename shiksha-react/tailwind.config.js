/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'navy-blue': '#0164ae',
        'custom-color': '#263238',
        // 'gray':'#eceff1',
        'color-1': '#FF4B10',
        'color-2': '#08BC14',
        'color-3': '#0164AE',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          md: '1rem',
          lg: '4rem',
          xl: '4rem',
          '2xl': '3rem',
        },
      },
      fontSize: {
        '30px': '30px',
        '36px': '36px',
      },
      spacing: {
        '30': '30px',
        '4xl': '32px',
        '15': '15px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      width: {
        '3/10': '30%',
      },
      animation: {
        zoomIn: 'zoomIn 2.5s ease-in-out forwards',
        fadeInUp: 'fadeInUp 2.5s ease-out',
        fadeInLeft: 'fadeInLeft 2.5s ease-out',
        fadeInRight: 'fadeInLeft 2.5s ease-out',
      },
      keyframes: {
        zoomIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: '18px',
            lineHeight: '1.4',
            p: {
              marginTop: '0',
              marginBottom: '0',
            },
            h1: {
              marginTop: '0',
              marginBottom: '0.5em',
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.line-with-image::before': {
          content: '""',
          position: 'absolute',
          bottom: '50%',
          width: 'calc(50% - 30px)',
          left: '0',
          height: '1px',
          backgroundColor: '#f9a123',
        },
        '.line-with-image::after': {
          content: '""',
          position: 'absolute',
          bottom: '50%',
          width: 'calc(50% - 30px)',
          right: '0',
          height: '1px',
          backgroundColor: '#f9a123',
        },
      };
      addUtilities(newUtilities, ['before', 'after']);
    },
    require('@tailwindcss/typography'),
  ],
};
