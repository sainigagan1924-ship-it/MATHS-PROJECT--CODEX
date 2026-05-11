export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#172033',
        muted: '#627084',
        line: '#d9e1ea',
        brand: '#1f7a68',
        accent: '#b84a62'
      },
      boxShadow: {
        soft: '0 14px 40px rgba(23, 32, 51, 0.08)'
      }
    }
  },
  plugins: []
};
