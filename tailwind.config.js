/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
		extend: {
			colors: {
				teal: {
					800: '#0E2334'
				},
				gray: {
					300: '#27282D',
				},
				azul: '#0000ff',
				verde: '#00ff00'
			},
			fontFamily: {
				'inter': ['"Inter"', 'sans-serif'],
			}
		},
		screens: {
			'st': '400px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
			'3xl': '1920px',
		},
	},
  plugins: [],
  experimental: {
		applyComplexClasses: true,
	},
}
