/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f6e6f0',
        text: '#0e0e0c',
        primary: '#ffc4d6',
        secondary: '#fab3c8',
        accent: '#ff87ab',
        'dark-background': '#051923',
        'dark-text': '#f3f3f1',
        'dark-primary': '#003554',
        'dark-secondary': '#006494',
        'dark-accent': '#00a6fb',
      },
    },
  },
  darkMode: 'class',
  variants: {},
  plugins: [
   // require('@tailwindcss/forms') will uncomment if we need this too
  ],
}

