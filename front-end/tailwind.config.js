/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: withOpacity('--primary'),
        background: withOpacity('--background'),
        surface: withOpacity('--surface'),
        onPrimary: withOpacity('--on-primary'),
        onBackground: withOpacity('--on-background'),
        onSurface: withOpacity('--on-surface'),
      },
      animation: {
        'like': 'like 1 0.5s linear'
      },
      keyframes: {
        'like': {
          '0%': {

          },
          '50%': {
            'transform': 'scaleX(1.2) rotate(-35deg) translateY(-2px)',
          },
          '100%': {

          }
        }
      }
    },
  },
  plugins: [],
}

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}