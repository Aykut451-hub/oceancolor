/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
        extend: {
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                colors: {
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        },
                        'ocean-primary': '#1e328b',
                        'ocean-primary-light': '#2a45b0',
                        'ocean-primary-dark': '#162567'
                },
                keyframes: {
                        'accordion-down': {
                                from: { height: '0' },
                                to: { height: 'var(--radix-accordion-content-height)' }
                        },
                        'accordion-up': {
                                from: { height: 'var(--radix-accordion-content-height)' },
                                to: { height: '0' }
                        },
                        'fade-in-up': {
                                '0%': { opacity: '0', transform: 'translateY(30px)' },
                                '100%': { opacity: '1', transform: 'translateY(0)' }
                        },
                        'fade-in-left': {
                                '0%': { opacity: '0', transform: 'translateX(-30px)' },
                                '100%': { opacity: '1', transform: 'translateX(0)' }
                        },
                        'fade-in-right': {
                                '0%': { opacity: '0', transform: 'translateX(30px)' },
                                '100%': { opacity: '1', transform: 'translateX(0)' }
                        },
                        'scale-in': {
                                '0%': { opacity: '0', transform: 'scale(0.95)' },
                                '100%': { opacity: '1', transform: 'scale(1)' }
                        },
                        'pulse-glow': {
                                '0%, 100%': { boxShadow: '0 0 0 0 rgba(30, 50, 139, 0)' },
                                '50%': { boxShadow: '0 0 20px 4px rgba(30, 50, 139, 0.3)' }
                        },
                        'shine': {
                                '0%': { left: '-100%' },
                                '100%': { left: '200%' }
                        },
                        'count-up-glow': {
                                '0%': { textShadow: '0 0 0 rgba(30, 50, 139, 0)' },
                                '50%': { textShadow: '0 0 20px rgba(30, 50, 139, 0.6)' },
                                '100%': { textShadow: '0 0 0 rgba(30, 50, 139, 0)' }
                        },
                        'ripple': {
                                '0%': { transform: 'scale(0)', opacity: '0.5' },
                                '100%': { transform: 'scale(4)', opacity: '0' }
                        },
                        'tap': {
                                '0%, 100%': { transform: 'scale(1)' },
                                '50%': { transform: 'scale(0.97)' }
                        },
                        'progress-fill': {
                                '0%': { width: '0%' },
                                '100%': { width: 'var(--progress-width)' }
                        }
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
                        'fade-in-left': 'fade-in-left 0.5s ease-out forwards',
                        'fade-in-right': 'fade-in-right 0.5s ease-out forwards',
                        'scale-in': 'scale-in 0.4s ease-out forwards',
                        'pulse-glow': 'pulse-glow 0.6s ease-out',
                        'shine': 'shine 0.6s ease-out',
                        'count-glow': 'count-up-glow 0.8s ease-out',
                        'ripple': 'ripple 0.6s ease-out',
                        'tap': 'tap 0.15s ease-out',
                        'progress-fill': 'progress-fill 0.5s ease-out forwards'
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};
