/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#222831',
        'grey': '#393E46',
        'teal': '#00ADB5',
        'white': '#EEEEEE'
      },
      animation: {
        'like': 'like 1 0.5s linear'
      },
      keyframes: {
        'like': {
          '0%': {

          },
          '50%': {
            'transform' : 'scaleX(1.2) rotate(-35deg) translateY(-2px)',            
          },
          '100%': {

          }
        }
      }
    },
  },
  plugins: [],
}

