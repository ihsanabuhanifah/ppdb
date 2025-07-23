module.exports = {
  purge: ['./src/**/*.{jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  mode: "jit",
  theme: {
    extend: {
      colors: {
        green: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#1E046C',  // Ini mengubah green-500 menjadi #1E046C
          600: '#18055A',  // Variasi lebih gelap
          700: '#0d07a3',
          800: '#0c0c6e',
          900: '#0a0a4a',
        },
      },
      height: {
        "1/7": "30%",
        "6/7": "70%",
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}