import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Green #0F3D3B
        navy: {
          DEFAULT: '#0F3D3B',
          50: '#F3F5F5',
          100: '#E2E8E7',
          200: '#C3CECE',
          300: '#9AAEAD',
          400: '#6F8B89',
          500: '#4B6E6C',
          600: '#2C5453',
          700: '#1B4745',
          800: '#0F3D3B',
          900: '#0A2826',
          950: '#061818',
        },
        // Bordo #6C151E
        gold: {
          DEFAULT: '#6C151E',
          50: '#F8F3F4',
          100: '#EDE3E4',
          200: '#DAC4C7',
          300: '#C19DA0',
          400: '#A77378',
          500: '#915056',
          600: '#7E3139',
          700: '#732129',
          800: '#6C151E',
          900: '#460E14',
          950: '#2B080C',
        },
        // Cream #F5DABF
        cream: {
          DEFAULT: '#F5DABF',
          50: '#FDF8F2',
          100: '#FBF0E5',
          200: '#F8E5D2',
          300: '#F5DABF',
          400: '#E1C9B0',
        },
        teal: {
          DEFAULT: '#1AA6A6',
          50: '#EFFCFC',
          100: '#D5F7F7',
          200: '#AFEEEE',
          300: '#77E1E1',
          400: '#3BCACA',
          500: '#1AA6A6',
          600: '#148989',
          700: '#146D6D',
          800: '#165858',
          900: '#164A4A',
        },
        sand: '#D8C0A8',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'ui-serif', 'serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 7.5vw, 6.75rem)', { lineHeight: '0.96', letterSpacing: '-0.035em' }],
        'display-xl': ['clamp(2.5rem, 5.6vw, 4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.125rem, 4.2vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 3.2vw, 2.75rem)', { lineHeight: '1.14', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        soft: '0 2px 8px rgba(10, 40, 38, 0.04), 0 18px 45px -24px rgba(10, 40, 38, 0.16)',
        card: '0 4px 14px rgba(10, 40, 38, 0.05), 0 28px 60px -28px rgba(10, 40, 38, 0.22)',
        lifted: '0 18px 45px -18px rgba(10, 40, 38, 0.34), 0 8px 20px -12px rgba(10, 40, 38, 0.18)',
        navbar: '0 12px 36px -18px rgba(10, 40, 38, 0.24)',
        gold: '0 16px 38px -18px rgba(108, 21, 30, 0.55)',
        'inner-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'gold-sheen': 'linear-gradient(120deg, #460E14 0%, #915056 50%, #6C151E 100%)',
        'navy-fade': 'linear-gradient(180deg, rgba(10,40,38,0) 0%, rgba(10,40,38,0.82) 100%)',
        'hero-wash':
          'linear-gradient(90deg, rgba(6,24,24,0.82) 0%, rgba(6,24,24,0.5) 48%, rgba(6,24,24,0.16) 100%)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.07)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        float: 'float 5s ease-in-out infinite',
        'slow-zoom': 'slowZoom 18s ease-out both',
        shimmer: 'shimmer 1.8s infinite',
        marquee: 'marquee 32s linear infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
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