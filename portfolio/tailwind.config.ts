import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '400px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      colors: {
        paper: '#0C0C0B',
        ink: '#EDEAE4',
        accent: '#D4714A',
        muted: '#5A5856',
        border: '#1F1F1D',
        surface: '#141413',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        sans: ['DM Sans', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.2em',
      },
    },
  },
  plugins: [],
}

export default config
