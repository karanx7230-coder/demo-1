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
          DEFAULT: '#26383B',
          soft: '#2F4346',
          muted: '#52666A',
        },
        pine: {
          DEFAULT: '#315D5C',
          deep: '#203E40',
          soft: '#3D6E6D',
          light: '#477D7B',
        },
        cream: {
          DEFAULT: '#F8F6F0',
          light: '#FDFCF9',
          deep: '#EFF0EB',
        },
        sand: '#E5E8E3',
        border: '#E5E8E3',
        marigold: {
          DEFAULT: '#E9874D',
          soft: '#F3B48D',
          deep: '#C9682F',
        },
        clay: '#B85C33',
        blue: '#176C9B',
        navy: '#26383B',
        teal: '#315D5C',
        orange: '#E9874D',
        light: '#F8F6F0',
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
        card: '0 30px 80px -46px rgba(38, 56, 59, 0.4)',
        lift: '0 24px 60px -28px rgba(38, 56, 59, 0.32)',
        ticket: '0 26px 60px -30px rgba(38, 56, 59, 0.5)',
        gold: '0 18px 40px -18px rgba(233, 135, 77, 0.5)',
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
        'fade-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 26px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'menu-item': {
          '0%': { opacity: '0', transform: 'translate3d(0, 18px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'vehicle-in': {
          '0%': { opacity: '0', transform: 'translate3d(46px, 0, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
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
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.3s ease both',
        'menu-item': 'menu-item 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'vehicle-in': 'vehicle-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
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
