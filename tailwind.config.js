import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FB3640', // rojo logo Crubyt
          50: '#FFF1F2',
          100: '#FFE0E2',
          400: '#FF5A62',
          500: '#FB3640',
          600: '#E21F2A',
          700: '#BE1520',
        },
        magenta: '#DA0463',
        coral: '#EF4F36',
        violet: '#8B5CF6',
        ink: {
          DEFAULT: '#00021C', // navy profundo del sitio actual
          900: '#00021C',
          800: '#00043A',
          700: '#0A2463',
          600: '#12172E',
        },
        mist: '#F0F5F9',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"IBM Plex Sans"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #FB3640 0%, #DA0463 55%, #8B5CF6 100%)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: { marquee: 'marquee 40s linear infinite' },
    },
  },
  plugins: [typography],
}
