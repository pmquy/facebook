/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'white_0' : 'white',
        'white_1' : '#f2f2f2',
        'white_2' : 'rgb(229,231,235)',
        'red_0' : 'rgb(225,29,72)',
        'red_1' : 'rgb(153,27,27)'
      }
    },
  },
  plugins: [],
}

