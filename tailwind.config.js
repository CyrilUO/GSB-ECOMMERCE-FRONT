/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx,css,html}',
    './public/index.html',
  ],
  darkMode: false,
  theme: {
    screens: {
      xsPhone: { max: '399px' },
      phone: { min: '400px', max: '639px' },
      tablet: { min: '640px', max: '1023px' },
      laptop: { min: '1024px', max: '1279px' },
      desktop: { min: '1280px', max: '1535px' },
      xlDesktop: { min: '1536px' },
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
