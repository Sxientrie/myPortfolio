/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./App.tsx",
        "./index.tsx",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                display: ['Outfit', 'sans-serif'],
            },
            colors: {
                // Void Protocol Palette
                void: '#09090b', // Zinc-950
                surface: 'rgba(24, 24, 27, 0.40)', // Zinc-900 @ 40%
                structure: 'rgba(39, 39, 42, 0.50)', // Zinc-800 @ 50%

                // Ink
                primary: '#e4e4e7', // Zinc-200
                secondary: '#a1a1aa', // Zinc-400
                muted: '#52525b', // Zinc-600

                // Signals
                accent: '#f97316', // Orange-500 (Ember)
                emerald: '#10b981', // Emerald-500 (Confirmation)
            },
            backgroundImage: {
                'noise': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')",
            }
        }
    },
    plugins: [],
}
