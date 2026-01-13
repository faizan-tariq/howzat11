import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pitch: {
          light: '#4ade80',
          DEFAULT: '#22c55e',
          dark: '#16a34a',
          stripe: '#15803d',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        cricket: {
          cream: '#f5f0e1',
          leather: '#c9340a',
          willow: '#deb887',
          night: '#0f172a',
          stadium: '#1e293b',
        }
      },
      fontFamily: {
        display: ['Oswald', 'system-ui', 'sans-serif'],
        body: ['Barlow', 'system-ui', 'sans-serif'],
        score: ['Orbitron', 'monospace'],
      },
      backgroundImage: {
        'stadium-gradient': 'radial-gradient(ellipse at bottom, #1e3a5f 0%, #0f172a 50%, #020617 100%)',
        'pitch-grass': 'repeating-linear-gradient(90deg, #22c55e 0px, #22c55e 30px, #16a34a 30px, #16a34a 60px)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%)',
        'silver-gradient': 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 50%, #64748b 100%)',
        'bronze-gradient': 'linear-gradient(135deg, #d97706 0%, #92400e 50%, #78350f 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'card-flip': 'card-flip 0.6s ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-in': 'bounce-in 0.5s ease-out',
        'stadium-pulse': 'stadium-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(251, 191, 36, 0.6)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'card-flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'stadium-pulse': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
      },
      boxShadow: {
        'card': '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 20px 60px -10px rgba(0, 0, 0, 0.7)',
        'glow-gold': '0 0 30px rgba(251, 191, 36, 0.5)',
        'inner-glow': 'inset 0 0 30px rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}
export default config

