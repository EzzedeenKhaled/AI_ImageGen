/** @type {import('tailwindcss').Config} */

export default {
    content: ['./src/**/*.{js,jsx}'], // Ensure this matches your file structure
    theme: {
      extend: {
        screens: {
          xs: '480px', // Custom breakpoint
        },
        fontFamily: {
          inter: ['Inter var', 'sans-serif'], // Add custom fonts
        },
        boxShadow: {
          card: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)',
          cardhover: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)',
        },
      },
    },
    plugins: [],
  };
  