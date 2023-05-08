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
				'ternary': '#853BCE'
			}
		},
	},
	plugins: [],
}