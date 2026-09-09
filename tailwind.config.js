/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Design concept: the itinerary reads like a stack of travel tickets /
      // boarding passes -- paper tones, a stamp-red accent for confirmed
      // stops, brass for the hotel/premium elements, teal for the "explore"
      // moments. Deliberately not the generic cream+terracotta SaaS default.
      colors: {
        paper: '#F6F5F1',
        surface: '#FFFFFF',
        ink: '#1F2421',
        inkfade: '#5B6360',
        rule: '#D9D4C7',
        stamp: {
          DEFAULT: '#8B2635',
          light: '#F4E4E6',
        },
        brass: {
          DEFAULT: '#B8862E',
          light: '#F5EBD6',
        },
        teal: {
          DEFAULT: '#1F6F78',
          light: '#E1EFEE',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        ticket: '6px',
      },
    },
  },
  plugins: [],
};
