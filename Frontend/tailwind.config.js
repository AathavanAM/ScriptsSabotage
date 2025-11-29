module.exports = {
    content: [
        "./src/**/*.{html,ts,scss}"
    ],
    theme: {
        extend: {
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'glow': 'glow 3s ease-in-out infinite',
                'float-slow': 'float 6s ease-in-out infinite',
                'spin-slow': 'spin-slow 20s linear infinite',
                'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                glow: {
                    '0%, 100%': { textShadow: '0 0 20px rgba(239, 68, 68, 0.5)' },
                    '50%': { textShadow: '0 0 30px rgba(239, 68, 68, 0.8), 0 0 40px rgba(192, 132, 252, 0.6)' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' }
                },
                'spin-slow': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                },
                'pulse-slow': {
                    '0%, 100%': { opacity: '0.3' },
                    '50%': { opacity: '0.5' }
                }
            }
        }
    },
    plugins: [],
};