/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0E0B07',
          900: '#0E0B07',
          800: '#1A1410',
          700: '#1a1a1a',
          600: '#222222',
          500: '#2a2a2a',
        },
        bone: {
          DEFAULT: '#f5f1e8',
          dim: '#cfc9bb',
          mute: '#8a857a',
        },
        signal: {
          yellow: '#FBC100',
          'yellow-lit': '#FDD338',
          'yellow-soft': '#fbe27a',
        },
        live: '#22c55e',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Noto Sans SC"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          '"SF Mono"',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      letterSpacing: {
        tightest: '-0.02em',
        microcaps: '0.18em',
      },
      fontSize: {
        'display': ['clamp(2.75rem, 8vw, 8rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'mega': ['clamp(2rem, 4.5vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 80s linear infinite',
        'blink': 'blink 1.2s step-end infinite',
        'caret': 'caret 1s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        caret: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.bone.dim'),
            a: {
              color: theme('colors.signal.yellow'),
              '&:hover': { color: theme('colors.signal.yellow-soft') },
            },
            h1: { color: theme('colors.bone.DEFAULT'), fontWeight: '800' },
            h2: { color: theme('colors.bone.DEFAULT'), fontWeight: '800' },
            h3: { color: theme('colors.bone.DEFAULT') },
            h4: { color: theme('colors.bone.DEFAULT') },
            strong: { color: theme('colors.bone.DEFAULT') },
            code: {
              color: theme('colors.signal.yellow'),
              backgroundColor: theme('colors.ink.700'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
            blockquote: {
              borderLeftColor: theme('colors.signal.yellow'),
              color: theme('colors.bone.dim'),
            },
            hr: { borderColor: theme('colors.ink.600') },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
