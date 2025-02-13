/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Orbitron', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      colors: {
        'surface': 'var(--surface)',
        'primary': 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'secondary': 'var(--text-secondary)',
        'background': 'var(--background)',
        'background-secondary': 'var(--background-secondary)',
        'surface-hover': 'var(--surface-hover)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'border-color': 'var(--border-color)',
        'error': 'var(--error)',
        'success': 'var(--success)',
        'modal-overlay': 'var(--modal-overlay)',
        // Light theme
        'light-primary': '#000000',
        'light-hover': '#333333',
        'light-surface': '#ffffff',
        'light-text': '#000000',
        'light-secondary': '#333333',
        'light-error': '#ff0000',
        'light-success': '#008000',
        
        // Dark theme
        'dark-primary': 'rgba(0, 255, 255, 0.696)',
        'dark-hover': 'rgba(0, 200, 200, 0.8)',
        'dark-surface': 'rgba(20, 20, 20, 0.95)',
        'dark-text': '#e0e0e0',
        'dark-secondary': '#a0a0a0',
        'dark-error': '#ff4d4d',
        'dark-success': '#0ff',
      },
      boxShadow: {
        'light': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'light-hover': '0 6px 12px rgba(0, 0, 0, 0.1)',
        'dark': '0 4px 8px rgba(0, 255, 255, 0.3)',
        'dark-hover': '0 6px 12px rgba(0, 255, 255, 0.3)',
        'custom': 'var(--box-shadow)',
      },
    },
  },
  plugins: [],
}

