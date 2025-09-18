module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': {
          '50': '#f0fff4',
          '100': '#dcfce7',
          '200': '#bbf7d0',
          '500': '#22c55e',
          '600': '#16a34a',
          '700': '#15803d',
          '800': '#166534'
        },
        'blue': {
          '600': '#2563eb',
          '700': '#1d4ed8'
        },
        'gray': {
          '300': '#d1d5db',
          '500': '#6b7280',
          '600': '#4b5563',
          '700': '#374151',
          '800': '#1f2937'
        }
      }
    },
  },
  plugins: [],
}
