/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA',
        foreground: '#0F172A',
        muted: '#F1F5F9',
        'muted-foreground': '#64748B',
        accent: '#0052FF',
        'accent-secondary': '#4D7CFF',
        'accent-foreground': '#FFFFFF',
        border: '#E2E8F0',
        card: '#FFFFFF',
        // keep brand.blue alias for admin panel unchanged
        brand: {
          blue: '#0052FF',
          'blue-dark': '#0041CC',
          'blue-dim': '#EEF2FF',
          black: '#0F172A',
          white: '#ffffff',
          gray: '#F1F5F9',
          'gray-mid': '#E2E8F0',
          'gray-text': '#64748B',
        },
      },
      fontFamily: {
        display: ['Calistoga', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        // keep serif alias for admin panel
        serif: ['Calistoga', 'Georgia', 'serif'],
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.06)',
        md: '0 4px 6px rgba(0,0,0,0.07)',
        lg: '0 10px 15px rgba(0,0,0,0.08)',
        xl: '0 20px 25px rgba(0,0,0,0.10)',
        accent: '0 4px 14px rgba(0,82,255,0.25)',
        'accent-lg': '0 8px 24px rgba(0,82,255,0.35)',
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out',
        'slide-up': 'slideUp 0.7s ease-out',
        'float-slow': 'floatSlow 5s ease-in-out infinite',
        'float-mid': 'floatMid 4s ease-in-out infinite',
        'spin-slow': 'spin 60s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatMid: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseDot: {
          '0%,100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.3)', opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
