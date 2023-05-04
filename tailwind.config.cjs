/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			screens: {
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
			}
		},
	},
	plugins: [],
}