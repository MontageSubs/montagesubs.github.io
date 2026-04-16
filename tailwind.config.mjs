/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FACC15',
          dark: '#0a0a0a',
          card: '#111111',
          border: '#222222',
          muted: '#888888',
        },
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.yellow.400'),
              '&:hover': { color: theme('colors.yellow.300') },
            },
            h1: { color: theme('colors.white') },
            h2: { color: theme('colors.white') },
            h3: { color: theme('colors.white') },
            h4: { color: theme('colors.white') },
            strong: { color: theme('colors.white') },
            code: {
              color: theme('colors.yellow.400'),
              backgroundColor: theme('colors.gray.900'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
            blockquote: {
              borderLeftColor: theme('colors.yellow.400'),
              color: theme('colors.gray.400'),
            },
            hr: { borderColor: theme('colors.gray.800') },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
