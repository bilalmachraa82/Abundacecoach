/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        skin: {
          primary: 'rgb(var(--bg-primary) / <alpha-value>)',
          secondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
          border: 'rgb(var(--border-color) / <alpha-value>)',
          card: 'rgb(var(--card-bg) / <alpha-value>)',
          hover: 'rgb(var(--hover-bg) / <alpha-value>)',
        }
      },
      textColor: {
        skin: {
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
        }
      },
      backgroundColor: {
        skin: {
          primary: 'rgb(var(--bg-primary) / <alpha-value>)',
          secondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
          card: 'rgb(var(--card-bg) / <alpha-value>)',
          hover: 'rgb(var(--hover-bg) / <alpha-value>)',
        }
      },
      borderColor: {
        skin: {
          base: 'rgb(var(--border-color) / <alpha-value>)',
        }
      },
      spacing: {
        base: 'var(--spacing-base)',
        card: 'var(--card-padding)',
        input: 'var(--input-padding)',
      }
    },
  },
  plugins: [],
};