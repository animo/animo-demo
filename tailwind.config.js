/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    minWidth: {
      min: '420px',
    },
    container: {
      center: true,
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      sxl: '1242px',
      xl: '1440px',
    },
    colors: {
      white: '#FFFFFF',
      grey: '#808080',
      black: '#000000',
      'animo-white': '#F5F5F4',
      'animo-coral': '#EA6767',
      'animo-blue': '#557EBA',
      'animo-black': '#202223',
      'animo-lightgrey': '#E5E5E5',
      'animo-darkgrey': '#3A3B3B',
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],
    },
    extend: {
      transitionProperty: {
        height: 'height',
      },
    },
  },
  plugins: [],
}