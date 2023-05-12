/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontSize: {
				'xs': '1.4rem',
				'sm': '2rem',
				'md': '3rem',
				'lg': '4rem',
				'xl': '5.8rem',
				'xxl': '6.2rem'
			},
			screens: {
				xlg: '1160px',
				lg: '1024px',
				md: '769px',
				sm: '412px',
				xs: '375px'
			},
			zIndex: {
				'9999': '9999',
				'9998': '9998',
				'9997': '9997',
				'9996': '9996',
				'9995': '9995'
			},
			colors: {
				'primary': '#12101c',
				'secondary': '#878593',
				'ternary': '#853BCE',
				'blue-1': '#0f1b33',
				'blue-2': '#1d4596',
				'blue-3': '#8caef2',
				'green-1': '#42946e',
				'green-2': '#26543f',
				'green-3': '#95d0b4'
			},
			boxShadow: {
				'type-1': 'rgba(23, 92, 230, 0.15) 0px 4px 24px',
				'type-2': 'rgba(66, 148, 110, 0.15) 0px 4px 24px'
			}
		},
	},
	plugins: [],
}