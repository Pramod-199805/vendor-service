/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-radial":
          "radial-gradient(circle at 85.4% 50.8%, rgb(18, 43, 109) 0%, rgb(3, 22, 65) 74.2%)",
      },
      height: {
        "h-13": "60px",
        "h-100":"120px"
      },
      spacing:{
        "h-100":"120px"
      },
      height:{
        "h-f":"100vh"
      },
      borderColor:{
        "custom-radial":"radial-gradient(circle at 85.4% 50.8%, rgb(18, 43, 109) 0%, rgb(3, 22, 65) 74.2%)",
        "border-gray":"rgb(141 140 153 / 15%)"
          
      }
    },
  },
  plugins: [],
};
