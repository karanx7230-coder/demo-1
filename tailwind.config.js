import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#FFFFFF',
        black: '#000000',

        ink: {
          DEFAULT: '#0C1410',
          soft: '#131E18',
          muted: '#3D4A42',
        },
        pine: {
          DEFAULT: '#14382B',
          deep: '#0B241B',
          soft: '#1E4A39',
          light: '#2C604B',
        },
        cream: {
          DEFAULT: '#F6EFE2',
          light: '#FBF7EF',
          deep: '#EDE1CE',
        },
        sand: '#E3D1B3',
        marigold: {
          DEFAULT: '#F0A33B',
          soft: '#F8CD8B',
          deep: '#D9821F',
        },
        clay: '#BF5A38',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'ui-serif', 'serif'],
      },
      fontSize: {
        'display-hero': ['clamp(3.4rem, 10.5vw, 9.5rem)', { lineHeight: '0.86', letterSpacing: '-0.045em' }],
        'display-xl': ['clamp(2.6rem, 6.2vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.1rem, 4.4vw, 3.75rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.65rem, 2.8vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        label: ['0.68rem', { lineHeight: '1', letterSpacing: '0.24em' }],
      },
      boxShadow: {
        card: '0 30px 80px -46px rgba(12, 20, 16, 0.55)',
        lift: '0 24px 60px -28px rgba(12, 20, 16, 0.45)',
        ticket: '0 26px 60px -30px rgba(12, 20, 16, 0.65)',
        gold: '0 18px 40px -18px rgba(240, 163, 59, 0.55)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translate3d(-50%, 0, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        dash: {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-160' },
        },
        wheel: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '100%': { transform: 'scale(2.1)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 34s linear infinite',
        'marquee-slow': 'marquee 55s linear infinite',
        'marquee-reverse': 'marquee-reverse 42s linear infinite',
        'spin-slow': 'spin-slow 22s linear infinite',
        float: 'float 6s ease-in-out infinite',
        dash: 'dash 6s linear infinite',
        wheel: 'wheel 1.4s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      screens: {
        xs: '390px',
      },
    },
  },
  plugins: [typography],
};
