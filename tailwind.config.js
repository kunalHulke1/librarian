/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f9fa',
          100: '#e9ecef',
          500: '#333333',
          600: '#555555',
          700: '#222222',
        },
        success: {
          50: '#d4edda',
          500: '#28a745',
          600: '#218838',
        },
        warning: {
          50: '#fff3cd',
          500: '#ffc107',
          600: '#e0a800',
        },
        danger: {
          50: '#f8d7da',
          500: '#dc3545',
          600: '#c82333',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}