import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C5A55A',
          light: '#D4B76A',
          dark: '#B5953A',
        },
        dark: {
          bg: '#0D0D0D',
          surface: '#1A1A1A',
          border: '#2A2A2A',
          lighter: '#333333',
        },
      },
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
        display: ['Noto Sans', 'sans-serif'],
        mongolian: ['Noto Sans Mongolian', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'sparkle': 'sparkle 4s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '-200% center' },
          '50%': { backgroundPosition: '200% center' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'translateY(0) scale(0)' },
          '50%': { opacity: '1', transform: 'translateY(-20px) scale(1)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
