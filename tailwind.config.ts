import type { Config } from 'tailwindcss'

/* Inspire Development brand tokens. The canonical source of truth
   lives in src/app/globals.css under the `@theme` block (Tailwind v4
   syntax). This config exposes friendly aliases like `bg-flame` and
   `text-bone` so components don't have to write var() everywhere. */

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New brand palette — White / Black / Orange.
        ink: 'var(--color-ink)',
        carbon: 'var(--color-carbon)',
        steel: 'var(--color-steel)',
        mute: 'var(--color-mute)',
        bone: 'var(--color-bone)',
        flame: {
          DEFAULT: 'var(--color-flame)',
          glow: 'var(--color-flame-glow)',
          ember: 'var(--color-ember)',
        },

        // Compatibility aliases — these resolve to the new tokens via
        // the chain in globals.css, so legacy components pinning to
        // `inspire.accent` etc. keep working until rewritten.
        inspire: {
          dark: 'var(--color-ink)',
          darker: 'var(--color-ink)',
          accent: 'var(--color-flame)',
          accent2: 'var(--color-flame-glow)',
          glow: 'rgba(255, 107, 26, 0.20)',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2.4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 18px rgba(255, 107, 26, 0.25)' },
          '50%': { boxShadow: '0 0 32px rgba(255, 107, 26, 0.45)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(255,107,26,0.04) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(255,107,26,0.04) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'flame-gradient': 'linear-gradient(135deg, var(--color-flame) 0%, var(--color-flame-glow) 100%)',
      },
    },
  },
  plugins: [],
}
export default config
