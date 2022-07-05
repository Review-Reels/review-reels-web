/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryRed: "#EE2737",
        White: "#FFFFFF",
        White2: "rgba(255, 255, 255, 0.5)",
        Black: "#000000",
        Black1: "rgba(0, 0, 0, 0.1)",
        Black2: "rgba(0, 0, 0, 0.5)",
        Black3: "rgba(0, 0, 0, 0.25)",
        Black4: "rgba(0, 0, 0, 0.16)",
        Black5: "rgba(0, 0, 0, 0.8)",
        Black6: "rgba(0, 0, 0, 0.08)",
        Black7: "rgba(0, 0, 0, 0.05)",
        Athens_Gray: "#F8F9FA",
        Peach_Cream: {
          normal: "#FFEEDD",
          dark: "rgba(0, 0, 0, 0.08)",
        },
        Dove_Grey: "rgba(0, 0, 0, 0.1)",
        Concrete: "#F2F2F2",
        Anakiwa: "#B1D0FF",
        Charade: "#2F2F43",
        Sweet_Pink: "#FAA1B1",
        Peach_Orange: "#FFCF9E",
        Azalea: "#F0B3E3",
      },
    },
  },
  plugins: [],
};
