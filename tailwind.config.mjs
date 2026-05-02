/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0a',
          900: '#0a0a0a',
          800: '#111111',
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
          yellow: '#FACC15',
          'yellow-soft': '#fbe27a',
        },
        live: '#22c55e',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Noto Sans SC"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
        serif: [
          '"Instrument Serif"',
          '"Noto Serif SC"',
          'Georgia',
          '"Songti SC"',
          'serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          '"SF Mono"',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      letterSpacing: {
        tightest: '-0.04em',
        microcaps: '0.18em',
      },
      fontSize: {
        'display': ['clamp(3.5rem, 11vw, 12rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'mega': ['clamp(2.5rem, 7vw, 6rem)', { lineHeight: '0.96', letterSpacing: '-0.03em' }],
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
            h1: { color: theme('colors.bone.DEFAULT'), fontFamily: 'Instrument Serif, serif', fontWeight: '400' },
            h2: { color: theme('colors.bone.DEFAULT'), fontFamily: 'Instrument Serif, serif', fontWeight: '400' },
            h3: { color: theme('colors.bone.DEFAULT') },
            h4: { color: theme('colors.bone.DEFAULT') },
            strong: { color: theme('colors.bone.DEFAULT') },
            code: {
              color: theme('colors.signal.yellow'),
              backgroundColor: theme('colors.ink.700'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontFamily: 'JetBrains Mono, monospace',
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
