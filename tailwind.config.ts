import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: '#f8f9fa', // Light background
        foreground: '#000000', // Neutral dark text

        primary: {
          DEFAULT: '#246D1A', // Dark Green (Main Brand)
          foreground: '#ffffff', // White text on green
        },
        secondary: {
          DEFAULT: '#CF6024', // Orange Accent (Button / CTA)
          hover: '#b94f1c', // Darker orange on hover
          active: '#9a3f15', // Even darker for click state
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#f3c14b', // Yellowish tone
          foreground: '#000000',
        },
        border: '#dee2e6',
        input: '#e9ecef',
        ring: '#246D1A',

        // Custom Brand Colors
        dpsGreen: '#246D1A',
        dpsOrange: '#CF6024',
        dpsOrangeHover: '#b94f1c',
        dpsOrangeActive: '#9a3f15',
        dpsLight: '#f8f9fa',
        dpsDark: '#343a40',
        dpsYellow: '#f3c14b',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
