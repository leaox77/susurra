/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        noche:   '#1E1640',
        violeta: '#4A3F8C',
        purpura: '#7B6FCC',
        lavanda: '#B8AEED',
        'lav-l': '#E8E4FA',
        azul:    '#85B7EB',
        'azul-l':'#C4D8F5',
        'azul-ll':'#EBF4FD',
        rosa:    '#D4A8D4',
        'rosa-l':'#F2E4F2',
        menta:   '#A8DDD0',
        blanco:  '#F4F2FF',
        texto:   '#2A2050',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-up':    'fadeUp 0.4s ease-out forwards',
        'fade-in':    'fadeIn 0.3s ease-out forwards',
        'bounce-in':  'bounceIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'shake':      'shake 0.4s ease-in-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'slide-up':   'slideUp 0.35s ease-out forwards',
      },
      keyframes: {
        fadeUp:     { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:     { from: { opacity: 0 }, to: { opacity: 1 } },
        bounceIn:   { from: { opacity: 0, transform: 'scale(0.8)' }, to: { opacity: 1, transform: 'scale(1)' } },
        shake:      { '0%,100%': { transform: 'translateX(0)' }, '20%,60%': { transform: 'translateX(-6px)' }, '40%,80%': { transform: 'translateX(6px)' } },
        pulseSoft:  { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.6 } },
        slideUp:    { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
