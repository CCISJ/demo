/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Fondo de la aplicación. Apenas más oscuro que el blanco de las
        // superficies: alcanza para que una tarjeta se lea sin sombra.
        canvas: '#f4f5f7',
        // Una única hairline para todo el sistema — bordes, divisores,
        // separadores de tabla. Que sea siempre la misma es lo que hace que la
        // pantalla se vea ordenada.
        line: '#e5e7ea',
        // Institutional green — primary brand (CCISJ logo green)
        brand: {
          50: '#f2faf6',
          100: '#e3f7ec',
          200: '#c0f2d5',
          300: '#84ebb1',
          400: '#30e880',
          500: '#0ac259',
          600: '#00923f',
          700: '#037032',
          800: '#055a29',
          900: '#064722',
          950: '#052914',
        },
        // Gold accent — prestige / commerce
        gold: {
          50: '#fbf7ed',
          100: '#f5ecd0',
          200: '#ebd79e',
          300: '#e0bd66',
          400: '#d6a63f',
          500: '#c98f2a',
          600: '#ad6f22',
          700: '#89521f',
          800: '#71421f',
          900: '#5f381d',
        },
        // Emerald — success / "al día"
        jad: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Rose — error / deudor
        rust: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Amber — warning
        sol: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      // Las superficies se separan con una hairline, no con sombra. La sombra
      // queda reservada para lo que realmente flota sobre la página
      // (dropdowns, popovers): si todo tiene sombra, nada parece elevado.
      boxShadow: {
        card: 'none',
        'card-hover': 'none',
        soft: '0 1px 2px 0 rgb(15 23 42 / 0.04)',
        pop: '0 4px 6px -2px rgb(15 23 42 / 0.05), 0 12px 28px -8px rgb(15 23 42 / 0.14)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.35s ease-out both',
        'slide-in': 'slide-in 0.3s ease-out both',
      },
    },
  },
  plugins: [],
};
