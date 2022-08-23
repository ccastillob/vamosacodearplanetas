/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{tsx, jsx, js, ts}"],
  theme: {
    letterSpacing: {
      2.6: "+2.6",
      1.5: "-1.5",
      1: "+1",
    },
    lineHeight: {
      103: "103px",
      25: "25px",
      52: "52px",
    },
    fontSize: {
      80: "80px",
      40: "40px",
      11: "11px",
      12: "12px",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    screens: {
      sm: "375px",
      md: "768px",
      xl: "1440px",
    },
    colors: {
      white: "#ffffff",
      blue: "#2D68F0",
      gray: "#38384f",
      "gray-light": "#838391",
      teal: "#419EBB",
      "orange-light": "#EDA249",
      violet: "#6D2ED5",
      "red-light": "#D14C32",
      red: "#D83A34",
      "orange-dark": "#CD5120",
      "green-light": "#1EC1A2",
    },
    fontFamily: {
      antonio: ["Antonio", "sans-serif"],
      spartan: ["League Spartan", "sans-serif"],
    },
    extend: {},
  },
};