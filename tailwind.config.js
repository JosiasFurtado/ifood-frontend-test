module.exports = {
  purge: ['./src/components/**/*.tsx', './src/pages/**/*.tsx'],
  theme: {
    future: {
      purgeLayersByDefault: true,
      removeDeprecatedGapUtilities: true,
    },
    extend: {
      colors: {
        primary: {
          100: '#FFE6E8',
          200: '#FFBFC6',
          300: '#FF99A3',
          400: '#FF4D5F',
          500: '#FF001A',
          600: '#E60017',
          700: '#990010',
          800: '#73000C',
          900: '#4D0008',
        },
      },
    },
  },
}
