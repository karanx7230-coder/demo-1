import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1F3A',
          50: '#F3F6FA',
          100: '#E4EAF2',
          200: '#C6D3E2',
          300: '#9BAFC6',
          400: '#6B86A6',
          500: '#496787',
          600: '#33506C',
          700: '#243F59',
          800: '#152F49',
          900: '#0B1F3A',
          950: '#061225',
        },
        gold: {
          DEFAULT: '#C9A227',
          50: '#FCF9ED',
          100: '#F7F0D0',
          200: '#EFDFA0',
          300: '#E3CA68',
          400: '#D6B442',
          500: '#C9A227',
          600: '#A9841F',
          700: '#85671B',
          800: '#6B521D',
          900: '#57431C',
        },
        cream: {
          DEFAULT: '#FAF8F4',
          50: '#FDFCFA',
          100: '#FAF8F4',
          200: '#F2EEE5',
          300: '#E7E0D2',
          400: '#D7CCB9',
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
        sand: '#E8DEC9',
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
        soft: '0 2px 8px rgba(11, 31, 58, 0.04), 0 18px 45px -24px rgba(11, 31, 58, 0.16)',
        card: '0 4px 14px rgba(11, 31, 58, 0.05), 0 28px 60px -28px rgba(11, 31, 58, 0.22)',
        lifted: '0 18px 45px -18px rgba(11, 31, 58, 0.34), 0 8px 20px -12px rgba(11, 31, 58, 0.18)',
        navbar: '0 12px 36px -18px rgba(11, 31, 58, 0.24)',
        gold: '0 16px 38px -18px rgba(201, 162, 39, 0.62)',
        'inner-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'gold-sheen': 'linear-gradient(120deg, #B89120 0%, #E1C45A 50%, #C9A227 100%)',
        'navy-fade': 'linear-gradient(180deg, rgba(11,31,58,0) 0%, rgba(11,31,58,0.82) 100%)',
        'hero-wash':
          'linear-gradient(90deg, rgba(6,18,37,0.82) 0%, rgba(6,18,37,0.5) 48%, rgba(6,18,37,0.16) 100%)',
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
