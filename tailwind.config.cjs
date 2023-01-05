/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			screens: {
				...defaultTheme.screens,
				xlg: '1200px',
				lg: '992px',
				md: '768px',
				sm: '412px',
				xs: '375px'
			},
			maxWidth: {
				'main-container': '120rem'
			},
			zIndex: {
				'9999': '9999',
				'9998': '9998',
				'9997': '9997',
				'9996': '9996',
				'9995': '9995'
			},
			colors: {
				'wlk-primary-color': '#ff9292',
				'wlk-secondary-color': '#ffdd67',
				'wlk-tertiary-color': '#403f3f',
				'wlk-quaternary-color': 'white',
				'wlk-dim-modal': '#403f3fcc',
				'inv-primary-color': '#3157AD'
			},
			boxShadow: {
				'wlk-primary': '0rem 1.7rem 2.016rem 0.384rem rgba(0, 0, 0, 0.21)'
			},
			fontFamily: {
				mont: ['Montserrat'],
				hmPop: ['Hachi Maru Pop']
			},
			fontWeight: {
				thin: 100,
				'extra-light': 200,
				light: 300,
				regular: 400,
				medium: 500,
				bold: 700,
				black: 900
			}
		},
	},
	plugins: [],
}