/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        LogoSectionGreen: "rgb(175,202,175)",
        LoginBackgroundColor:"#ece4d8",
        DashboardBackgroundColor:"#faf1d7",
      },
      fontFamily: {
        itim: ['Itim', 'cursive'], // 'cursive' is a fallback
      },
    },// Customize the theme here if needed
  },
  plugins: ['tailwindcss-filters'],
}


