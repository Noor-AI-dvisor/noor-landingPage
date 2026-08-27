import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        'accent-2': 'var(--accent-2)',
        'accent-amber': 'var(--accent-amber)',
      },
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
        serif: ['"Lora"', 'Georgia', 'serif'],
      },
      animation: {
        'blob-float': 'blobFloat 8s ease-in-out infinite',
        'badge-float': 'badgeFloat 3s ease-in-out infinite',
      },
      keyframes: {
        blobFloat: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(20px,-30px) scale(1.05)' },
          '66%': { transform: 'translate(-15px,20px) scale(0.95)' },
        },
        badgeFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
      },
      boxShadow: {
        nav: 'var(--shadow-nav)',
      },
    },
  },
  plugins: [],
} satisfies Config
