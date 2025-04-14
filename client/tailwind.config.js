/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-toastify/dist/ReactToastify.css"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a', // hoặc mã màu bạn đang dùng cho --clr-primary
        gray: {
          DEFAULT: '#6b7280',
        },
      },
      keyframes: {
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        'slide-in': {
          'from': { 
            transform: 'translateY(100%)',
            opacity: '0'
          },
          'to': { 
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        'slide-out': {
          'from': { 
            transform: 'translateY(0)',
            opacity: '1'
          },
          'to': { 
            transform: 'translateY(-100%)',
            opacity: '0'
          }
        },
        'flame': {
          '0%': { 
            transform: 'scale(1)',
            opacity: '0.5'
          },
          '50%': { 
            transform: 'scale(1.1)',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'scale(1)',
            opacity: '0.5'
          }
        },
        'zoom-in': {
          'from': { 
            transform: 'scale(0.8)',
            opacity: '0'
          },
          'to': { 
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        'rotate-in': {
          'from': { 
            transform: 'rotate(-15deg) scale(0.8)',
            opacity: '0'
          },
          'to': { 
            transform: 'rotate(-15deg) scale(1)',
            opacity: '1'
          }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in': 'slide-in 0.5s ease-out',
        'slide-out': 'slide-out 0.3s ease-out',
        'flame': 'flame 2s infinite',
        'zoom-in': 'zoom-in 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'rotate-in': 'rotate-in 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
  },
  plugins: [],
}
