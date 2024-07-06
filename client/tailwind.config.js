/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#eae7dc',
        text: '#0e0e0c',
        primary: '#918b78',
        secondary: '#b3c1b4',
        accent: '#5a6377',
        'dark-background': '#232015',
        'dark-text': '#f3f3f1',
        'dark-primary': '#87816e',
        'dark-secondary': '#3e4c3f',
        'dark-accent': '#8891a5',
      },
    },
  },
  darkMode: 'class',
  variants: {},
  plugins: [
   // require('@tailwindcss/forms') will uncomment if we need this too
  ],
}

