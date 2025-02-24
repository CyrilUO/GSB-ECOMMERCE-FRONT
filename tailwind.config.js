/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx,css,html}',
    './public/index.html',
  ],
  darkMode: false,
  theme: {
    screens: {
      xsPhone: '399px',
      phone: '400px',
      tablet: '640px',
      laptop: '1045px',
      desktop: '1280px',
      xlDesktop: '1536px',
    },


    extend: {
      fontFamily: {
        display: ['Merriweather', 'serif'], // Utilisé pour les titres principaux
        sans: ['Open Sans', 'sans-serif'], // Utilisé pour les paragraphes
      },
      colors: {
        primary: '#1a202c', // Couleur des titres ou éléments principaux
        secondary: '#4a5568', // Couleur des textes secondaires
        accent: '#3182ce', // Couleur d'accentuation (liens ou boutons)
      },
    },
  },
  plugins: [
  ],
};
