/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    orange: '#f57224',
                    navy: '#0f1e29',
                    gray: '#eff0f5',
                },
                // Semantic color tokens
                'primary': 'var(--text-primary)',
                'secondary': 'var(--text-secondary)',
                'muted': 'var(--text-muted)',
                'inverse': 'var(--text-inverse)',
                'cta': 'var(--text-cta)',
                'light': 'var(--bg-light)',
                'dark': 'var(--bg-dark)',
                'surface': 'var(--bg-surface)',
                'overlay': 'var(--bg-overlay)',
            },
            fontFamily: {
                sans: ['Inter', 'Roboto', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 2px 4px 0 rgba(0,0,0,.08)',
                'card-hover': '0 4px 8px 0 rgba(0,0,0,.12)',
            }
        },
    },
    plugins: [],
}
